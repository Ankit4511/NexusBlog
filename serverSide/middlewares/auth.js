import jwt from "jsonwebtoken";
import { User } from "../Models/users.js";

export const isAuthenticated = async (req, res, next) => {
  console.log("===== AUTH =====");
  console.log("Cookies:", req.cookies);

  const { token } = req.cookies;

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first...!",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id).select("-password");

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};



