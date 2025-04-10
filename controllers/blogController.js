// controllers/blogController.js
import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const blogDir = path.join(process.cwd(), "blog");

export async function renderBlogPage(req, res) {
  const files = await fs.readdir(blogDir);

  const posts = await Promise.all(
    files
      .filter(file => file.endsWith(".md"))
      .map(async filename => {
        const filePath = path.join(blogDir, `${slug}.md`);
        if (!fs.existsSync(filePath)) {
          return res.status(404).render("pages/404", { message: "Post not found" });
        }
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
          slug: `${slug}.md`.replace(".md", ""),
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || "No date"
        };
      })
  );

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  res.render("pages/blog", { posts });
}

export async function renderSinglePost(req, res) {
  const slug = req.params.slug;
  const filePath = path.join(blogDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).render("pages/404", { message: "Post not found" });
  }

  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const html = marked(content);

  res.render("pages/blog-post", {
    title: data.title,
    date: data.date,
    description: data.description,
    html
  });
}

const posts = [
    {
      title: "Welcome to IkoConnect Blog!",
      content: "Here you'll find tips, tutorials, and inspiration for your freelancing and remote work journey."
    },
    {
      title: "Top 5 Freelance Platforms in 2025",
      content: "Explore the best websites for getting freelance gigs this year, including Upwork, Fiverr, and more."
    }
  ];
  
  export function renderBlogPage(req, res) {
    res.render("pages/blog", { posts });
  }
  