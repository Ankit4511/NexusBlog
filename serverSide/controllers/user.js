import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../Models/users.js";
import { Follow } from "../Models/Follow.js";
import { Blog } from "../Models/blogs.js";
import { generateCookie } from "../utils/feature.js";
import { sendEmail } from "../utils/sendEmail.js";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({ success: false, message: "user already exist.." });
  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashPassword });
  generateCookie(user, res, 201, "user registered successfull !");
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, message: "user not exist" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ success: false, message: "invalid credentials" });
  generateCookie(user, res, 201, `WELCOME ${user.name} `);
};

export const userLogout = (req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    })
    .json({ success: true, message: "Logged out Successfully!" });
};

export const getMyProfile = (req, res) => {
  res.set("Cache-Control", "no-store");
  res.status(200).json({ success: true, user: req.user });
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found !" });

    const [followersCount, followingCount, blogsCount] = await Promise.all([
      Follow.countDocuments({ following: id }),
      Follow.countDocuments({ follower: id }),
      Blog.countDocuments({ user: id }),
    ]);

    res.status(200).json({
      success: true,
      message: "User found !",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        location: user.location,
        github: user.github,
        linkedin: user.linkedin,
        portfolio: user.portfolio,
        createdAt: user.createdAt,
        followersCount,
        followingCount,
        blogsCount,
      },
    });
  } catch (error) {
    console.error("GET USER BY ID ERROR", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const genericMessage =
      "If an account with that email exists, a reset link has been sent.";

    if (!user) {
      return res.status(200).json({ success: true, message: genericMessage });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Reset your NexusBlog password",
        text: `You requested a password reset. Click this link to reset your password (valid for 15 minutes): ${resetUrl}\n\nIf you did not request this, please ignore this email.`,
      });
    } catch (emailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      console.error("SEND EMAIL ERROR", emailError);
      return res.status(500).json({ success: false, message: "Email could not be sent. Please try again later." });
    }

    res.status(200).json({ success: true, message: genericMessage });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Reset link is invalid or has expired." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. Please login with your new password.",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR", error);
    res.status(500).json({ success: false, message: error.message });
  }
};