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

// -------------- Helpers --------------
function safeIsoDate(input: unknown): string {
  const d = new Date(String(input));
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
}

function stripMarkdownToExcerpt(md: string, max = 200): string {
  const firstParagraph: string =
    md.split(/\n{2,}/).find((p: string) => p.trim().length > 0) || "";

  const plain = firstParagraph
    .replace(/!\[.*?\]\(.*?\)/g, "")              // remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")      // links -> text
    .replace(/[`*_>#~-]/g, "")                    // md tokens
    .replace(/\s+/g, " ")
    .trim();

  return plain.length > max ? plain.slice(0, max).trim() + "…" : plain;
}

function computeWordCount(text: string): number {
  const words = text.trim().match(/[\w'-]+/g);
  return words ? words.length : 0;
}

// -------------- Sanitize config --------------
// експлицитна листа (без script/style)
const ALLOWED_TAGS: string[] = [
  "a", "p", "ul", "ol", "li",
  "strong", "em", "blockquote",
  "pre", "code", "img",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "table", "thead", "tbody", "tr", "th", "td",
  "hr", "br", "span", "div"
];

// тип-безбедна мапа за атрибути
type AllowedAttr = sanitizeHtml.AllowedAttribute;
const ALLOWED_ATTRS: Record<string, AllowedAttr[]> = {
  a: ["href", "name", "target", "rel"],
  img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
  code: ["class"],
  pre: ["class"],
  span: ["class", "id"],
  div: ["class", "id"],
  table: ["class"],
  thead: ["class"],
  tbody: ["class"],
  tr: ["class"],
  th: ["class"],
  td: ["class"],
  h1: ["id"], h2: ["id"], h3: ["id"], h4: ["id"], h5: ["id"], h6: ["id"],
  p: ["id"]
};

// -------------- API --------------

// 1) Slugs
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_PATH)) return [];
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file: string) => file.endsWith(".md"))
    .map((file: string) => file.replace(/\.md$/, ""));
}

// 2) All posts (summaries)
export function getAllPosts(): PostSummary[] {
  return getPostSlugs()
    .map((slug) => {
      const fullPath = path.join(POSTS_PATH, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const title = String(data.title || "Untitled");
      const date = safeIsoDate(data.date);
      const coverImage = String(
        data.coverImage || data.ogImage || data.image || "/images/default-cover.jpg"
      );
      const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
      const excerpt = stripMarkdownToExcerpt(content, 200);

      return { slug, title, date, excerpt, coverImage, tags };
    })
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
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

    // Markdown -> HTML
    const rawHtml = await marked.parse(content);

    // Sanitize (без script/style, тип-безбедно)
    const html = sanitizeHtml(rawHtml, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRS,
      allowedSchemes: ["http", "https", "mailto"],
      transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
          rel: "noopener nofollow",
          target: "_blank"
        })
      },
      parseStyleAttributes: false,
      disallowedTagsMode: "discard"
    });

    const wordCount = computeWordCount(content);

    return {
      slug,
      title: String(data.title || "Untitled"),
      description: String(data.description || ""),
      date: safeIsoDate(data.date),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      coverImage: String(
        data.coverImage || data.ogImage || data.image || "/images/default-cover.jpg"
      ),
      html,
      author: data.author ? String(data.author) : "",
      wordCount
    };
  } catch (err) {
    console.error(`[💥] Error parsing markdown for slug: ${slug}`, err);
    return null;
  }
}
