import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (!(err instanceof AppError)) {
    err = new AppError("An unexpected error occurred", 500);
  }

  const appError = err as AppError;

  const errorResponse = {
    status: appError.status,
    message: appError.message,
  };

  res.status(appError.statusCode).json(errorResponse);
};
