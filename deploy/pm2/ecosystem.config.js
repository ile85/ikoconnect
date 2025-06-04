// deploy/pm2/ecosystem.config.js

/**
 * PM2 Configuration за IkoConnect
 * --------------------------------
 * Ова фајл го користиш само при деплој на сервер со PM2.
 * Не го пуштај во коренот на build процесот – служи само за production runtime.
 */

module.exports = {
  apps: [
    {
      name: "ikoconnect",
      // Ако стартуваш PM2 додека си во root‐директориумот на апликацијата,
      // ова cwd може да биде само "." (тековен working directory).
      cwd: "./",                     // relative path: почни од моменталниот директориум
      script: "npm",                 // First, ќе викнеш `npm start`
      args: "start",                 // `npm start` → `next start`
      interpreter: "node",           // (или `/usr/bin/node` ако сакаш апсолутно)
      env: {
        NODE_ENV: "production",
        // Тука може да додадеш други environment променливи (ако не ги load‐аш од .env)
        // EXAMPLE:
        // NEXT_PUBLIC_SITE_URL: "https://ikoconnect.com",
      },
    },
  ],
};
