import express from "express";
import fs from "fs-extra"; // ✅ користиш само fs-extra овде
import path from "path";
import slugify from "slugify";
import generateOgImage from "../utils/generateOgImage.js";

const router = express.Router();
const blogDir = path.join(process.cwd(), "blog");
const toolsPath = path.join(process.cwd(), "data", "affiliateTools.json");

function validatePost(data) {
  const today = new Date().toISOString().split("T")[0];

  const fixed = {
    title: data.title?.trim() || "Untitled Post",
    description: data.description?.trim() || "This is an auto-generated post for SEO purposes.",
    date: /^\d{4}-\d{2}-\d{2}$/.test(data.date) ? data.date : today,
  };

  return fixed;
}

// ✅ Admin Panel - Render
router.get("/affiliate", async (req, res) => {
  let tools = [];
  try {
    tools = await fs.readJson(toolsPath);
  } catch {
    tools = [];
  }
  res.render("pages/admin-affiliate", { tools, message: null });
});

// ✅ Add Affiliate Tool + Blog Post
router.post("/affiliate", async (req, res) => {
  const { logo, name, url, description, markdown } = req.body;

  // ✅ Користи `name` наместо `title`
  if (!name || !url || !logo) {
    return res.status(400).json({ error: "Name, URL, and Logo are required." });
  }
  
  const slug = slugify(name.toLowerCase(), { strict: true });
  const filePath = path.join(blogDir, `${slug}.md`);
  
  const validated = validatePost({
    title: name, // ✅ name како title
    description,
    date: new Date().toISOString().split("T")[0],
  });

  const markdownContent = `---
title: ${validated.title}
date: ${validated.date}
description: ${validated.description}
---

## Why We Recommend ${validated.title}

${validated.description}

👉 [Try ${validated.title}](${url})
${markdown ? "\n---\n" + markdown : ""}
`;

  try {
    // ✅ Save Markdown Post
    await fs.writeFile(filePath, markdownContent, "utf-8");

    // ✅ Save to JSON
    const tools = await fs.readJson(toolsPath).catch(() => []);
    tools.push({ name, description, url, logo });
    await fs.writeJson(toolsPath, tools, { spaces: 2 });

    res.redirect("/admin/affiliate");
  } catch (err) {
    console.error("❌ Error saving tool:", err);
    res.status(500).json({ error: "Failed to save affiliate post and tool." });
  }
});

// ✅ Delete Tool
router.post("/affiliate/delete", async (req, res) => {
  const { name } = req.body;
  try {
    let tools = await fs.readJson(toolsPath).catch(() => []);
    tools = tools.filter(t => t.name !== name);
    await fs.writeJson(toolsPath, tools, { spaces: 2 });
    res.redirect("/admin/affiliate");
  } catch (err) {
    console.error("❌ Error deleting tool:", err);
    res.status(500).json({ error: "Failed to delete tool." });
  }
});

export default router;
