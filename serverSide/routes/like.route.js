import express from "express";
import {
  toggleLike,
  getLikeStatus,
} from "../controllers/like.contoller.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:blogId", isAuthenticated, getLikeStatus);

// 👇 TEMPORARY
router.post("/:blogId", (req, res, next) => {
  console.log("POST Cookies:", req.cookies);
  next();
}, isAuthenticated, toggleLike);

export default router;