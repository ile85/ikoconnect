import { ImageResponse } from "@vercel/og";
import path from "path";
import express from "express";

const router = express.Router();

router.get("/og-image", async (req, res) => {
  const { title = "IkoConnect", description = "Your freelance productivity hub." } = req.query;

  try {
    const imagePath = path.join(process.cwd(), "public", "images", "apple-touch-icon.png");
    const imageData = fs.readFileSync(imagePath);

    const image = new ImageResponse(
      (
        <div style={{
          background: "#0d6efd",
          color: "white",
          width: "1200px",
          height: "630px",
          padding: "60px",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h1 style={{ fontSize: "64px", marginBottom: "30px" }}>{title}</h1>
          <p style={{ fontSize: "36px" }}>{description}</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [],
      }
    );

    res.setHeader("Content-Type", "image/png");
    res.send(image.body);
  } catch (err) {
    console.error("❌ OG image generation failed:", err);
    res.status(500).send("Failed to generate OG image");
  }
});

export default router;
