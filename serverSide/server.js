import dotenv from "dotenv";
dotenv.config(); // 👈 sabse upar
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.js'
import blogRouter from './routes/blog.js'
import { config } from "dotenv";
import cors from 'cors'


const app = express();


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

config({    
  path:'./data/config.env'
})


// DB connect
mongoose.connect(process.env.MONGO_URL, {
    dbName: "mernproject",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err)
);

//user router
app.use('/api/users', userRouter)

//blog router
app.use('/api/blogs', blogRouter)

// server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
 