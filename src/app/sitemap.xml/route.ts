// src/app/sitemap.xml/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllPostSlugs } from "@/lib/posts";
import { getAllToolIds } from "@/lib/tools";
import { absoluteUrl } from "@/lib/url";

// GET /sitemap.xml
export async function GET(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ikoconnect.com";

  // Статични pages
  const staticPages = [
    "",
    "about",
    "contact",
    "jobs",
    "newsletter",
    "privacy",
    "terms",
    "resources",
    "tools",
    "blog",
  ];

  const dynamicBlogSlugs = getAllPostSlugs(); // e.g. ["chatgpt", "asana"]
  const dynamicToolIds = getAllToolIds(); // e.g. ["fiverr", "slack"]
  // Ако имаш resources URLs dynamic, додај ги тука

  const urls: string[] = [];

  // Статични
  staticPages.forEach((page) => {
    urls.push(`${siteUrl}/${page}`);
  });

  // Блог постови
  dynamicBlogSlugs.forEach((slug) => {
    urls.push(`${siteUrl}/blog/${slug}`);
  });

  // Tools
  dynamicToolIds.forEach((id) => {
    urls.push(`${siteUrl}/tools/${id}`);
  });

  // Форматирање на XML
  const xmlEntries = urls
    .map((url) => {
      return `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${xmlEntries}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
