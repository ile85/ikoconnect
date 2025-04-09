// routes/signup.js
import express from "express";
import { renderSignupForm, handleSignup } from "../controllers/signupController.js";

const router = express.Router();

router.get("/", renderSignupForm);
router.post("/", handleSignup);

export default router;
