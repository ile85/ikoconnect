// === START: Complete Express.js + EJS site for IkoConnect ===

// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import signupRoutes from "./routes/signup.js";
import indexRoutes from "./routes/index.js";
import blogRoutes from "./routes/blog.js";
import resourceRoutes from "./routes/resources.js";
import jobsRoutes from "./routes/jobs.js";
import aboutRoutes from "./routes/about.js";
import contactRoutes from "./routes/contact.js";

const PORT = process.env.PORT || 5500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use("/contact", contactRoutes);

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

connectDB();

app.use("/signup", signupRoutes);
app.use("/", indexRoutes);
app.use("/blog", blogRoutes);
app.use("/resources", resourceRoutes);
app.use("/jobs", jobsRoutes);
app.use("/about", aboutRoutes);

app.get("/favicon.ico", (req, res) => {
  res.status(200).sendFile(join(__dirname, "public", "images", "favicon.ico"));
});

app.post("/subscribe", (req, res) => {
  const email = req.body.email;
  console.log(`📩 New subscription from: ${email}`);
  res.status(200).json({ message: "✅ Thank you for subscribing!" });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("section");
  const toast = document.getElementById("toast");

  const showToast = (msg, type) => {
    toast.textContent = msg;
    toast.className = `toast show ${type}`;
    setTimeout(() => toast.className = "toast", 5000);
  };

  if (section?.dataset.success === "true") {
    showToast("✅ Your message has been sent successfully!", "success");
  }

  if (section?.dataset.error === "true") {
    showToast("❌ Something went wrong. Please try again.", "error");
  }
});
