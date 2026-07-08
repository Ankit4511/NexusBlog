import { Bookmark } from "../Models/Bookmark.js";

// POST /api/bookmarks/:blogId  (protected)
export const toggleBookmark = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;

    const existingBookmark = await Bookmark.findOne({
      user: userId,
      blog: blogId,
    });

    if (existingBookmark) {
      await Bookmark.findByIdAndDelete(existingBookmark._id);

      return res.status(200).json({
        success: true,
        bookmarked: false,
        message: "Blog removed from saved list.",
      });
    }

    await Bookmark.create({
      user: userId,
      blog: blogId,
    });

    return res.status(201).json({
      success: true,
      bookmarked: true,
      message: "Blog saved successfully.",
    });
  } catch (error) {
    console.error("BOOKMARK ERROR", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/bookmarks/:blogId  (protected) — is this blog bookmarked by current user
export const getBookmarkStatus = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;

    const existingBookmark = await Bookmark.findOne({
      user: userId,
      blog: blogId,
    });

    return res.status(200).json({
      success: true,
      bookmarked: !!existingBookmark,
    });
  } catch (error) {
    console.error("BOOKMARK STATUS ERROR", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/bookmarks  (protected) — all blogs the current user has saved
export const getMyBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookmarks = await Bookmark.find({ user: userId })
      .populate({
        path: "blog",
        populate: { path: "user", select: "name email" },
      })
      .sort({ createdAt: -1 });

    // Filter out bookmarks whose blog was deleted afterwards
    const blogs = bookmarks
      .filter((b) => b.blog !== null)
      .map((b) => b.blog);

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("GET MY BOOKMARKS ERROR", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};