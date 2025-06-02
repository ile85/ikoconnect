// /var/www/ikoconnect/tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/globals.css",
  ],
  safelist: [
    "animate-float",
    "animate-float-slow",
    "animate-ping",
    "blur-3xl",
    "blur-2xl",
    "animate-blob",
    "animate-pulseFast",
    "blur-xl",
    "bg-animated-gradient",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%":      { transform: "translateY(-20px) translateX(-10px)" },
        },
        blob: {
          "0%":   { borderRadius: "42% 58% 70% 30% / 30% 60% 40% 70%", transform: "scale(1)" },
          "33%":  { borderRadius: "60% 40% 50% 50% / 60% 30% 70% 40%", transform: "scale(1.1) rotate(5deg)" },
          "66%":  { borderRadius: "50% 60% 40% 60% / 70% 50% 60% 30%", transform: "scale(1.05) rotate(-3deg)" },
          "100%": { borderRadius: "42% 58% 70% 30% / 30% 60% 40% 70%", transform: "scale(1)" },
        },
        pulseFast: {
          "0%, 100%": { opacity: 0.3, transform: "scale(1)" },
          "50%":      { opacity: 0.6, transform: "scale(1.2)" },
        },
        "gradient-pan": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%":      { "background-position": "100% 50%" },
        },
        shimmer: {
          "0%":   { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
      },
      animation: {
        float:         "float 6s ease-in-out infinite",
        "float-slow":  "float-slow 10s ease-in-out infinite",
        ping:          "ping 4s cubic-bezier(0,0,0.2,1) infinite",
        blob:          "blob 8s ease-in-out infinite",
        pulseFast:     "pulseFast 2s ease-in-out infinite",
        "gradient-pan": "gradient-pan 10s ease-in-out infinite",
        shimmer:       "shimmer 2s infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".bg-animated-gradient": {
          background: "linear-gradient(120deg, rgba(224,255,246,0.4), rgba(213,250,240,0.4), rgba(224,255,246,0.4))",
          "background-size": "200% 200%",
          animation: "gradient-pan 20s ease-in-out infinite",
        },
      });
    }),
  ],
};
