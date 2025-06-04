// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Типови за frontmatter на блог пост
export interface PostFrontMatter {
  title: string;
  date: string;
  description: string;
  author?: string;
  ogImage?: string;
  lastModified?: string;
  tags?: string[];
  coverImage?: string;
}

// Комплетен Post interface со frontmatter и HTML
export interface Post {
  slug: string;
  frontmatter: PostFrontMatter;
  contentHtml: string;
}

// Папка каде лежат markdown-ите
const postsDirectory = path.join(process.cwd(), "content", "blog");

/**
 * Враќа низa од slug-ови (имена без .md)
 */
export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * Враќа еден пост според slug
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Разделување на frontmatter и content
  const { data, content } = matter(fileContents);

  // Конвертирање markdown во HTML
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug: realSlug,
    frontmatter: data as PostFrontMatter,
    contentHtml,
  };
}

/**
 * Враќа листа од сите posts, сортирани descending по датум
 */
export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  // Сортирај по date descending
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}
