import { Prisma, PrismaClient, Role, Status } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../err/errorHandler";
import "express-async-errors";
import { parsePaginationParams } from "../utils/pagination";

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
  const newUser = req.body;

  if (!Object.values(Role).includes(newUser.role)) {
    throw new AppError("Invalid role provided", 400);
  }
  if (!Object.values(Status).includes(newUser.status)) {
    throw new AppError("Invalid status provided", 400);
  }

  newUser.role = Role[newUser.role as keyof typeof Role];
  newUser.status = Status[newUser.status as keyof typeof Status];

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
  const updateData = req.body;

  if (updateData.role && !Object.values(Role).includes(updateData.role)) {
    throw new AppError("Invalid role provided", 400);
  }
  if (updateData.status && !Object.values(Status).includes(updateData.status)) {
    throw new AppError("Invalid status provided", 400);
  }

  if (updateData.role) {
    updateData.role = Role[updateData.role as keyof typeof Role];
  }
  if (updateData.status) {
    updateData.status = Status[updateData.status as keyof typeof Status];
  }

  if (!id) {
    throw new AppError("User ID is required for update", 400);
  }

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError("User not found", 404);
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

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await prisma.user.delete({ where: { id } });

  res.status(204).send();
};
