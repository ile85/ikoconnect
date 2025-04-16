import express from "express";
import { renderResourcesPage } from "../controllers/resourceController.js";

const router = express.Router();

router.get("/", renderResourcesPage);

export default router;
