import { Blog } from "../Models/blogs.js";
import { View } from "../Models/View.js";

export const registerView = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const userAgent = req.headers["user-agent"] || "";

const bots = [
  "bot",
  "crawler",
  "spider",
  "google",
  "bing",
];

const isBot = bots.some((bot) =>
  userAgent.toLowerCase().includes(bot)
);

if (isBot) {
  return res.status(200).json({
    success: true,
    views: blog.views,
  });
}

    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";


    const userId = req.user ? req.user._id : null;

    // Don't count author's own views
if (
  userId &&
  blog.user &&
  blog.user.toString() === userId.toString()
) {
  return res.status(200).json({
    success: true,
    views: blog.views,
  });
}

    // Prevent duplicate view within 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    let existingView;

    if (userId) {
      existingView = await View.findOne({
        user: userId,
        blog: blogId,
        viewedAt: {
          $gte: thirtyMinutesAgo,
        },
      });
    } else {
      existingView = await View.findOne({
        ip,
        blog: blogId,
        viewedAt: {
          $gte: thirtyMinutesAgo,
        },
      });
    }

    if (!existingView) {
      await View.create({
        user: userId,
        blog: blogId,
        ip,
        userAgent,
      });

      blog.views += 1;

      await blog.save();
    }

    return res.status(200).json({
      success: true,
      views: blog.views,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getViews = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).select("views");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      views: blog.views,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
