const fs = require("fs/promises");
const path = require("path");

(async () => {
  try {
    const filename = path.join(process.cwd(), "content", "blog", "test.md");
    const content = `# Test\n\nThis is a test post.`;
    await fs.writeFile(filename, content, "utf-8");
    console.log("✅ Simple write passed.");
  } catch (e) {
    console.error("❌ WRITE FAIL:", e);
  }
})();
