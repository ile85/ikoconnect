// routes/contact.js
import express from "express";
import nodemailer from "nodemailer";
import axios from "axios";
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
    error: error === "true",
  });
});

router.post("/", async (req, res) => {
  const token = req.body["g-recaptcha-response"];
  const { name, email, message } = req.body;

  if (!token || !name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields or token." });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET;
    const verifyURL = "https://www.google.com/recaptcha/api/siteverify";
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const { data } = await axios.post(verifyURL, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!data.success) {
      console.warn("❌ reCAPTCHA failed:", data);
      return res.redirect("/contact?error=true");
    }

    console.log("✅ reCAPTCHA passed!");

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: "💬 New Contact Form Submission",
      text: message,
    });

    await transporter.sendMail({
      from: `"IkoConnect Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your message",
      text: `Hi ${name},\n\nThanks for reaching out to us at IkoConnect!\n\nWe’ve received your message and will get back to you as soon as possible.\n\nBest regards,\nIkoConnect Team`,
    });

    return res.redirect("/contact?success=true");

  } catch (err) {
    console.error("❌ Email or reCAPTCHA error:", err);
    return res.redirect("/contact?error=true");
  }
});

export default router;
