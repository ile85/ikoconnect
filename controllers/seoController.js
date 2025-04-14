import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getRobotsTxt(req, res) {
  const content = `
User-agent: *
Allow: /

Sitemap: https://www.ikoconnect.com/sitemap.xml
  `.trim();

  res.type("text/plain").send(content);
}

export async function getSitemapXml(req, res) {
  const hostname = "https://www.ikoconnect.com";

  const staticRoutes = [
    "", // homepage
    "about",
    "contact",
    "blog",
    "jobs",
    "resources",
  ];

  const staticUrls = staticRoutes.map((route) => {
    return `
    <url>
      <loc>${hostname}/${route}</loc>
    </url>`;
  });

  // === BLOG POSTS ===
  const postsDir = path.join(__dirname, "../blog");
  let postUrls = [];

  try {
    const files = fs.readdirSync(postsDir);
    postUrls = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(".md", "");
        return `
    <url>
      <loc>${hostname}/blog/${slug}</loc>
    </url>`;
      });
  } catch (err) {
    console.error("❌ Error reading blog posts:", err);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls.join("\n")}
    ${postUrls.join("\n")}
  </urlset>`.trim();

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
}
