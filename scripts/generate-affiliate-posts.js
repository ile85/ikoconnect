const fs = require("fs/promises");
const path = require("path");

const tools = require("../src/data/affiliateTools.json");
const postsDir = path.join(process.cwd(), "content", "blog");

async function run() {
  try {
    await fs.mkdir(postsDir, { recursive: true });

    for (const tool of tools) {
      const slug = (tool.id || tool.name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");

      const filename = path.join(postsDir, `${slug}.md`);

      try {
        await fs.access(filename);
        console.log(`🔸 Skipping existing post: ${slug}`);
        continue;
      } catch (_) {
        // File doesn't exist
      }

      const frontmatter = [
        `title: "${tool.name}"`,
        `description: "${(tool.description || "").replace(/"/g, '\\"')}"`,
        `date: "${new Date().toISOString()}"`,
        `tags: ${JSON.stringify(tool.tags || [])}`,
        `coverImage: "${tool.logo || "/images/og/default.png"}"`,
        `author: "IkoConnect Team"`
      ].join("\n");

      const markdown = `---\n${frontmatter}\n---\n\nDiscover more: [Visit Website](${tool.url || "#"})\n`;

      await fs.writeFile(filename, markdown, "utf-8");
      console.log(`✅ Created: ${slug}.md`);
    }
  } catch (err) {
    console.error("🔥 FATAL ERROR:", err.message);
    process.exit(1);
  }
}

run();
