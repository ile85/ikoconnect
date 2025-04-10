// controllers/blogController.js
import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const blogDir = path.join(process.cwd(), "Blog");

export async function renderBlogPage(req, res) {
  try {
    const files = await fs.readdir(blogDir);

    const posts = await Promise.all(
      files
        .filter(file => file.endsWith(".md"))
        .map(async filename => {
          const slug = filename.replace(".md", "");
          const filePath = path.join(blogDir, filename);
          const fileContent = await fs.readFile(filePath, "utf-8");
          const { data } = matter(fileContent);

          return {
            slug,
            title: data.title || "Untitled",
            description: data.description || "",
            date: data.date || "No date"
          };
        })
    );

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.render("pages/blog", { posts });
  } catch (err) {
    console.error("❌ Blog loading failed:", err.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
}


export async function renderSinglePost(req, res) {
  try {
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
  } catch (err) {
    console.error("❌ Failed to render single post:", err);
    res.status(500).render("pages/500", { message: "Internal Server Error" });
  }
}
