import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },

    ip: {
      type: String,
      required: true,
    },

    userAgent: {
      type: String,
      default: "",
    },

    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate views from same user/IP on same blog
viewSchema.index({
  blog: 1,
});

viewSchema.index({
  user: 1,
});

viewSchema.index({
  ip: 1,
});

viewSchema.index({
  viewedAt: -1,
});

export const View = mongoose.model("View", viewSchema);