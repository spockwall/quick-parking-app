import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../err/errorHandler";
import { handleAuthError } from "../err/authErr";
require("dotenv").config();

enum Role {
  Staff = "staff",
  Admin = "admin",
  Guard = "guard",
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new AppError("JWT_SECRET_KEY must be defined", 500);
}

const verifyToken = (req: Request) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AppError("No token provided", 401);
  }
  try {
    return jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;
  } catch (error) {
    const jwtError = error as Error;
    throw new AppError(`Token verification error: ${jwtError.message}`, 401);
  }
};

const verifyRole = (req: Request, roles: Role[]) => {
  const decoded = verifyToken(req);
  if (!roles.includes(decoded.role as Role)) {
    throw new AppError("Access denied", 403);
  }
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    verifyRole(req, [Role.Admin]);
    next();
  } catch (error) {
    handleAuthError(error, next);
  }
};

export const verifyAdminAndGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    verifyRole(req, [Role.Admin, Role.Guard]);
    next();
  } catch (error) {
    handleAuthError(error, next);
  }
};
