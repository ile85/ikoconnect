import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.get("/", (req, res) => {
  res.render("pages/contact", { success: false, error: false });
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: "💬 Ново порака од контакт форма",
      text: message,
    });

    console.log(`✅ Email испратен од ${name} (${email})`);
    res.render("pages/contact", { success: true, error: false });
  } catch (err) {
    console.error("❌ Email не успеа:", err);
    res.render("pages/contact", { success: false, error: true });
  }
});

export default router;
