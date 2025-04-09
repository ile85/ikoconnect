// routes/jobs.js
import express from "express";
import { renderJobsPage } from "../controllers/jobController.js";

const router = express.Router();

router.get("/", renderJobsPage);

export default router;
