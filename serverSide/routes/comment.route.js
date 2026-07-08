import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
  toggleCommentLike,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:blogId", isAuthenticated, getComments);

router.post("/:blogId", isAuthenticated, addComment);

router.put(
  "/:commentId",
  isAuthenticated,
  updateComment
);

router.delete(
  "/:commentId",
  isAuthenticated,
  deleteComment
);

router.post(
  "/like/:commentId",
  isAuthenticated,
  toggleCommentLike
);

export default router;