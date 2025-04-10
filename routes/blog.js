// routes/blog.js
import express from "express";
import { renderBlogPage, renderSinglePost } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", renderBlogPage);
router.get("/:slug", renderSinglePost); // dynamic blog post

export default router;
