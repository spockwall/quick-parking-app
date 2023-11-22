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

const verifyToken = (req: Request, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AppError("No token provided", 401));
  }
  try {
    return jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;
  } catch (error) {
    handleAuthError(error, next);
  }
};

const hasRequiredRole = (decoded: jwt.JwtPayload, roles: Role[]): boolean => {
  return roles.includes(decoded.role as Role);
};

const verifyRolesMiddleware = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const decoded = verifyToken(req, next);
    if (decoded && hasRequiredRole(decoded, roles)) {
      next();
    } else {
      next(new AppError("Access denied", 403));
    }
  };
};

const isTheSameUser = (decoded: jwt.JwtPayload, req: Request): boolean => {
  return (
    decoded.userId === req.params.userId ||
    decoded.userId === req.body.userId ||
    decoded.userId === req.query.userId
  );
};

export const verifyUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decoded = verifyToken(req, next);
  if (decoded && isTheSameUser(decoded, req)) {
    next();
  } else {
    next(new AppError("Access denied", 403));
  }
};

export const verifyAdmin = verifyRolesMiddleware([Role.Admin]);
export const verifyAdminAndGuard = verifyRolesMiddleware([
  Role.Admin,
  Role.Guard,
]);
export const verifyAdminAndGuardAndStaff = verifyRolesMiddleware([
  Role.Admin,
  Role.Guard,
  Role.Staff,
]);
