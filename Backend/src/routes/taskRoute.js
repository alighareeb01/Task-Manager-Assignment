import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/protect.js";
import { validate } from "../middleware/validateMw.js";
import { taskSchema } from "../validations/taskValidation.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getTasks).post(validate(taskSchema), createTask);
router.route("/:id").patch(updateTask).delete(deleteTask).get(getTask);

export default router;
