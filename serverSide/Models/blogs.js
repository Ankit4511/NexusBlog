import mongoose from "mongoose";

// schema
const blogSchema = new mongoose.Schema({ 
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  //schema Name
    required: true,
  },
  views: {
      type: Number,
      default: 0,
    },
    status:{
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  
});



blogSchema.index({
  createdAt: -1,
});

blogSchema.index({
  views: -1,
});
export const Blog = mongoose.model("Blog", blogSchema);