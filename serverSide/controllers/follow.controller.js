import { Follow } from "../Models/Follow.js";
import { User } from "../Models/users.js";

// POST /api/follow/:userId  (protected)
export const toggleFollow = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    if (userId === String(currentUserId)) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself.",
      });
    }

    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found !",
      });
    }

    const existingFollow = await Follow.findOne({
      follower: currentUserId,
      following: userId,
    });

    if (existingFollow) {
      await Follow.findByIdAndDelete(existingFollow._id);

      const followersCount = await Follow.countDocuments({ following: userId });

      return res.status(200).json({
        success: true,
        following: false,
        followersCount,
        message: "Unfollowed successfully.",
      });
    }

    await Follow.create({
      follower: currentUserId,
      following: userId,
    });

    const followersCount = await Follow.countDocuments({ following: userId });

    return res.status(201).json({
      success: true,
      following: true,
      followersCount,
      message: "Followed successfully.",
    });
  } catch (error) {
    console.error("FOLLOW ERROR", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/follow/status/:userId  (protected)
export const getFollowStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    const existingFollow = await Follow.findOne({
      follower: currentUserId,
      following: userId,
    });

    return res.status(200).json({
      success: true,
      following: !!existingFollow,
    });
  } catch (error) {
    console.error("FOLLOW STATUS ERROR", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/follow/followers/:userId  (public)
export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await Follow.find({ following: userId })
      .populate("follower", "name email avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: followers.length,
      followers: followers.map((f) => f.follower),
    });
  } catch (error) {
    console.error("GET FOLLOWERS ERROR", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/follow/following/:userId  (public)
export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const following = await Follow.find({ follower: userId })
      .populate("following", "name email avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: following.length,
      following: following.map((f) => f.following),
    });
  } catch (error) {
    console.error("GET FOLLOWING ERROR", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};