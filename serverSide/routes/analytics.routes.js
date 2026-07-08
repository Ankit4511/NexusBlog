import express from "express";

import { getAnalytics } from "../controllers/analytics.controller.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();




router.get(
  "/",
  isAuthenticated,
  getAnalytics
);

export default router;