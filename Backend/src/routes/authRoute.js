import express from "express";
import { getMe, login, register } from "../controllers/authController.js";
import { protect } from "../middleware/protect.js";
import { validate } from "../middleware/validateMw.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";

const router = express.Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/me").get(protect, getMe);
export default router;
