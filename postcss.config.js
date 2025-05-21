// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},   // if you need it—otherwise you can remove this line
    tailwindcss: {},        // ← the official Tailwind plugin
    autoprefixer: {},       // to add vendor prefixes
  },
};
