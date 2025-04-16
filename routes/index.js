import express from "express";
import {
  getHomepage,
  getAboutPage,
  getBlogPage,
  getJobsPage,
} from "../controllers/indexController.js";

const router = express.Router();

router.get("/", getHomepage);
router.get("/about", getAboutPage);
router.get("/blog", getBlogPage);
router.get("/jobs", getJobsPage);

export default router;

