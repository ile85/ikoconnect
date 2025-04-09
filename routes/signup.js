import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/signup");
});

router.post("/", (req, res) => {
  const { email, name } = req.body;
  console.log(`📝 Signup submitted: ${name} (${email})`);
  res.status(200).json({ message: "Signup received!" });
});

export default router;