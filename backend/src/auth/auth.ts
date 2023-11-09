import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../err/errorHandler";
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// JWT verification middleware
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("No token provided.", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    }) as jwt.JwtPayload;
    if (decoded.role !== "admin") {
      throw new AppError("Access denied. Only admins are allowed.", 403);
    }
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(`JWT error: ${error.message}`, 401));
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError("An error occurred while verifying the token.", 500));
    }
  }
};

export const verifyAdminAndGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("No token provided.", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    }) as jwt.JwtPayload;
    if (decoded.role !== "admin" && decoded.role !== "guard") {
      throw new AppError("Access denied.", 403);
    }
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(`JWT error: ${error.message}`, 401));
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError("An error occurred while verifying the token.", 500));
    }
  }
};
