import express from "express";
import { getJobsPage } from "../controllers/indexController.js";

const router = express.Router();

router.get("/", getJobsPage);

export default router;
