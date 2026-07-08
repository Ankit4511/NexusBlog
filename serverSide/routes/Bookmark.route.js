import express from "express";  
import {
    toggleBookmark,
    getBookmarkStatus,  
    getMyBookmarks,
} from "../controllers/bookmark.controller.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// All bookmark routes requie  login
router.get("/", isAuthenticated, getMyBookmarks);
router.get("/:blogId", isAuthenticated, getBookmarkStatus);
router.post("/:blogId", isAuthenticated, toggleBookmark);

export default router;