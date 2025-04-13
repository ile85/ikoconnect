import express from "express";
import path from "path";

const router = express.Router();
const dataPath = path.join(process.cwd(), "data", "recommendations.json");

router.get("/", async (req, res) => {
  try {
    const tools = await fs.readJson(dataPath);
    res.render("pages/recommendations", { tools });
  } catch (err) {
    console.error("❌ Failed to load recommendations:", err);
    res.status(500).send("Server error");
  }
});

export default router;
