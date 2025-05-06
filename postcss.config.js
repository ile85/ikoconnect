/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    // use the new adapter, not the core tailwindcss package
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
