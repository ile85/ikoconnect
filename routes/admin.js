import slugify from "slugify"; // додади најгоре
import { format } from "date-fns"; // форматирање на датум

import express from "express";
import fs from "fs-extra";
import path from "path";

const router = express.Router();
const dataPath = path.join(process.cwd(), "data", "recommendations.json");

// GET admin panel
router.get("/affiliate", async (req, res) => {
  const tools = await fs.readJson(dataPath);
  res.render("pages/admin-affiliate", { tools, message: null });
});

// POST new affiliate
router.post("/affiliate", async (req, res) => {
    const { name, description, url, logo } = req.body;
  
    try {
      const tools = await fs.readJson(dataPath);
      const newTool = { name, description, url, logo };
  
      tools.push(newTool);
      await fs.writeJson(dataPath, tools, { spaces: 2 });
  
      // 🔥 Auto-generate Markdown Blog Post
      const blogDir = path.join(process.cwd(), "blog");
      const slug = slugify(name, { lower: true });
      const blogPath = path.join(blogDir, `${slug}.md`);
      const today = format(new Date(), "yyyy-MM-dd");
  
      const mdContent = `---
  title: ${name} – Recommended Tool for Freelancers
  date: ${today}
  description: ${description}
  ---
  
  ## Why We Recommend ${name}
  
  ${description}
  
  👉 [Try ${name}](${url})
  `;
  
      await fs.outputFile(blogPath, mdContent);
  
      res.redirect("/admin/affiliate");
    } catch (err) {
      console.error("❌ Error adding tool:", err);
      res.render("pages/admin-affiliate", { tools: [], message: "❌ Failed to add tool." });
    }
  });
router.post("/affiliate/delete", async (req, res) => {
    const { name } = req.body;
  
    try {
      let tools = await fs.readJson(dataPath);
      tools = tools.filter(tool => tool.name !== name);
      await fs.writeJson(dataPath, tools, { spaces: 2 });
  
      res.redirect("/admin/affiliate");
    } catch (err) {
      console.error("❌ Error deleting tool:", err);
      res.render("pages/admin-affiliate", { tools: [], message: "❌ Failed to delete." });
    }
  });

export default router;
