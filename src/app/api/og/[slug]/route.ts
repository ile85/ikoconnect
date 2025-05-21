// /var/www/ikoconnect/src/app/api/og/[slug]/route.ts
import { NextRequest } from "next/server";
import { getToolById } from "@/lib/tools";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // 1. Extract slug from URL
  const segments = req.nextUrl.pathname.split("/");
  const slug = segments[segments.length - 1] || "undefined";

  // 2. Lookup tool or use home fallback
  let tool = slug === "home"
    ? {
        id: "home",
        name: "IkoConnect",
        description: "Your ultimate portal for remote work tools, guides, and jobs.",
        url: "https://www.ikoconnect.com",
        logo: "https://www.ikoconnect.com/images/logos/default.png",
      }
    : getToolById(slug);

  if (!tool) {
    return new Response("Not Found", { status: 404 });
  }

  // 3. Prepare logo as base64 (resize local PNG to ≤300px)
  let safeLogo = "https://dummyimage.com/200x200/ccc/000.png&text=Tool";
  if (tool.logo) {
    const filename = path.basename(tool.logo);
    const local = path.join(process.cwd(), "public", "images", "logos", filename);
    if (fs.existsSync(local)) {
      try {
        const buf = await sharp(local)
          .resize(300, 300, { fit: "inside" })
          .png()
          .toBuffer();
        safeLogo = `data:image/png;base64,${buf.toString("base64")}`;
      } catch {
        safeLogo = tool.logo;
      }
    } else {
      safeLogo = tool.logo;
    }
  }

  // 4. Build HTML template
  const html = `
    <html>
      <head>
        <style>
          body { margin:0; width:1200px; height:630px;
            display:flex; justify-content:center; align-items:center;
            font-family:sans-serif; background:#f9fafb;
          }
          .container {
            text-align:center; padding:60px;
            border:8px solid #ddd; border-radius:20px;
            background:white; box-shadow:0 0 20px rgba(0,0,0,0.1);
          }
          img { max-width:300px; height:auto; margin-bottom:30px; }
          h1 { font-size:56px; color:#111827; margin-bottom:20px; }
          p { font-size:30px; color:#4b5563; }
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

  // 5. Render with Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox","--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width:1200, height:630 });
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  const screenshot = await page.screenshot({ type: "png" });
  await browser.close();

  // 6. Cache locally
  const out = path.join(process.cwd(), "public", "images", "og", `${slug}.png`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, screenshot);

  // 7. Return PNG
  return new Response(Buffer.from(screenshot), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
