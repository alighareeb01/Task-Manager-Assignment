import express from "express";
import {
  createTask,
  getTasks,
  updateTaske,
  deleteTask,
  getTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getTasks).post(createTask);
router.route("/:id").patch(updateTaske).delete(deleteTask).get(getTask);

export default router;
