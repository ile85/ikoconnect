// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

// -------------- Types --------------
export interface PostSummary {
  slug: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  excerpt: string;
  coverImage: string;
  tags: string[];
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // "YYYY-MM-DD"
  tags: string[];
  coverImage: string;
  html: string; // sanitized
  author?: string;
  wordCount?: number;
}

// -------------- Constants --------------
const POSTS_PATH = path.join(process.cwd(), "content", "blog");

// 1) Slugs
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_PATH)) return [];
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// 2) All posts (summaries)
export function getAllPosts(): PostSummary[] {
  return getPostSlugs()
    .map((slug) => {
      const fullPath = path.join(POSTS_PATH, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const title = String(data.title || "Untitled");

      const rawDate = new Date(data.date);
      const date = !isNaN(rawDate.getTime())
        ? rawDate.toISOString().split("T")[0]
        : "";

      const coverImage = String(
        data.coverImage || data.ogImage || data.image || "/images/default-cover.jpg"
      );

      const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];

      // Better excerpt (first paragraph without markdown)
      const firstParagraph =
        content.split(/\n{2,}/).find((p) => p.trim().length > 0) || "";
      const plain = firstParagraph
        .replace(/!\[.*?\]\(.*?\)/g, "") // images
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
        .replace(/[`*_>#~-]/g, "") // md tokens
        .replace(/\s+/g, " ")
        .trim();
      const excerpt = plain.length > 200 ? plain.slice(0, 200).trim() + "…" : plain;

      return { slug, title, date, excerpt, coverImage, tags };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 3) Single post (sanitized HTML)
export async function getPostHtmlBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(POSTS_PATH, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      console.error(`[❌] Markdown file not found for slug: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const rawHtml = await marked.parse(content);

    // ✅ Безбеден sanitize: без script/style, со разумни атрибути
    const html = sanitizeHtml(rawHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags, // нема script/style
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        a: ["href", "name", "target", "rel"],
        img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
        // дозволи iframe само ако навистина ти треба (инаку избриши ја следнава линија)
        iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder"],
      },
      allowedSchemes: ["http", "https", "mailto"],
      allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"],

      transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
          rel: "noopener nofollow",
          target: "_blank",
        }),
      },
    });

    const wordCount = content.trim().split(/\s+/).length;

    return {
      slug,
      title: String(data.title || "Untitled"),
      description: String(data.description || ""),
      date: new Date(data.date).toISOString().split("T")[0] || "",
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      coverImage: String(
        data.coverImage || data.ogImage || data.image || "/images/default-cover.jpg"
      ),
      html,
      author: String(data.author || ""),
      wordCount,
    };
  } catch (err) {
    console.error(`[💥] Error parsing markdown for slug: ${slug}`, err);
    return null;
  }
}
