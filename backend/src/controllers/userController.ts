import { PrismaClient, Role, Status, User } from "@prisma/client";
import { Request, Response, Router } from "express";
import { AppError } from "../err/errorHandler";
import "express-async-errors";
import { parsePaginationParams } from "../utils/pagination";
import { createUserSchema, userSchema } from "../utils/validation";
import { QueryParams } from "../utils/params";
import { encryptPswd } from "../utils/encrypt";
import redis from "../config/redisconfig";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const queryParams = req.query as Partial<QueryParams>;
  const { skipValue, takeValue } = parsePaginationParams(
    queryParams.offset,
    queryParams.limit
  );
  const cacheKey = `users:offset:${queryParams.offset}:limit:${queryParams.limit}`;

  // 尝试从 Redis 获取缓存数据
  const cachedUsers = await redis.get(cacheKey);
  if (cachedUsers) {
    res.json(JSON.parse(cachedUsers));
    return;
  }

  // 缓存中没有数据，执行数据库查询
  const users = await prisma.user.findMany({
    skip: skipValue,
    take: takeValue,
    include: {
      licensePlates: true,
    },
  });

  const usersWithoutSensitiveInfo = users.map((user) => {
    const { password, licensePlates, ...userWithoutSensitiveInfo } = user;
    return {
      ...userWithoutSensitiveInfo,
      licensePlateNumbers: licensePlates.map((lp) => lp.licensePlateNumber),
    };
  });

  // 将查询结果存储在 Redis 缓存中
  await redis.set(
    cacheKey,
    JSON.stringify({ users: usersWithoutSensitiveInfo }),
    "EX",
    3600
  ); // 缓存 1 小时

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

  // 清除用户列表缓存
  const cacheKey = "users:list"; // 假设这是你的用户列表缓存键
  await redis.del(cacheKey);

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

  const cacheKey = `user:${userId}`;

  // 尝试从 Redis 获取缓存数据
  let cachedUser = await redis.get(cacheKey);
  if (cachedUser) {
    res.json(JSON.parse(cachedUser));
    return;
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

  // 存储用户信息到 Redis 缓存
  await redis.set(cacheKey, JSON.stringify(user), "EX", 3600); // 缓存 1 小时

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
  if (!decodedToken) {
    throw new AppError("Unauthorized", 401);
  }
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

  await redis.del(`user:${updatedUser.userId}`);

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

  // Invalidate any cache related to the user before deletion
  const userCacheKey = `user:${userId}`;
  await redis.del(userCacheKey);

  // You might also want to invalidate any lists or collections the user is part of
  const usersListCacheKey = "users:list";
  await redis.del(usersListCacheKey);

  // Delete the user from the database
  await prisma.user.delete({ where: { userId } });

  // No content response since the user has been deleted
  res.status(204).send();
};
