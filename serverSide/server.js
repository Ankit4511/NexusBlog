import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import likeRouter from "./routes/like.route.js";
import commentRouter from "./routes/comment.route.js";
import followRouter from "./routes/follow.route.js";
import bookmarkRouter from "./routes/Bookmark.route.js";
import viewRouter from "./routes/view.route.js";
import analyticsRouter from "./routes/analytics.routes.js";


// Load environment variables FIRST
config({
  path: "./data/config.env",
});

const app = express();

// Required behind Render's reverse proxy so Express correctly detects
// HTTPS — otherwise secure-cookie / req.secure logic can misbehave.
app.set("trust proxy", 1);

// Disable auto ETag generation. Without this, Express returns 304 for
// repeated identical GETs (e.g. /myprofile), and axios's default
// validateStatus rejects 304 as an error — causing false "not authenticated"
// results even when the token/cookie is completely valid.
app.set("etag", false);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Debug
console.log("Frontend URL:", process.env.FRONTEND_URL);

// MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "mernproject",
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/likes", likeRouter);
app.use("/api/comments", commentRouter);
app.use("/api/follow", followRouter);
app.use("/api/bookmarks", bookmarkRouter);
app.use("/api/views", viewRouter);
app.use("/api/analytics", analyticsRouter);
// Server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);

console.log("NODE_ENV =", process.env.NODE_ENV);