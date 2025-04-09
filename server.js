// === START: Complete Express.js + EJS site for IkoConnect ===

// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { join } from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import signupRoutes from "./routes/signup.js";
import indexRoutes from "./routes/index.js";
import blogRoutes from "./routes/blog.js";
import resourceRoutes from "./routes/resources.js";
import jobsRoutes from "./routes/jobs.js";
import aboutRoutes from "./routes/about.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

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

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
