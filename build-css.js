// build-css.js
const fs = require("fs");
const postcss = require("postcss");
const tailwindcss = require("@tailwindcss/postcss");
const autoprefixer = require("autoprefixer");

async function generateCSS() {
  // 1) read your globals.css with the @tailwind directives
  const input = fs.readFileSync("src/app/globals.css", "utf8");

  // 2) run it through Tailwind’s PostCSS plugin + Autoprefixer
  const result = await postcss([tailwindcss, autoprefixer]).process(input, {
    from: "src/app/globals.css",
    to: "public/tailwind.css",
    map: false,
  });

  // 3) ensure public/ exists and write out tailwind.css
  fs.mkdirSync("public", { recursive: true });
  fs.writeFileSync("public/tailwind.css", result.css);

  console.log("✅ public/tailwind.css generated");
}

generateCSS().catch((err) => {
  console.error(err);
  process.exit(1);
});
