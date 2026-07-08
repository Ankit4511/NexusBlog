import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createBlog, myBlog, updateBlog,deleteBlog, getAllBlogs, getBlogById, getBlogsByUser} from "../controllers/blog.js";


const router = express.Router();

// create blog API
router.post("/create", isAuthenticated,createBlog);

router.get("/myblogs", isAuthenticated,myBlog);

router.put("/:id", isAuthenticated,updateBlog);

router.delete("/:id", isAuthenticated,deleteBlog);

router.get("/allblogs", getAllBlogs); // New route to get all blogs

//get all blogs by id
router.get("/blog/:id", getBlogById);

// all blogs written by a specific author (public profile page)
router.get("/user/:id", getBlogsByUser);



export default router;