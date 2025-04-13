import fs from "fs/promises";
import express from "express";
import path from "path";
import slugify from "slugify";
import axios from "axios";

const router = express.Router();
const blogDir = path.join(process.cwd(), "blog");
const toolsPath = path.join(process.cwd(), "data", "affiliateTools.json");
const ogDir = path.join(process.cwd(), "public", "images", "og");

function validatePost(data) {
  const today = new Date().toISOString().split("T")[0];
  return {
    title: data.title?.trim() || "Untitled Post",
    description: data.description?.trim() || "This is an auto-generated post for SEO purposes.",
    date: /^\d{4}-\d{2}-\d{2}$/.test(data.date) ? data.date : today,
  };
}

router.get("/affiliate", async (req, res) => {
  let tools = [];
  try {
    const raw = await fs.readFile(toolsPath, "utf-8");
    tools = JSON.parse(raw);
  } catch {
    tools = [];
  }
  res.render("pages/admin-affiliate", { tools, message: null });
});

router.post("/affiliate", async (req, res) => {
  const { logo, name, url, description, markdown } = req.body;

  if (!name || !url || !logo) {
    return res.status(400).json({ error: "Name, URL, and Logo are required." });
  }

  const slug = slugify(name.toLowerCase(), { strict: true });
  const filePath = path.join(blogDir, `${slug}.md`);
  const validated = validatePost({
    title: name,
    description,
    date: new Date().toISOString().split("T")[0],
  });

  const markdownContent = `---
title: "${validated.title}"
date: "${validated.date}"
description: "${validated.description}"
---

## Why We Recommend ${validated.title}

${validated.description}

👉 [Try ${validated.title}](${url})
${markdown ? "\n---\n" + markdown : ""}
`;

  try {
    await fs.writeFile(filePath, markdownContent, "utf-8");

    // 🧪 Cleanup + final URL
    const cleanedLogo = logo.replace(/^\/?public\/?/, "").replace(/^\/+/, "");
const logoUrl = logo.startsWith("http")
  ? logo
  : `https://www.ikoconnect.com/${cleanedLogo}`;
    console.log("🧪 INPUT LOGO:", logo);
    console.log("🧼 CLEANED LOGO:", cleanedLogo);
    console.log("🌍 FINAL LOGO URL:", logoUrl);

    const response = await axios.get(logoUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const ogPath = path.join(ogDir, `${slug}.png`);
    await fs.mkdir(ogDir, { recursive: true });
    await fs.writeFile(ogPath, buffer);

    let tools = [];
    try {
      const raw = await fs.readFile(toolsPath, "utf-8");
      tools = JSON.parse(raw);
    } catch {
      tools = [];
    }

    tools.push({ name, description, url, logo });
    await fs.writeFile(toolsPath, JSON.stringify(tools, null, 2));

    res.redirect("/admin/affiliate");
  } catch (err) {
    console.error("❌ Error saving tool:", err);
    res.status(500).json({ error: "Failed to save affiliate post and tool." });
  }
});


router.post("/affiliate/delete", async (req, res) => {
  const { name } = req.body;
  try {
    let tools = [];
    try {
      const raw = await fs.readFile(toolsPath, "utf-8");
      tools = JSON.parse(raw);
    } catch {
      tools = [];
    }
    tools = tools.filter(t => t.name !== name);
    await fs.writeFile(toolsPath, JSON.stringify(tools, null, 2));
    res.redirect("/admin/affiliate");
  } catch (err) {
    console.error("❌ Error deleting tool:", err);
    res.status(500).json({ error: "Failed to delete tool." });
  }
});

export default router;
