// tailwind.config.js
const plugin = require("tailwindcss/plugin");
module.exports = {
  darkMode: "class",
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/globals.css',
      
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
