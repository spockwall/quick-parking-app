import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../err/errorHandler";
import "express-async-errors";
import { userSchema } from "../utils/validation";
import { encryptPswd, comparePswd } from "../utils/encrypt";
import jwt from "jsonwebtoken";
import { LoginParams } from "../utils/params";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { error, value: updatedUser } = userSchema.validate(req.body);

  if (error) {
    throw new AppError("UserSchema Validation error", 400);
  }

  const { userId } = req.body;

  if (updatedUser.password) {
    updatedUser.password = await encryptPswd(updatedUser.password);
  }
  const user = await prisma.user.update({
    where: { userId },
    data: updatedUser,
  });

  const { password, ...userWithoutPassword } = user;
  res
    .status(201)
    .json({ message: "User created successfully", user: userWithoutPassword });
};

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
    id: user.userId,
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
