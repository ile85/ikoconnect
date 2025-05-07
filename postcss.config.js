// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {},  // legacy adapter, required for Next 15
    autoprefixer: {},
  },
};
