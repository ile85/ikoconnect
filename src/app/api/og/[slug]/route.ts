// /var/www/ikoconnect/src/app/api/og/[slug]/route.ts
import { NextRequest } from "next/server";
import { getToolById } from "../../../../lib/tools";
import puppeteer from "puppeteer";
import type { Browser } from "puppeteer";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

export const dynamic = "force-dynamic";

// Escape за безбедно HTML вметнување
function esc(str: string) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Ако logo е remote URL -> base64 PNG (≤300px)
async function fetchAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const out = await sharp(buf).resize(300, 300, { fit: "inside" }).png().toBuffer();
    return `data:image/png;base64,${out.toString("base64")}`;
  } catch {
    return null;
  }
}

async function logoToDataUrl(logo?: string): Promise<string> {
  // default SVG placeholder
  let safe =
    "data:image/svg+xml;base64," +
    Buffer.from(
      `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
        <rect width='200' height='200' fill='#e5e7eb'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#374151' font-family='sans-serif' font-size='20'>Tool</text>
      </svg>`
    ).toString("base64");

  if (!logo) return safe;

  // локална датотека?
  const localCandidate = logo.startsWith("/")
    ? path.join(process.cwd(), "public", logo)
    : path.join(process.cwd(), "public", "images", "logos", path.basename(logo));

  if (fs.existsSync(localCandidate)) {
    try {
      const buf = await sharp(localCandidate)
        .resize(300, 300, { fit: "inside" })
        .png()
        .toBuffer();
      return `data:image/png;base64,${buf.toString("base64")}`;
    } catch {
      // падни на remote
    }
  }

  // remote URL?
  if (/^https?:\/\//i.test(logo)) {
    const fromRemote = await fetchAsDataUrl(logo);
    if (fromRemote) return fromRemote;
  }

  // last resort
  return logo;
}

function buildHtml(name: string, description: string, logoDataUrl: string) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      *{box-sizing:border-box}
      body{margin:0;width:1200px;height:630px;display:flex;justify-content:center;align-items:center;
        font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; background:#f9fafb;}
      .container{width:1100px;height:540px;text-align:center;padding:60px;border:8px solid #e5e7eb;border-radius:20px;
        background:#fff;box-shadow:0 0 20px rgba(0,0,0,0.08);display:flex;flex-direction:column;justify-content:center;align-items:center}
      img{max-width:300px;height:auto;margin-bottom:28px;object-fit:contain}
      h1{font-size:56px;color:#111827;margin:0 0 16px;line-height:1.1;max-width:1000px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      p{font-size:28px;color:#4b5563;margin:0;max-width:1000px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    </style>
  </head>
  <body>
    <div class="container">
      <img src="${logoDataUrl}" alt="Logo" />
      <h1>${esc(name)}</h1>
      <p>${esc(description)}</p>
    </div>
  </body>
</html>`;
}

async function renderPng(html: string): Promise<Buffer> {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: true, // ← фикс: boolean
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    const png = (await page.screenshot({ type: "png" })) as Buffer;
    return png;
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
  }
}

function defaultOgPath() {
  return path.join(process.cwd(), "public", "images", "og", "og-default.png");
}

export async function GET(req: NextRequest) {
  const segments = req.nextUrl.pathname.split("/");
  const slug = segments[segments.length - 1] || "home";

  try {
    // 1) Tool или home fallback
    const tool =
      slug === "home"
        ? {
            id: "home",
            name: "IkoConnect",
            description: "Your ultimate portal for remote work tools, guides, and jobs.",
            url: "https://www.ikoconnect.com",
            logo: "/images/logos/default.png",
          }
        : getToolById(slug);

    if (!tool) {
      // статичен fallback наместо 404
      const p = defaultOgPath();
      const buf = fs.existsSync(p) ? fs.readFileSync(p) : Buffer.from([]);
      const body = new Uint8Array(buf); // ← фикс за BodyInit
      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // 2) Подготви logo како data URL
    const safeLogo = await logoToDataUrl(tool.logo);

    // 3) HTML
    const html = buildHtml(tool.name || "IkoConnect", tool.description || "", safeLogo);

    // 4) Рендер
    const screenshot = await renderPng(html);

    // 5) Best-effort локален кеш
    try {
      const out = path.join(process.cwd(), "public", "images", "og", `${slug}.png`);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, screenshot);
    } catch {}

    // 6) Cache headers + ETag
    const etag = crypto.createHash("sha1").update(screenshot).digest("hex");
    const body = new Uint8Array(screenshot); // ← фикс за BodyInit

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
        ETag: etag,
        "Content-Disposition": `inline; filename="${slug}.png"`,
      },
    });
  } catch {
    // апсолутен fallback ако нешто падне
    try {
      const p = defaultOgPath();
      const buf = fs.existsSync(p) ? fs.readFileSync(p) : Buffer.from([]);
      const body = new Uint8Array(buf);
      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch {
      return new Response("OG Error", { status: 500 });
    }
  }
}
