// src/lib/blog.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// Типови за Markdown постови и нивно резиме
export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage: string;
  html: string;
}

export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
}

// Патеката кон фолдерот со .md фајлови
const POSTS_PATH = path.join(process.cwd(), "content", "blog");

// 1️⃣ Врати ја листата на сите slug-ови (без екстензија)
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// 2️⃣ Врати ги сите постови како резиме за листање
export function getAllPosts(): PostSummary[] {
  return getPostSlugs().map((slug) => {
    const fullPath = path.join(POSTS_PATH, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const excerpt = content.trim().slice(0, 200) + "...";
    return {
      slug,
      title: String(data.title),
      date: String(data.date),
      excerpt,
      coverImage: String(data.coverImage),
    };
  });
}

// 3️⃣ Врати го цел HTML + мета за еден пост
export async function getPostHtmlBySlug(
  slug: string
): Promise<Post | null> {
  const fullPath = path.join(POSTS_PATH, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Конвертирај markdown кон HTML
  const html = await marked(content);

  return {
    slug,
    title: data.title,
    description: data.description || "",
    date: data.date,
    tags: data.tags || [],
    coverImage: data.coverImage || "",
    html,
  };
}
