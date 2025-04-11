import express from "express";
import fs from "fs-extra";
import path from "path";
import slugify from "slugify";
import matter from "gray-matter";

const router = express.Router();
const blogDir = path.join(process.cwd(), "blog");

function validatePost(data) {
  const today = new Date().toISOString().split("T")[0];

  const fixed = {
    title: data.title?.trim() || "Untitled Post",
    description: data.description?.trim() || "This is an auto-generated post for SEO purposes.",
    date: /^\d{4}-\d{2}-\d{2}$/.test(data.date) ? data.date : today,
  };

  return fixed;
}

router.post("/affiliate", async (req, res) => {
  const { title, url, description } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required." });
  }

  const slug = slugify(title.toLowerCase(), { strict: true });
  const filePath = path.join(blogDir, `${slug}.md`);

  const validated = validatePost({
    title,
    description,
    date: new Date().toISOString().split("T")[0]
  });

  const markdownContent = `---
title: ${validated.title}
date: ${validated.date}
description: ${validated.description}
---

## Why We Recommend ${validated.title}

${validated.description}

👉 [Try ${validated.title}](${url})
`;

  try {
    await fs.writeFile(filePath, markdownContent, "utf-8");
    res.status(201).json({ message: "Affiliate post created successfully!" });
  } catch (err) {
    console.error("❌ Error writing markdown file:", err);
    res.status(500).json({ error: "Failed to create post." });
  }
});

export default router;
