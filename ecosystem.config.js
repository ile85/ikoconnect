// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "ikoconnect",
        cwd: "/var/www/ikoconnect",    // <— run from this folder
        script: "npm",
        args: "start",                  // runs `npm start` → `next start`
        interpreter: "/usr/bin/node",
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  };
  