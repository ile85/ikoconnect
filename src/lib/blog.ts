// /var/www/ikoconnect/src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// -------------- Types --------------
export interface PostSummary {
  slug: string;
  title: string;
  date: string;       // in "YYYY-MM-DD" ISO format
  excerpt: string;
  coverImage: string;
  tags: string[];
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;       // in "YYYY-MM-DD"
  tags: string[];
  coverImage: string;
  html: string;
  author?: string;
}

// -------------- Constants --------------
const POSTS_PATH = path.join(process.cwd(), "content", "blog");

// 1️⃣ Return all slugs (filenames without .md)
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// 2️⃣ Return summaries for all posts (for listing & pagination)
export function getAllPosts(): PostSummary[] {
  return getPostSlugs()
    .map((slug) => {
      const fullPath = path.join(POSTS_PATH, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Title
      const title = String(data.title || "Untitled");

      // Date (ISO YYYY-MM-DD)
      const rawDate = new Date(data.date);
      const date =
        !isNaN(rawDate.getTime())
          ? rawDate.toISOString().split("T")[0]
          : "";

      // Cover Image (frontmatter 'coverImage', or fallback)
      const coverImage = String(
        data.coverImage || data.ogImage || data.image || "/images/default-cover.jpg"
      );

      // Tags (frontmatter array or empty array)
      const tags = Array.isArray(data.tags)
        ? data.tags.map((t) => String(t))
        : [];

      // Excerpt: first nonblank line (strip markdown tokens)
      const plainText = content
        .replace(/[#>*_`~\-\[\]()!]/g, "")
        .split("\n")
        .filter((line) => line.trim() !== "")[0] || "";
      const excerpt =
        plainText.length > 200
          ? plainText.slice(0, 200).trim() + "..."
          : plainText;

      return {
        slug,
        title,
        date,
        excerpt,
        coverImage,
        tags,
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

// 3️⃣ Return full HTML + frontmatter for a single post
export async function getPostHtmlBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(POSTS_PATH, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      console.error(`[❌] Markdown file not found for slug: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const html = await marked(content);

    console.log(`[✅] Loaded markdown: ${slug}`);

    return {
      slug,
      title: String(data.title || "Untitled"),
      description: String(data.description || ""),
      date: new Date(data.date).toISOString().split("T")[0] || "",
      tags: Array.isArray(data.tags) ? data.tags.map((t) => String(t)) : [],
      coverImage: String(
        data.coverImage || data.ogImage || data.image || "/images/default-cover.jpg"
      ),
      html,
      author: String(data.author || ""),
    };
  } catch (err) {
    console.error(`[💥] Error parsing markdown for slug: ${slug}`, err);
    return null;
  }
}
