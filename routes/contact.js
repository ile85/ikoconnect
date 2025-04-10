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
  const { success, error } = req.query;
  res.render("pages/contact", {
    success: success === "true",
    error: error === "true"
  });
});
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1️⃣ Испрати email до тебе
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: "💬 New Contact Form Submission",
      text: message,
    });

    console.log(`✅ Email sent from ${name} (${email})`);

    // 2️⃣ Автоматски одговор до клиентот
    await transporter.sendMail({
      from: `"IkoConnect Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your message",
      text: `Hi ${name},\n\nThanks for reaching out to us at IkoConnect!\n\nWe’ve received your message and will get back to you as soon as possible.\n\nBest regards,\nIkoConnect Team`,
    });

    res.redirect("/contact?success=true");
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    res.redirect("/contact?error=true");
  }
});

export default router;
