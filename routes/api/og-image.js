import express from "express";
import satori from "satori";
import fs from "fs";
import { Resvg } from "@resvg/resvg-js";
import { join } from "path";

const router = express.Router();

const fontPath = join(process.cwd(), "public/fonts/Inter-Bold.ttf");
const fontData = fs.readFileSync(fontPath);

router.get("/", async (req, res) => {
  const { title = "IkoConnect", description = "Freelancing Made Easy" } = req.query;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          backgroundColor: "#fff",
          width: "1200px",
          height: "630px",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "Inter",
        },
        children: [
          {
            type: "h1",
            props: {
              style: {
                fontSize: 60,
                marginBottom: "20px",
              },
              children: title,
            },
          },
          {
            type: "p",
            props: {
              style: {
                fontSize: 32,
                color: "#444",
              },
              children: description,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const pngBuffer = resvg.render().asPng();

  res.setHeader("Content-Type", "image/png");
  res.send(pngBuffer);
});

export default router;
