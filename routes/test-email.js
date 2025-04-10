import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: `"Test from CLI" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_TO,
  subject: "📬 Тест порака од CLI",
  text: "Ова е тест порака од test-email.js фајлот.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error("❌ SENDMAIL FAILED:", error);
  }
  console.log("✅ Email испратен:", info.response);
});
