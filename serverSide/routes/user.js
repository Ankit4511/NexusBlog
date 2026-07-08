import express from "express";
import {
  userLogin,
  userRegister,
  userLogout,
  getMyProfile,
  getUserById,
  forgotPassword,
  resetPassword,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// register API
router.post("/register", userRegister);

// login API
router.post("/login", userLogin);

// logout API
router.get("/logout", userLogout);

router.get("/myprofile", isAuthenticated, getMyProfile);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token",resetPassword);

router.get("/:id", getUserById);

// ***********for only understanding the routes how it works we are creating some routes here from here we will create routes in separate file and import here and from line no. 15 to 31 ***********

// router.get('/post', (req, res) => {         // /users/post
//     res.json({
//         success:true,
//         message:"we are in post routes",

//     })

// })

// router.get('/about', (req, res) => {         // /users/about
//     res.json({
//         success:true,
//         message:"we are in about routes",

//     })

// })

export default router;
