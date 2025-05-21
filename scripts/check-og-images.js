const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const blogDir = path.join(__dirname, "../content/blog");
const publicDir = path.join(__dirname, "../public");

console.log("🔍 Checking OG image presence in blog posts...");

const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".md"));

files.forEach(file => {
  const slug = file.replace(/\.md$/, "");
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(content);

  const coverImage = data.coverImage;
  const resolvedPath = coverImage?.startsWith("/")
    ? path.join(publicDir, coverImage)
    : path.join(publicDir, "images/og", `${slug}.png`);

  if (!coverImage) {
    console.log(`❌ ${file}: Missing 'coverImage' in frontmatter`);
  } else if (!fs.existsSync(resolvedPath)) {
    console.log(`❌ ${file}: coverImage file not found → ${coverImage}`);
  } else {
    console.log(`✅ ${file}: OK`);
  }
});

console.log("\n✅ Done.");
