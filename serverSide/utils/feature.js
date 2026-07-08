import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";

export const generateCookie = (
  user,
  res,
  statusCode = 200,
  message
) => {
  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET
  );

  console.log("Generated Token:", token);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,

      // Cross-site cookies (Vercel <-> Render) REQUIRE secure + none.
      // Localhost dev (same-site, diff port) uses lax + insecure.
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    })
    .json({
      success: true,
      message,
    });
};