// routes/api.js
import express from "express";
import { marked } from "marked";

const router = express.Router();

// 🔄 Live Markdown Preview Endpoint
router.post("/markdown-preview", (req, res) => {
  const { markdown } = req.body;
  if (!markdown) return res.status(400).json({ error: "Markdown content required." });

  try {
    const html = marked(markdown);
    res.status(200).json({ html });
  } catch (error) {
    res.status(500).json({ error: "Failed to render Markdown." });
  }
});

export default router;
