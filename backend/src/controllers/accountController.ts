import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../err/errorHandler";
import "express-async-errors";
import { comparePswd } from "../utils/encrypt";
import jwt from "jsonwebtoken";
import { LoginParams } from "../utils/params";

const prisma = new PrismaClient();

// use jwt to create a token and send it back to the client
export const login = async (req: Request, res: Response): Promise<void> => {
  const { userId, password } = req.body as LoginParams;
  if (!userId || !password) {
    throw new AppError("ID and password are required", 400);
  }

  const user = await prisma.user.findFirst({ where: { userId } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!(await comparePswd(password, user.password))) {
    throw new AppError("Invalid password", 401);
  }
  // create a token and return
  const tokenParams = {
    userId: user.userId,
    name: user.name,
    role: user.role,
  };
  const token = jwt.sign(tokenParams, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, { httpOnly: true });
  res.json({ message: "Login successful", token });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  req.cookies.token = "";
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
