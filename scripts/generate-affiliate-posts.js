// scripts/generate-affiliate-posts.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Папката каде се креираат blog постовите
const postsDir = path.join(process.cwd(), 'content', 'blog');
if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

// Affiliate алатки
const tools = require('../src/data/affiliateTools.json');

tools.forEach(tool => {
  const slug = tool.id
    ? tool.id
    : tool.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

  const filename = path.join(postsDir, `${slug}.md`);
  if (fs.existsSync(filename)) {
    console.log(`🔸 Skipping existing post: ${slug}`);
    return;
  }

  // Генерираме frontmatter
  const frontmatter = {
    title: tool.name,
    date: new Date().toISOString().split('T')[0], // само датум
    description: tool.description || '',
    tags: tool.tags || [],
    coverImage: `/images/og/${slug}.png`, // ✅ точна OG слика патека
  };

  // Конвертираме во .md
  const markdown = matter.stringify(
    `Welcome to our deep dive of **${tool.name}**!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    frontmatter
  );

  // Запишуваме
  fs.writeFileSync(filename, markdown.trim() + '\n');
  console.log(`✅ Generated post: ${slug}`);
});
