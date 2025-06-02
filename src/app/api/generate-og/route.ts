import { NextRequest } from "next/server";
import { getToolById } from "../../../lib/tools";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  let tool;

  if (slug === "home") {
    tool = {
      id: "home",
      name: "IkoConnect",
      description: "Your ultimate portal for remote work tools, guides, and jobs.",
      url: "https://www.ikoconnect.com",
      logo: "https://www.ikoconnect.com/images/logos/default.png",
    };
  } else {
    tool = getToolById(slug);
  }

  if (!tool) {
    return new Response("Tool not found", { status: 404 });
  }

  let safeLogo = "https://dummyimage.com/200x200/ccc/000.png&text=Tool";

  if (tool.logo) {
    const logoFileName = path.basename(tool.logo);
    const localLogoPath = path.join(process.cwd(), "public", "images", "logos", logoFileName);

    if (fs.existsSync(localLogoPath)) {
      try {
        const resized = await sharp(localLogoPath)
          .resize(300, 300, { fit: "inside" })
          .png()
          .toBuffer();

        const base64 = resized.toString("base64");
        safeLogo = `data:image/png;base64,${base64}`;
      } catch (err) {
        console.error("🔴 sharp resize error:", err);
        safeLogo = tool.logo; // fallback
      }
    } else {
      safeLogo = tool.logo;
    }
  }

  const html = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: sans-serif;
            background: #f9fafb;
          }
          .container {
            text-align: center;
            padding: 60px;
            border: 8px solid #ddd;
            border-radius: 20px;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          img {
            height: auto;
            max-height: 120px;
            margin-bottom: 30px;
          }
          h1 {
            font-size: 56px;
            color: #111827;
            margin-bottom: 20px;
          }
          p {
            font-size: 30px;
            color: #4b5563;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="${safeLogo}" alt="Logo" />
          <h1>${tool.name}</h1>
          <p>${tool.description}</p>
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const buffer = await page.screenshot({ type: "png" });
  await browser.close();

  const filePath = path.join(process.cwd(), "public", "images", "og", `${slug}.png`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buffer);

  return new Response(`✅ OG image saved: /images/og/${slug}.png`, {
    status: 200,
  });
}
