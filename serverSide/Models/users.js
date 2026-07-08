import mongoose from "mongoose";

// schema
const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },
  linkedin: {
    type: String,
    default: "",
  },
  portfolio: {
    type: String,
    default: "",
  },
  resetPasswordToken:{
    type: String,
    default: undefined,
  },
  resetPasswordExpire:{
    type: Date,
    default: undefined,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const User = mongoose.model("User", userSchema);