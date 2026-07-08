import { Like } from "../Models/Like.js";

export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;

    console.log("========== TOGGLE LIKE ==========");
    console.log("Blog ID:", blogId);
    console.log("User ID:", userId);

    const existingLike = await Like.findOne({
      user: userId,
      blog: blogId,
    });

    console.log("Existing Like:", existingLike);

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);

      const count = await Like.countDocuments({
        blog: blogId,
      });

      console.log("Like Removed");

      return res.status(200).json({
        success: true,
        liked: false,
        count,
        message: "Blog unliked successfully.",
      });
    }

    console.log("Creating Like...");

    await Like.create({
      user: userId,
      blog: blogId,
    });

    console.log("Like Created");

    const count = await Like.countDocuments({
      blog: blogId,
    });

    return res.status(201).json({
      success: true,
      liked: true,
      count,
      message: "Blog liked successfully.",
    });
  } catch (error) {
    console.error("LIKE ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLikeStatus = async (req, res) => {
  try {
    const { blogId } = req.params;

    const count = await Like.countDocuments({
      blog: blogId,
    });

    let liked = false;

    if (req.user) {
      const existingLike = await Like.findOne({
        user: req.user._id,
        blog: blogId,
      });

      liked = !!existingLike;
    }

    return res.status(200).json({
      success: true,
      liked,
      count,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};