import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import {User} from '../Models/users.js'

export const isAuthenticated = async (req, res, next) => {
  const {token} = req.cookies

  console.log(token);

  if(!token) return res.status(401).json({
      success: false,
      message: "Please login first...!",
  })

  const decode = jwt.verify(token, 'process.env.JWT_SECRET')
  // console.log("decode data:", decode);

  req.user = await User.findById(decode._id)

//   console.log("my profile:", req.user);

  // res.json({
  //   success: true,
  //   message:"Hello..!",
  //   user: req.user
  // })
  next();

}                    