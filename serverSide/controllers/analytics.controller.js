import mongoose from "mongoose";

import { Blog } from "../Models/blogs.js";
import { View } from "../Models/View.js";
import { Like } from "../Models/Like.js";
import { Comment } from "../Models/Comment.js";
import { Follow } from "../Models/Follow.js";

/*
|--------------------------------------------------------------------------
| Analytics Controller
|--------------------------------------------------------------------------
| GET /api/analytics
|--------------------------------------------------------------------------
| Returns:
| - Dashboard Stats
| - Top Blog
| - Recent Posts
| - Activity Chart
| - Insights
|--------------------------------------------------------------------------
*/

export const getAnalytics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    /*
    ===========================================================
    STEP 1
    Get all blog ids of current logged in user
    ===========================================================
    */

    const userBlogs = await Blog.find(
      { user: userId },
      { _id: 1 }
    ).lean();

    const blogIds = userBlogs.map((blog) => blog._id);

    /*
    ===========================================================
    If user has no blogs
    ===========================================================
    */

    if (blogIds.length === 0) {
      return res.status(200).json({
        success: true,
        stats: {
          blogs: 0,
          views: 0,
          likes: 0,
          comments: 0,
          followers: 0,
        },
        topBlog: null,
        recentPosts: [],
        chart: [],
        insights: [
          "Create your first blog to unlock analytics."
        ],
      });
    }

    /*
    ===========================================================
    Run Independent Queries Together
    ===========================================================
    */

    const [

      totalViews,

      totalLikes,

      totalComments,

      totalFollowers,

      totalBlogs,

      recentPosts,

      topBlog,

      activityData,

    ] = await Promise.all([

      /*
      =======================================================
      TOTAL VIEWS
      =======================================================
      */

      View.aggregate([
        {
          $match: {
            blog: {
              $in: blogIds,
            },
          },
        },
        {
          $count: "count",
        },
      ]),

      /*
      =======================================================
      TOTAL LIKES
      =======================================================
      */

      Like.aggregate([
        {
          $match: {
            blog: {
              $in: blogIds,
            },
          },
        },
        {
          $count: "count",
        },
      ]),

      /*
      =======================================================
      TOTAL COMMENTS
      =======================================================
      */

      Comment.aggregate([
        {
          $match: {
            blog: {
              $in: blogIds,
            },
          },
        },
        {
          $count: "count",
        },
      ]),

      /*
      =======================================================
      FOLLOWERS
      =======================================================
      */

      Follow.aggregate([
        {
          $match: {
            following: userId,
          },
        },
        {
          $count: "count",
        },
      ]),

      /*
      =======================================================
      TOTAL BLOGS
      =======================================================
      */

      Blog.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $count: "count",
        },
      ]),

      /*
      =======================================================
      RECENT POSTS
      =======================================================
      */

      Blog.aggregate([
        {
          $match: {
            user: userId,
          },
        },

        {
          $lookup: {
            from: "views",
            localField: "_id",
            foreignField: "blog",
            as: "views",
          },
        },

        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "blog",
            as: "likes",
          },
        },

        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "blog",
            as: "comments",
          },
        },

        {
          $project: {

            title: 1,

            imgUrl: 1,

            createdAt: 1,

            totalViews: {
              $size: "$views",
            },

            totalLikes: {
              $size: "$likes",
            },

            totalComments: {
              $size: "$comments",
            },
          },
        },

        {
          $sort: {
            createdAt: -1,
          },
        },

        {
          $limit: 5,
        },
      ]),

      /*
      =======================================================
      TOP PERFORMING BLOG
      =======================================================
      */

      Blog.aggregate([
        {
          $match: {
            user: userId,
          },
        },

        {
          $lookup: {
            from: "views",
            localField: "_id",
            foreignField: "blog",
            as: "views",
          },
        },

        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "blog",
            as: "likes",
          },
        },

        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "blog",
            as: "comments",
          },
        },

        {
          $addFields: {

            totalViews: {
              $size: "$views",
            },

            totalLikes: {
              $size: "$likes",
            },

            totalComments: {
              $size: "$comments",
            },

            engagementScore: {
              $add: [
                {
                  $multiply: [
                    {
                      $size: "$views",
                    },
                    1,
                  ],
                },
                {
                  $multiply: [
                    {
                      $size: "$likes",
                    },
                    5,
                  ],
                },
                {
                  $multiply: [
                    {
                      $size: "$comments",
                    },
                    3,
                  ],
                },
              ],
            },
          },
        },

        {
          $sort: {
            engagementScore: -1,
          },
        },

        {
          $limit: 1,
        },
      ]),

      /*
      =======================================================
      LAST 30 DAYS ACTIVITY
      =======================================================
      */

      View.aggregate([
        {
          $match: {
            blog: {
              $in: blogIds,
            },
            createdAt: {
              $gte: new Date(
                Date.now() - 1000 * 60 * 60 * 24 * 30
              ),
            },
          },
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format: "%d %b",
                date: "$createdAt",
              },
            },

            views: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id": 1,
          },
        },
      ]),

    ]);
        /*
    ===========================================================
    STEP 2
    Format Dashboard Stats
    ===========================================================
    */

    const stats = {
      blogs: totalBlogs[0]?.count || 0,
      views: totalViews[0]?.count || 0,
      likes: totalLikes[0]?.count || 0,
      comments: totalComments[0]?.count || 0,
      followers: totalFollowers[0]?.count || 0,
    };

    /*
    ===========================================================
    STEP 3
    Format Activity Chart
    ===========================================================
    */

    const chart = activityData.map((item) => ({
      date: item._id,
      views: item.views,
    }));

    /*
    ===========================================================
    STEP 4
    Get Top Blog
    ===========================================================
    */

    const bestBlog = topBlog.length
      ? {
          _id: topBlog[0]._id,
          title: topBlog[0].title,
          imgUrl: topBlog[0].imgUrl,
          totalViews: topBlog[0].totalViews,
          totalLikes: topBlog[0].totalLikes,
          totalComments: topBlog[0].totalComments,
          engagementScore: topBlog[0].engagementScore,
        }
      : null;

    /*
    ===========================================================
    STEP 5
    Insider Insights
    ===========================================================
    */

    const insights = [];

    // Views Insight

    if (stats.views >= 1000) {
      insights.push(
        "🔥 Amazing! Your blogs have crossed 1,000 total views."
      );
    } else if (stats.views >= 500) {
      insights.push(
        "📈 Great progress! You're building a steady audience."
      );
    } else {
      insights.push(
        "✍️ Publish consistently to increase your reach."
      );
    }

    // Likes Insight

    if (stats.likes >= 100) {
      insights.push(
        "❤️ Readers are actively liking your content."
      );
    } else {
      insights.push(
        "👍 Encourage readers to like your articles."
      );
    }

    // Comments Insight

    if (stats.comments >= 50) {
      insights.push(
        "💬 Your audience is engaging through discussions."
      );
    } else {
      insights.push(
        "💬 Ask questions inside your blogs to increase comments."
      );
    }

    // Followers Insight

    if (stats.followers >= 100) {
      insights.push(
        "🚀 You are building a strong creator community."
      );
    } else {
      insights.push(
        "👥 Share your profile to gain more followers."
      );
    }

    // Blog Publishing Insight

    if (stats.blogs < 5) {
      insights.push(
        "📝 Publish more blogs to unlock meaningful analytics."
      );
    } else {
      insights.push(
        "🎯 Excellent consistency! Keep publishing regularly."
      );
    }

    /*
    ===========================================================
    STEP 6
    Response
    ===========================================================
    */

    return res.status(200).json({
      success: true,

      stats,

      chart,

      topBlog: bestBlog,

      recentPosts,

      insights,
    });

  } catch (error) {

    console.error("Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics.",
      error: process.env.NODE_ENV === "development"
        ? error.message
        : undefined,
    });

  }
};