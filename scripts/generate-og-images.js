const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

// Folder containing markdown posts
const blogDir = path.join(__dirname, "../content/blog");

// Output folder for OG images
const outputDir = path.join(__dirname, "../public/images/og");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Extract frontmatter from markdown files
const matter = require("gray-matter");

(async () => {
  const files = fs.readdirSync(blogDir).filter(file => file.endsWith(".md"));

  const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
  const page = await browser.newPage();

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);

    const title = data.title || slug;
    const description = data.description || "";

    const html = `
      <html>
        <head>
          <style>
            body {
              margin: 0;
              width: 1200px;
              height: 630px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-family: Arial, sans-serif;
              background: #fff;
              padding: 40px;
              box-sizing: border-box;
            }
            h1 {
              font-size: 48px;
              color: #00957F;
              text-align: center;
              margin-bottom: 20px;
            }
            p {
              font-size: 24px;
              color: #333;
              text-align: center;
              max-width: 1000px;
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <p>${description}</p>
        </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: "networkidle0" });

    const fileOutput = path.join(outputDir, slug + ".png");
    await page.screenshot({ path: fileOutput, type: "png" });
    console.log("✅ OG image created for:", slug);
  }

  await browser.close();
})();
