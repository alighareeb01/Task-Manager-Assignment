import express from "express";
import userRouter from "./routes/authRoute.js";
import taskRouter from "./routes/taskRoute.js";
import { appError } from "./utils/appError.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to our site",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

app.all("/*splat", (req, res, next) => {
  next(
    new appError(
      `can not find this url : ${req.originalUrl} on this server`,
      404,
    ),
  );
});

app.use(globalErrorHandler);

export default app;
