import express from "express";
import {
  registerView,
  getViews,
} from "../controllers/view.controller.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Register View
|--------------------------------------------------------------------------
|
| Logged-in users -> req.user available
| Guests -> request also works
|
*/

router.post(
  "/:blogId",
  (req, res, next) => {
    // Allow guest users
    if (!req.cookies.token) {
      req.user = null;
      return next();
    }

    return isAuthenticated(req, res, next);
  },
  registerView
);

/*
|--------------------------------------------------------------------------
| Get Total Views
|--------------------------------------------------------------------------
*/

router.get("/:blogId", getViews);

export default router;