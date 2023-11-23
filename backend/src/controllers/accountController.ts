import { Request, Response } from "express";
import { AppError } from "../err/errorHandler";
import { authenticateUser } from "../auth/authService";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    throw new AppError("Both ID and password are required.", 400);
  }

  const token = await authenticateUser(userId, password);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ message: "Login successful", token });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("jwt");
  res.json({ message: "Logout successful" });
};
