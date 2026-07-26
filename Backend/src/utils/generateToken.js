import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "./.env" });

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
