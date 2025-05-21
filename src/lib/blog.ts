// src/lib/blog.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// Типови
export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage: string;
  html: string;
  author?: string;
}

export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
}

const POSTS_PATH = path.join(process.cwd(), "content", "blog");

// 1️⃣ Врати slug-ови
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// 2️⃣ Врати сите постови за листање
export function getAllPosts(): PostSummary[] {
  return getPostSlugs().map((slug) => {
    const fullPath = path.join(POSTS_PATH, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const title = String(data.title || "Untitled");
    const dateRaw = new Date(data.date);
    const date = isNaN(dateRaw.getTime()) ? "" : dateRaw.toISOString().split("T")[0];

    const coverImage = String(data.coverImage || data.ogImage || data.image || "");

    const plainText = content
      .replace(/[#>*_`~\-!\[\]()]/g, "") // отстрани Markdown карактери
      .split("\n")
      .filter((line) => line.trim() !== "")[0] || "";

    const excerpt = plainText.slice(0, 200) + "...";

    return {
      slug,
      title,
      date,
      excerpt,
      coverImage,
    };
  });
}

// 3️⃣ Врати HTML + детали за еден пост
export async function getPostHtmlBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(POSTS_PATH, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const html = await marked(content);

  return {
    slug,
    title: String(data.title || "Untitled"),
    description: String(data.description || ""),
    date: new Date(data.date).toISOString().split("T")[0] || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: String(data.coverImage || data.ogImage || data.image || ""),
    html,
    author: String(data.author || ""),
  };
}
