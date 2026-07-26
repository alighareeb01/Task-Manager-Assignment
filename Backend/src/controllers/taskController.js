import Task from "../models/taskModel.js";
import { appError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createTask = catchAsync(async (req, res, next) => {
  const taskObj = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
  };
  const task = await Task.create({
    ...taskObj,
    user: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: {
      task,
    },
  });
});
export const getTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
});
export const getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!task) {
    return next(new appError("Task not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

export const updateTask = catchAsync(async (req, res, next) => {
  const taskObj = {};

  if (req.body.title !== undefined) taskObj.title = req.body.title;

  if (req.body.description !== undefined)
    taskObj.description = req.body.description;

  if (req.body.status !== undefined) taskObj.status = req.body.status;

  if (req.body.priority !== undefined) taskObj.priority = req.body.priority;

  if (req.body.dueDate !== undefined) taskObj.dueDate = req.body.dueDate;

  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    taskObj,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updated) {
    return next(new appError("Task not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      task: updated,
    },
  });
});

export const deleteTask = catchAsync(async (req, res, next) => {
  const deleted = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deleted) {
    return next(new appError("Task not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Task deleted successfully",
  });
});
