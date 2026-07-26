import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "./config.env" });

console.log("token", process.env.JWT_SECRET);
console.log("token", process.env.JWT_EXPIRES_IN);

export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
