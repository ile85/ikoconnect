// routes/contact.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/contact");
});

router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`📩 New message from ${name} (${email}): ${message}`);
  res.status(200).json({ message: "Thank you for reaching out!" });
});

export default router;
