import { Blog } from "../Models/blogs.js";
import jwt from "jsonwebtoken";

export const createBlog = async (req, res) => {
  const { title, description, imgUrl ,status} = req.body;

  await Blog.create({
    title,
    description,
    imgUrl,
    status: status === "draft" ? "draft" : "published",
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: 
    status === "draft" 
    ? "Blog saved as draft successfully !" 
    : "Blog created successfully !"
    ,
  });
};
export const myBlog = async (req, res) => {
  const userid = req.user._id;

  const blogs = await Blog.find({ user: userid })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    blogs,
  });
};

export const updateBlog = async (req, res) => {
  const { title, description, imgUrl , status} = req.body;

  const id = req.params.id;

  const blog = await Blog.findById(id);

  if (!blog)
    return res.status(404).json({
      success: false,
      message: "Blog not found !",
    });

  // ✅ Only update if value is provided
  if (title !== undefined) blog.title = title;
  if (description !== undefined) blog.description = description;
  if (imgUrl !== undefined) blog.imgUrl = imgUrl;
  if (status !== undefined) blog.status = status;

  blog.save();

  res.json({
    success: true,
    message: status === "draft" 
      ? "Draft updated successfully !" 
      : "Blog updated successfully !",
    blog,
  });
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);

  if (!blog)
    return res.status(404).json({
      success: false,
      message: "Blog not found !",
    });
  await blog.deleteOne();

  res.json({
    success: true,
    message: "Blog deleted successfully !",
  });
};

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({status: "published"})
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  if (!blogs)
    return res.status(404).json({
      success: false,
      message: "No blogs found !",
    });

  res.status(200).json({
    success: true,
    message: "All blogs fetched successfully !",
    blogs,
  });
};

export const getBlogById = async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id).populate("user", "name email");

  if (!blog)
    return res.status(404).json({
      success: false,
      message: "Blog not found !",
    });

  res.status(200).json({
    success: true,
    message: "Your Blog fetched successfully !",
    blog,
  });
};

// Public — all blogs published by a specific author (for their public profile page)
export const getBlogsByUser = async (req, res) => {
  const id = req.params.id;

  const blogs = await Blog.find({ user: id , status : "published"})
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "User blogs fetched successfully !",
    blogs,
  });
};


