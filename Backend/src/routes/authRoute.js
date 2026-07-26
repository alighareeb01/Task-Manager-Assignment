import express from "express";
import {
  getMe,
  login,
  protect,
  register,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
export default router;
