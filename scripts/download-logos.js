const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const https = require("https");

const blogDir = path.join(__dirname, "../content/blog");
const logoDir = path.join(__dirname, "../public/images/logos");
if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

files.forEach((file) => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(content);
  const companyName = extractCompanyNameFromTitle(data.title || file.replace(/\.md$/, ""));

  if (!companyName) return;

  const logoUrl = `https://logo.clearbit.com/${toDomain(companyName)}`;
  const outputPath = path.join(logoDir, `${toSlug(companyName)}.png`);

  if (fs.existsSync(outputPath)) {
    console.log(`🔸 Already exists: ${outputPath}`);
    return;
  }

  https.get(logoUrl, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close();
        console.log(`✅ Downloaded: ${outputPath}`);
      });
    } else {
      console.warn(`❌ Failed to download for ${companyName}: ${logoUrl}`);
    }
  }).on("error", (err) => {
    console.error(`❌ Error fetching ${companyName}:`, err.message);
  });
});

function extractCompanyNameFromTitle(title) {
  // Example: "UX Designer at UX Studio"
  const match = title.match(/at\s(.+)$/i);
  return match ? match[1].trim() : null;
}

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

function toDomain(name) {
  // crude conversion: UX Studio → uxstudio.com
  return name
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^\w]/g, "") + ".com";
}
