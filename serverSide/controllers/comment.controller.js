import { Comment } from "../Models/Comment.js";
import { CommentLike } from "../Models/CommentLike.js";

export const addComment = async (req, res) => {
  try {
    const { text, parentComment } = req.body;
    const { blogId } = req.params;

    const comment = await Comment.create({
      text,
      blog: blogId,
      user: req.user._id,
      parentComment: parentComment || null,
    });

    await comment.populate("user", "name email");

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({
      blog: blogId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const commentsWithLikes = await Promise.all(
      comments.map(async (comment) => {
        const likeCount = await CommentLike.countDocuments({
          comment: comment._id,
        });

        let liked = false;

        if (req.user) {
          const existingLike = await CommentLike.findOne({
            comment: comment._id,
            user: req.user._id,
          });

          liked = !!existingLike;
        }

        return {
          ...comment.toObject(),
          liked,
          likeCount,
          replies: [],
        };
      })
    );

    // Build Tree
    const map = {};

    commentsWithLikes.forEach((comment) => {
      map[comment._id] = comment;
    });

    const rootComments = [];

    commentsWithLikes.forEach((comment) => {
      if (comment.parentComment) {
        if (map[comment.parentComment]) {
          map[comment.parentComment].replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    res.json({
      success: true,
      comments: rootComments,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (
      comment.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    comment.text = req.body.text;

    await comment.save();

    res.json({
      success: true,
      comment,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(
      req.params.commentId
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
      });
    }

    if (
      comment.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
      });
    }

    await CommentLike.deleteMany({
      comment: comment._id,
    });

    await comment.deleteOne();

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};

export const toggleCommentLike = async (
  req,
  res
) => {
  try {
    const { commentId } = req.params;

    const existing =
      await CommentLike.findOne({
        comment: commentId,
        user: req.user._id,
      });

    if (existing) {
      await existing.deleteOne();
    } else {
      await CommentLike.create({
        comment: commentId,
        user: req.user._id,
      });
    }

    const likeCount =
      await CommentLike.countDocuments({
        comment: commentId,
      });

    const liked = !existing;

    res.json({
      success: true,
      liked,
      likeCount,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};