import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const blogDir = path.join(process.cwd(), "blog");

export async function renderBlogPage(req, res) {
  try {
    const files = await fs.readdir(blogDir);
    const posts = [];

    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = path.join(blogDir, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data } = matter(fileContent);
        const slug = file.replace(".md", "");

        posts.push({
          slug,
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || "No date"
        });
      }
    }

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.render("pages/blog", { posts });

  } catch (error) {
    console.error("❌ Error loading blog posts:", error);
    res.status(500).render("pages/500", { message: "Could not load blog posts" });
  }
}

export async function renderSinglePost(req, res) {
  try {
    const slug = req.params.slug;
    const filePath = path.join(blogDir, `${slug}.md`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const html = marked(content);

    res.render("pages/blog-post", {
      title: data.title,
      date: data.date,
      description: data.description,
      html,
      slug,
      content,
      tags: data.tags || [],
    });

  } catch (error) {
    console.error("❌ Error loading blog post:", error);
    res.status(404).render("pages/404", { message: "Post not found" });
  }
}
