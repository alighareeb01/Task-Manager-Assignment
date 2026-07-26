import User from "../Models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";

import { generateToken } from "../utils/generateToken.js";

export const register = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = generateToken(newUser);

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});
export const login = async (req, res) => {};
