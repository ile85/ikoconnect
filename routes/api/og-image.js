import express from "express";
import puppeteer from "puppeteer";

const router = express.Router();

router.get("/", async (req, res) => {
  const { title = "IkoConnect", description = "Your freelance hub" } = req.query;

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            width: 1200px;
            height: 630px;
            margin: 0;
            padding: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #ffffff;
            font-family: Arial, sans-serif;
          }
          h1 {
            font-size: 60px;
            margin: 0;
          }
          p {
            font-size: 30px;
            color: #555555;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <p>${description}</p>
      </body>
    </html>
  `;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const screenshotBuffer = await page.screenshot({ type: "png" });
    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(screenshotBuffer);
  } catch (error) {
    console.error("Error generating OG image:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
