import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { appError } from "../utils/appError.js";
import { generateToken } from "../utils/generateToken.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { promisify } from "util";

export const register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = generateToken(newUser._id);

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new appError("please enter email or password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new appError("Incorrect email or password", 401));
  }

  const token = generateToken(user._id);

  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

export const getMe = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

dotenv.config({ path: "./config.env" });

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
