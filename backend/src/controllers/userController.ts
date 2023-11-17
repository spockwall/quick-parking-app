import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { AppError } from "../err/errorHandler";
import "express-async-errors";
import { parsePaginationParams } from "../utils/pagination";
import { createUserSchema, userSchema } from "../utils/validation";
import { QueryParams } from "../utils/params";
import { encryptPswd } from "../utils/encrypt";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { offset, limit } = req.query as QueryParams;
  const { skipValue, takeValue } = parsePaginationParams(offset, limit);

  const users = await prisma.user.findMany({
    skip: skipValue,
    take: takeValue,
    include: {
      licensePlates: true,
    },
  });

  const usersWithoutSensitiveInfo = users.map((user) => {
    const licensePlateNumbers = user.licensePlates.map(
      (lp) => lp.licensePlateNumber
    );
    const { password, licensePlates, ...userWithoutSensitiveInfo } = user;
    return {
      ...userWithoutSensitiveInfo,
      licensePlateNumbers,
    };
  });

  res.json({ users: usersWithoutSensitiveInfo });
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error, value: newUser } = createUserSchema.validate(req.body);
  if (error) {
    throw new AppError("Validation error: " + error.details[0].message, 400);
  }
  newUser.password = await encryptPswd(newUser.password);
  const userData = {
    userId: newUser.userId,
    password: newUser.password,
    role: newUser.role,
  };

  const user = await prisma.user.create({ data: userData });
  const { password, ...userWithoutPassword } = user;
  res.status(201).json({
    message: "User created successfully",
    user: userWithoutPassword,
  });
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  const user = await prisma.user.findUnique({
    where: { userId },
    include: {
      licensePlates: {
        select: {
          licensePlateNumber: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.json(user);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const { error, value: updateData } = userSchema.validate(req.body);
  if (error) {
    throw new AppError("Validation error: " + error.details[0].message, 400);
  }
  if (!userId) {
    throw new AppError("User ID is required for update", 400);
  }

  const { licensePlates, ...userData } = updateData;
  await prisma.user.update({ where: { userId }, data: userData });

  if (licensePlates && Array.isArray(licensePlates)) {
    await prisma.licensePlate.deleteMany({ where: { userId } });

    for (const plate of licensePlates) {
      await prisma.licensePlate.create({
        data: { licensePlateNumber: plate, userId },
      });
    }
  }

  const userWithPlates = await prisma.user.findUnique({
    where: { userId },
    include: {
      licensePlates: true,
    },
  });

  if (!userWithPlates) {
    throw new AppError("User not found after update", 404);
  }

  const licensePlateNumbers = userWithPlates.licensePlates.map(
    (lp) => lp.licensePlateNumber
  );

  const {
    password,
    licensePlates: _,
    ...userWithoutSensitiveInfo
  } = userWithPlates;

  res.status(200).json({
    ...userWithoutSensitiveInfo,
    licensePlateNumber: licensePlateNumbers,
  });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    throw new AppError("User ID is required for deletion", 400);
  }

  await prisma.user.delete({ where: { userId } });
  res.status(204).send();
};
