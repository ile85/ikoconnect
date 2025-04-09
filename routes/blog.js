// routes/blog.js
import express from "express";
import { renderBlogPage } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", renderBlogPage);

export default router;
