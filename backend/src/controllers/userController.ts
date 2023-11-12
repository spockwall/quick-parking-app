import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../err/errorHandler";
import "express-async-errors";
import { parsePaginationParams } from "../utils/pagination";
import { userSchema } from "../utils/validation";

const prisma = new PrismaClient();

interface QueryParams {
  offset?: string;
  limit?: string;
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { offset, limit } = req.query as QueryParams;
  const { skipValue, takeValue } = parsePaginationParams(offset, limit);

  const users = await prisma.user.findMany({
    skip: skipValue,
    take: takeValue,
  });

  res.json({ users });
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error, value: newUser } = userSchema.validate(req.body);
  if (error) {
    throw new AppError("Validation error: " + error.details[0].message, 400);
  }

  const user = await prisma.user.create({ data: newUser });
  res.status(201).json({ message: "User created successfully", user });
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    throw new AppError("User ID is required", 400);
  }

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.json(user);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { error, value: updateData } = userSchema.validate(req.body);
  if (error) {
    throw new AppError("Validation error: " + error.details[0].message, 400);
  }

  if (!id) {
    throw new AppError("User ID is required for update", 400);
  }

  await prisma.user.update({ where: { id }, data: updateData });
  res.status(200).json({ message: "User updated successfully" });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    throw new AppError("User ID is required for deletion", 400);
  }

  await prisma.user.delete({ where: { id } });
  res.status(204).send();
};
