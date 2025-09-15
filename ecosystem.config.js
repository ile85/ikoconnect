module.exports = {
  apps: [
    {
      name: "ikoconnect",
      script: process.env.STANDALONE === "1" ? ".next/standalone/server.js" : "node_modules/next/dist/bin/next",
      args: process.env.STANDALONE === "1" ? "" : "start -p " + (process.env.PORT || 3000),
      env: {
        NODE_ENV: "production",
        PORT: "3000"
      }
    }
  ]
}
