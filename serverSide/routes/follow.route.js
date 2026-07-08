import express from "express";
import {
  toggleFollow,
  getFollowStatus,
  getFollowers,
  getFollowing,
} from "../controllers/follow.controller.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Toggle follow/unfollow — requires login
router.post("/:userId", isAuthenticated, toggleFollow);

// Check if current logged-in user follows :userId — requires login
router.get("/status/:userId", isAuthenticated, getFollowStatus);

// Public — anyone can view followers/following list
router.get("/followers/:userId", getFollowers);
router.get("/following/:userId", getFollowing);

export default router;