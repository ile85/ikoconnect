const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

// Path to your job data
const jobs = require("../data/jobs.json");

// Output folder
const outputDir = path.join(__dirname, "../content/blog/jobs");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

jobs.forEach((job) => {
  const slug = slugify(`${job.company_name}-${job.title}`, { lower: true });
  const filePath = path.join(outputDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.log(`🔸 Skipping: ${slug}`);
    return;
  }

  const description = job.description.replace(/<[^>]*>/g, "").trim();

  const md = `---
title: "${job.title} at ${job.company_name}"
description: "${description.slice(0, 160)}"
slug: "${slug}"
date: "${job.publication_date}"
tags: ["${job.category}", "${job.job_type}", "Remote"]
coverImage: "${job.company_logo || "/images/og-jobs.png"}"
author: "IkoConnect"
---

${description}

[Apply Here](${job.url})
`;

  fs.writeFileSync(filePath, md.trim());
  console.log(`✅ Created: ${filePath}`);
});
