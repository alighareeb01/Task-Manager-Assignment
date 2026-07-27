import dotenv from "dotenv";
import { appError } from "./appError.js";
dotenv.config({ path: "./.env" });

function sendErrDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went wrong!",
    });
  }
}

function hndleDuplicateFields(err) {
  const keyValue = err.keyValue || {};
  const field = Object.keys(err.keyValue)[0];
  const value = Object.values(err.keyValue)[0];

  return new appError(
    `Duplicate Data ---> ${value} this ${field} already exists, please user another values. `,
    400,
  );
}

function handleValidationError(err) {
  const errors = Object.values(err.errors).map((el) => el.message);

  const msg = `Invalid input fields :${errors.join(", ")}`;
  return new appError(msg, 400);
}

function handleCastErrorDB(err) {
  return new appError(`Invalid ${err.path} params: ${err.value}`, 400);
}

function handleExpiredToken() {
  return new appError(`your token has expired, please login again`, 400);
}

function handleJWTError() {
  return new appError("Invalid token , please login again", 401);
}

function handleZodError(err) {
  const errors = err.issues.map((issue) => issue.message);

  return new appError(`Validation failed: ${errors.join(", ")}`, 400);
}

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "ZodError") err = handleZodError(err);

  if (
    process.env.NODE_ENV.trim() === "development" ||
    process.env.NODE_ENV.trim() === "test"
  ) {
    sendErrDev(err, res);
  } else if (process.env.NODE_ENV.trim() === "production") {
    let error = err;

    if (error.code === 11000) error = hndleDuplicateFields(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "TokenExpiredError") error = handleExpiredToken();
    if (error.name === "JsonWebTokenError") error = handleJWTError();

    sendErrorProd(error, res);
  }
};
