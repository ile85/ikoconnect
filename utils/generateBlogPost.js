// utils/generateBlogPost.js
import fs from "fs-extra";
import path from "path";
import slugify from "slugify";

export async function generateBlogPost({ title, description, link }) {
  const slug = slugify(title, { lower: true, strict: true });
  const filePath = path.join(process.cwd(), "blog", `${slug}.md`);
  const today = new Date().toISOString().split("T")[0];

  const markdown = `---
title: ${title}
date: ${today}
description: ${description}
---

## About This Tool

${description}

👉 [Check it out here](${link})

---

🔍 Stay tuned for more tools like **${title}** on IkoConnect!
`;

  await fs.writeFile(filePath, markdown);
  console.log(`✅ Blog post generated: ${slug}.md`);
}

    
