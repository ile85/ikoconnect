// tailwind.config.js
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/globals.css',
    './src/styles/input.css',   // we need this so it sees your @apply
  ],
  theme: { extend: {} },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addBase }) {
      addBase({
        "input, button": {
          appearance: "none",            /* standard property */
          WebkitAppearance: "none"       /* vendor prefix (automatically lower-cased) */
        },
      });
    }),
  ],
};
