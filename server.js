// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// 📦 ROUTES
import indexRoutes from "./routes/index.js";
import blogRoutes from "./routes/blog.js";
import resourceRoutes from "./routes/resources.js"; 
import jobsRoutes from "./routes/jobs.js";
import aboutRoutes from "./routes/about.js";
import contactRoutes from "./routes/contact.js";
import signupRoutes from "./routes/signup.js";
import adminRoutes from "./routes/admin.js";
import recommendationRoutes from "./routes/recommendations.js";
import previewRoutes from "./routes/preview.js";
import seoRoutes from "./routes/seo.js";

// 📦 DB Connection
import connectDB from "./config/db.js";

// 📍 INIT
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🌐 MIDDLEWARES
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "https://www.google.com", "https://www.gstatic.com", "https://www.recaptcha.net"],
      "script-src-elem": ["'self'", "https://www.google.com", "https://www.gstatic.com", "https://www.recaptcha.net"],
      "frame-src": ["'self'", "https://www.google.com", "https://www.gstatic.com", "https://www.recaptcha.net"],
      "connect-src": ["'self'", "https://www.google.com", "https://www.gstatic.com"]
    }
  }
}));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(join(__dirname, "public")));

// ✅ Set view engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.set("view cache", false);

// 🛠 Pass original URL to all views
app.use((req, res, next) => {
  res.locals.originalUrl = req.originalUrl;
  next();
});

// 🛠 Connect to MongoDB
connectDB();

// 📁 ROUTES
app.use("/", indexRoutes);
app.use("/blog", blogRoutes);
app.use("/resources", resourceRoutes);
app.use("/jobs", jobsRoutes);
app.use("/about", aboutRoutes);
app.use("/contact", contactRoutes);
app.use("/signup", signupRoutes);
app.use("/admin", adminRoutes);
app.use("/recommendations", recommendationRoutes);
app.use("/api", previewRoutes);
app.use("/", seoRoutes);

// 📥 Subscription route
app.post("/subscribe", (req, res) => {
  const email = req.body.email;
  console.log(`📩 New subscription from: ${email}`);
  res.status(200).json({ message: "✅ Thank you for subscribing!" });
});

// 🖼️ Favicon
app.get("/favicon.ico", (req, res) => {
  res.status(200).sendFile(join(__dirname, "public", "images", "favicon.ico"));
});
// ❌ Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

import fs from "fs";
console.log("✅ resources.js is being loaded: ", fs.existsSync("./routes/resources.js"));
// Debugging route for jobs
app.get("/debug-jobs", (req, res) => {
  res.render("pages/jobs", { title: "Debug Jobs", description: "", jobs: null });
});

// 🚀 Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
