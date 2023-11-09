import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../err/errorHandler";
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new AppError("JWT_SECRET_KEY must be defined", 500);
}

const verifyToken = (req: Request) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AppError("No token provided", 401);
  }
  return jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = verifyToken(req);
    if (decoded.role !== "admin") {
      throw new AppError("Access denied. Only admins are allowed", 403);
    }
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(`JWT error: ${error.message}`, 401));
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(
        error instanceof AppError
          ? error
          : new AppError(
              "An unexpected error occurred while verifying the token",
              500
            )
      );
    }
  }
};

export const verifyAdminAndGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = verifyToken(req);
    if (!["admin", "guard"].includes(decoded.role)) {
      throw new AppError("Access denied", 403);
    }
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(`JWT error: ${error.message}`, 401));
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(
        error instanceof AppError
          ? error
          : new AppError(
              "An unexpected error occurred while verifying the token",
              500
            )
      );
    }
  }
};
