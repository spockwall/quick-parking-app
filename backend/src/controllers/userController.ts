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
    queryParams.offset ?? "0",
    queryParams.limit ?? "10"
  );

  const cacheKey = `users:offset:${queryParams.offset}:limit:${queryParams.limit}`;

  const cachedUsers = await redis.get(cacheKey);
  if (cachedUsers) {
    res.json(JSON.parse(cachedUsers));
    return;
  }

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

  await redis.set(
    cacheKey,
    JSON.stringify(usersWithoutSensitiveInfo),
    "EX",
    3600
  );

  res.json(usersWithoutSensitiveInfo);
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
    status: Status.common,
  };

  const user = await prisma.user.create({ data: userData });

  await deleteAllUserListCaches();

  const { password, ...userWithoutPassword } = user;
  res.status(201).json({
    userWithoutPassword,
    message: "User created successfully",
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

  const { password, licensePlates, ...userWithoutSensitiveInfo } = user;
  const userWithoutSensitiveInfoForCache = {
    ...userWithoutSensitiveInfo,
    licensePlateNumbers: licensePlates.map((lp) => lp.licensePlateNumber),
  };

  await redis.set(
    cacheKey,
    JSON.stringify(userWithoutSensitiveInfoForCache),
    "EX",
    3600
  );

  res.json(userWithoutSensitiveInfoForCache);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  // console.log(userId);

  if (!userId) {
    throw new AppError("User ID is required for update", 400);
  }

  const { error, value: updatedUser } = userSchema.validate(req.body);
  const token = req.cookies.jwt;
  const decodedToken = jwt.decode(token!) as jwt.JwtPayload;
  if (!decodedToken) {
    throw new AppError("Unauthorized", 401);
  }
  const originalData = await prisma.user.findUnique({
    where: { userId: updatedUser.userId },
    select: {
      role: true,
      // status: true,
      licensePlates: { select: { licensePlateNumber: true } },
    },
  });
  if (!originalData) {
    throw new AppError("User not found", 404);
  }

  if (decodedToken!.role === "admin" && decodedToken!.userId !== userId) {
    const newRole = updatedUser.role;
    // if (originalData!.role === "admin" && newRole !== "admin") {
    //   throw new AppError("Can't edit other admins' role", 401);
    // }
    // console.log(originalData.status);
    const user = await prisma.user.update({
      where: { userId },
      data: {
        role: newRole,
      },
    });
    const { password, ...userWithoutPassword } = user;
  } else if (decodedToken!.userId !== userId) {
    throw new AppError("Can't edit others' data", 401);
  }

  if (error) {
    throw new AppError("Validation error: " + error.details[0].message, 400);
  }

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
  const licensePlatesToDelete = originalData.licensePlates
    .map((lp) => lp.licensePlateNumber)
    .filter((lp) => !updatedUser.licensePlates.includes(lp));
  await prisma.licensePlate.deleteMany({
    where: { licensePlateNumber: { in: licensePlatesToDelete } },
  });

  await deleteUserCache(userId);
  await deleteAllUserListCaches();
  await clearParkingSpaceUserInfoCache(userId);

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

  // const { status, ...updateUser } = updatedUser;
  const user = await prisma.user.update({
    where: { userId: updatedUser.userId },
    data: {
      ...updatedUser,
      // status: originalData.status || ("common" as Status),
    },
  });

  const { password, ...userWithoutPassword } = user;

  res
    .status(201)
    .json({ ...userWithoutPassword, message: "User updated successfully" });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    throw new AppError("User ID is required for deletion", 400);
  }

  await deleteUserCache(userId);
  await deleteAllUserListCaches();
  await clearParkingSpaceUserInfoCache(userId);

  await prisma.user.delete({ where: { userId } });

  res.status(204).send();
};

async function deleteAllUserListCaches() {
  const scanAndDelete = async (pattern: string) => {
    let cursor = "0";
    do {
      const reply = await redis.scan(cursor, "MATCH", pattern, "COUNT", 100);
      cursor = reply[0];
      const keys = reply[1];
      if (keys.length) {
        await Promise.all(keys.map((key) => redis.del(key)));
      }
    } while (cursor !== "0");
  };

  await scanAndDelete("users:offset:*");
}

async function deleteUserCache(userId: string) {
  try {
    console.log(`Deleting cache for user ID: ${userId}`);
    const userCacheKey = `user:${userId}`;
    await redis.del(userCacheKey);
  } catch (error) {
    console.error(`Error deleting user cache for ID ${userId}:`, error);
  }
}

async function clearParkingSpaceUserInfoCache(userId: string) {
  const relatedParkingSpaces = await prisma.record.findMany({
    where: { userId, exitTime: null },
    select: { spaceId: true },
  });

  const keysToDelete = relatedParkingSpaces.map(
    (space) => `parkingSpaceUserInfo:${space.spaceId}`
  );
  if (keysToDelete.length) {
    await redis.del(keysToDelete);
  }
}
