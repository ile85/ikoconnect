import express from "express";
import { marked } from "marked";

const router = express.Router();

router.post("/markdown-preview", (req, res) => {
  const { markdown } = req.body;

  try {
    const html = marked(markdown || "");
    res.json({ html });
  } catch (err) {
    console.error("❌ Markdown render error:", err);
    res.status(500).json({ html: "<p>Error rendering preview</p>" });
  }
});

export default router;
