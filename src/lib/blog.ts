import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export async function getPostHtmlBySlug(slug: string) {
  const post = getPostBySlug(slug);
  const processedContent = await remark().use(html).process(post.content);
  return {
    slug: post.slug,
    meta: post.meta,
    html: processedContent.toString(),
  };
}

export function getAllPosts() {
  return getPostSlugs()
    .map(getPostBySlug)
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}
