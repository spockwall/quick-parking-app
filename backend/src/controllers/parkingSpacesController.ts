import { PrismaClient, State, Status } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../err/errorHandler";
import "express-async-errors";
import { parkingSpaceSchema } from "../utils/validation";
import { QueryParams } from "../utils/params";
import { parsePaginationParams } from "../utils/pagination";
import redis from "../config/redisconfig";

const prisma = new PrismaClient();

type WhereClause = {
  status?: Status;
  floor?: number;
  lot?: number;
  state?: State;
};

export const createParkingSpace = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error, value: newParkingSpace } = parkingSpaceSchema.validate(
    req.body
  );
  if (error) {
    throw new AppError("ParkingSpaceSchema Validation error", 400);
  }

  const modifiedParkingSpace = { ...newParkingSpace, state: State.available };
  const parkingSpace = await prisma.parkingSpace.create({
    data: modifiedParkingSpace,
  });

  await clearParkingSpacesCache();

  res.status(200).json({
    message: "Parking space created successfully",
  });
};

export const getParkingSpaces = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { offset, limit, floor, lot, state, status } = req.query as QueryParams;
  const { skipValue, takeValue } = parsePaginationParams(
    offset ?? "0",
    limit ?? "10"
  );

  const cacheKey = `publicParkingSpaces:offset:${offset}:limit:${limit}:floor:${floor}:lot:${lot}:state:${state}status:${status}`;
  // console.log(cacheKey);

  const cachedParkingSpaces = await redis.get(cacheKey);
  if (cachedParkingSpaces) {
    res.status(200).json(JSON.parse(cachedParkingSpaces));
    return;
  }

  const whereClause: WhereClause = {};
  if (floor !== undefined) whereClause.floor = Number(floor);
  if (lot !== undefined) whereClause.lot = Number(lot);
  if (state !== undefined) whereClause.state = state as State;
  if (status !== undefined) whereClause.status = status as Status;

  const parkingSpaces = await prisma.parkingSpace.findMany({
    skip: skipValue,
    take: takeValue,
    where: whereClause,
    select: {
      spaceId: true,
      state: true,
      status: true,
      floor: true,
      lot: true,
      records: {
        where: { exitTime: null }, // only get records where exitTime is null
        select: {
          id: true,
          spaceId: true,
          userId: true,
          licensePlateNumber: true,
          enterTime: true,
          exitTime: true,
        },
      },
    },
  });

  await redis.set(cacheKey, JSON.stringify(parkingSpaces), "EX", 3600);

  res.status(200).json(parkingSpaces);
};

export const getParkingSpaceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { spaceId } = req.params;

  if (!spaceId) {
    throw new AppError("Parking space id is required", 400);
  }

  const cacheKey = `parkingSpace:${spaceId}`;

  let cachedParkingSpace = await redis.get(cacheKey);
  if (cachedParkingSpace) {
    res.status(200).json(JSON.parse(cachedParkingSpace));
    return;
  }

  const parkingSpace = await prisma.parkingSpace.findUnique({
    where: { spaceId },
    select: {
      spaceId: true,
      state: true,
      status: true,
      floor: true,
      lot: true,
      records: {
        where: { exitTime: null },
        select: {
          id: true,
          spaceId: true,
          userId: true,
          licensePlateNumber: true,
          enterTime: true,
          exitTime: true,
        },
      },
    },
  });

  if (!parkingSpace) {
    throw new AppError("Parking space not found", 404);
  }
  await redis.set(cacheKey, JSON.stringify(parkingSpace), "EX", 3600);

  res.status(200).json(parkingSpace);
};

export const staffGetParkingSpaces = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { offset, limit, floor, lot, state, status } = req.query as QueryParams;
  const { skipValue, takeValue } = parsePaginationParams(
    offset ?? "0",
    limit ?? "10"
  );

  const cacheKey = `publicParkingSpaces:offset:${offset}:limit:${limit}:floor:${floor}:lot:${lot}:state:${state}status:${status}`;

  const cachedParkingSpaces = await redis.get(cacheKey);
  if (cachedParkingSpaces) {
    res.status(200).json(JSON.parse(cachedParkingSpaces));
    return;
  }

  const whereClause: WhereClause = {};
  if (floor !== undefined) whereClause.floor = Number(floor);
  if (lot !== undefined) whereClause.lot = Number(lot);
  if (state !== undefined) whereClause.state = state as State;
  if (status !== undefined) whereClause.status = status as Status;

  const parkingSpaces = await prisma.parkingSpace.findMany({
    skip: skipValue,
    take: takeValue,
    where: whereClause,
    select: {
      spaceId: true,
      state: true,
      status: true,
      floor: true,
      lot: true,
    },
  });

  await redis.set(cacheKey, JSON.stringify(parkingSpaces), "EX", 3600);

  res.status(200).json(parkingSpaces);
};

export const staffGetParkingSpaceByUid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    throw new AppError("UserId is required", 400);
  }

  const cacheKey = `staffParkingSpaceByUserId:${userId}`;

  let cachedParkingSpace = await redis.get(cacheKey);
  if (cachedParkingSpace) {
    res.status(200).json(JSON.parse(cachedParkingSpace));
    return;
  }

  const parkingSpace = await prisma.record.findMany({
    where: { exitTime: null, userId: userId },
    select: {
      id: true,
      spaceId: true,
      userId: true,
      enterTime: true,
      licensePlateNumber: true,
    },
  });

  if (!parkingSpace) {
    throw new AppError("Parking space not found", 404);
  }

  await redis.set(cacheKey, JSON.stringify(parkingSpace), "EX", 3600);

  res.status(200).json(parkingSpace);
};

async function clearParkingSpacesCache() {
  const scanAndDelete = async (pattern: string) => {
    let cursor = "0";
    do {
      const reply = await redis.scan(cursor, "MATCH", pattern, "COUNT", 50);
      cursor = reply[0];
      const keys = reply[1];
      if (keys.length) {
        await Promise.all(keys.map((key) => redis.del(key)));
      }
    } while (cursor !== "0");
  };

  await Promise.all([
    scanAndDelete("publicParkingSpaces:*"),
    scanAndDelete("staffParkingSpaces:*"),
  ]);
}
