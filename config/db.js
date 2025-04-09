// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI); // 🔁 ова е доволно
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error("❌ MongoDB Error:", error.message);
      process.exit(1);
    }
  }
