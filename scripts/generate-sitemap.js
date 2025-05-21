#!/usr/bin/env node

const fs = require("fs");
const { resolve } = require("path");

(async () => {
  // Dynamically import the ESM‐only globby
  const { globby } = await import("globby");

  const baseUrl = "https://ikoconnect.com";

  // 1) Static routes
  const staticPaths = [
    "",
    "blog",
    "contact",
    "jobs",
    "newsletter",
    "privacy",
    "terms",
    "media-kit",
    "resources",
  ];

  // 2) Dynamic blog slugs
  const posts = await globby("content/blog/*.md");
  const postPaths = posts.map((file) => {
    const slug = file.split("/").pop().replace(".md", "");
    return `blog/${slug}`;
  });

  // 3) All paths
  const allPaths = [...staticPaths, ...postPaths];

  // 4) Build sitemap XML
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    allPaths
      .map(
        (path) =>
          `  <url>\n` +
          `    <loc>${baseUrl}/${path}</loc>\n` +
          `    <changefreq>weekly</changefreq>\n` +
          `    <priority>0.8</priority>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>`;

  // 5) Write sitemap.xml
  const outSitemap = resolve(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outSitemap, sitemap, "utf8");
  console.log("✅ sitemap.xml generated at", outSitemap);

  // 6) Write robots.txt
  const robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;
  fs.writeFileSync(resolve(__dirname, "../public/robots.txt"), robots, "utf8");
  console.log("✅ robots.txt generated");
})();
