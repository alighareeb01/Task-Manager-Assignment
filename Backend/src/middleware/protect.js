import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { appError } from "../utils/appError.js";

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new appError(
        "you are not logged in ,please login again to get access",
        401,
      ),
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new appError("the user belonging to this token no longer exist", 401),
    );
  }

  req.user = currentUser;
  next();
});
