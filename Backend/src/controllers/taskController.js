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
  const filter = {
    user: req.user._id,
  };

  if (req.query.status) {
    filter.status = {
      $in: req.query.status.split(","),
    };
  }
  if (req.query.priority) {
    filter.priority = {
      $in: req.query.priority.split(","),
    };
  }

  if (req.query.search) {
    filter.title = {
      $regex: req.query.search,
      $options: "i",
    };
  }

  let limit = Number(req.query.limit || 10);
  let page = Number(req.query.page || 1);
  let skip = (page - 1) * limit;

  let sortBy = "-createdAt";
  if (req.query.sort) {
    sortBy = req.query.sort;
  }

  const total = await Task.countDocuments(filter);

  const tasks = await Task.find(filter).skip(skip).limit(limit).sort(sortBy);

  res.status(200).json({
    status: "success",
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
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

  res.status(204).json({
    status: "success",
    data: null,
  });
});
export const getStats = catchAsync(async (req, res, next) => {
  const stats = await Task.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $group: {
        _id: null,
        totalTasks: {
          $sum: 1,
        },
        completedTasks: {
          $sum: {
            $cond: [{ $eq: ["$status", "Done"] }, 1, 0],
          },
        },
        pendingTasks: {
          $sum: {
            $cond: [
              {
                $in: ["$status", ["To Do", "In Progress"]],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalTasks: 1,
        completedTasks: 1,
        pendingTasks: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats: stats[0] || {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
      },
    },
  });
});
