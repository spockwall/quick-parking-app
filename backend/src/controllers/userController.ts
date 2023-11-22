import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { AppError } from "../err/errorHandler";
import "express-async-errors";
import { parsePaginationParams } from "../utils/pagination";
import { createUserSchema, userSchema } from "../utils/validation";
import { QueryParams } from "../utils/params";
import { encryptPswd } from "../utils/encrypt";
import jwt from "jsonwebtoken";

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

  if (!userId) {
    throw new AppError("User ID is required for update", 400);
  }

  const { error, value: updatedUser } = userSchema.validate(req.body);
  // check jwt token if the role is admin
  const token = req.cookies.jwt;
  const decodedToken = jwt.decode(token!) as jwt.JwtPayload;

  const originalData = await prisma.user.findUnique({
    where: { userId: updatedUser.userId },
    select: {
      role: true,
      licensePlates: { select: { licensePlateNumber: true } },
    },
  });
  if (!originalData) {
    throw new AppError("User not found", 404);
  }
  if (decodedToken!.role === "admin" && decodedToken!.userId !== userId) {
    const newRole = updatedUser.role;
    if (originalData!.role === "admin" && newRole !== "admin") {
      throw new AppError("Can't edit other admins' role", 401);
    }
    const user = await prisma.user.update({
      where: { userId },
      data: {
        role: newRole,
      },
    });
    const { password, ...userWithoutPassword } = user;
    res.status(201).json({
      message: "User changes role successfully",
      user: userWithoutPassword,
    });
  } else if (decodedToken!.userId !== userId) {
    throw new AppError("Can't edit others' data", 401);
  }

  if (error) {
    throw new AppError("Validation error: " + error.details[0].message, 400);
  }

  // check if the license plate registered by others
  const licensePlates = await prisma.licensePlate.findMany({
    where: {
      licensePlateNumber: { in: updatedUser.licensePlates },
      userId: { not: updatedUser.userId },
    },
  });
  if (licensePlates.length > 0) {
    throw new AppError(
      `License plate ${licensePlates.map(
        (p) => p.licensePlateNumber
      )} already registered`,
      400
    );
  }
  // delete license plates not in the updatedUser
  const licensePlatesToDelete = originalData.licensePlates
    .map((lp) => lp.licensePlateNumber)
    .filter((lp) => !updatedUser.licensePlates.includes(lp));
  await prisma.licensePlate.deleteMany({
    where: { licensePlateNumber: { in: licensePlatesToDelete } },
  });
  await prisma.licensePlate.createMany({
    data: updatedUser.licensePlates.map((lp: String) => ({
      licensePlateNumber: lp,
      userId: updatedUser.userId,
    })),
    skipDuplicates: true,
  });

  delete updatedUser.licensePlates;

  if (updatedUser.password) {
    updatedUser.password = await encryptPswd(updatedUser.password);
  }

  const user = await prisma.user.update({
    where: { userId: updatedUser.userId },
    data: {
      ...updatedUser,
    },
  });

  const { password, ...userWithoutPassword } = user;
  res
    .status(201)
    .json({ message: "User updated successfully", user: userWithoutPassword });
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
