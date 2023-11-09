import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../err/errorHandler";

const prisma = new PrismaClient();

interface QueryParams {
  offset?: string;
  limit?: string;
}

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { offset, limit } = req.query as QueryParams;

    const skipValue = offset ? parseInt(offset, 10) : 0;
    const takeValue = limit ? parseInt(limit, 10) : 10;

    const users = await prisma.user.findMany({
      skip: skipValue,
      take: takeValue,
    });

    res.json({ users });
  } catch (error) {
    next(new AppError("Error retrieving users", 500));
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser = req.body;

    const user = await prisma.user.create({ data: newUser });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        next(new AppError("A user with this ID already exists.", 409));
      } else {
        next(error);
      }
    } else {
      next(new AppError("Error creating user", 500));
    }
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      // Handle the case where the user ID is not provided
      return next(new AppError("User ID is required", 400));
    }
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      // Handle the case where the user does not exist
      return next(new AppError("User not found", 404));
    }

    res.json(user);
  } catch (error) {
    next(new AppError("Error retrieving user by id", 500));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return next(new AppError("User ID is required for update", 400));
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    await prisma.user.update({ where: { id }, data: updateData });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(new AppError("Error updating user", 500));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("User ID is required for deletion", 400));
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      // Handle the case where the user does not exist
      return next(new AppError("User not found", 404));
    }

    await prisma.user.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    next(new AppError("Error deleting user", 500));
  }
};
