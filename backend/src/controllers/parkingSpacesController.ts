import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../err/errorHandler";
import "express-async-errors";
import { parkingSpaceSchema } from "../utils/validation";
import { QueryParams } from "../utils/params";
import { parsePaginationParams } from "../utils/pagination";

const prisma = new PrismaClient();

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
  const parkingSpace = await prisma.parkingSpace.create({
    data: newParkingSpace,
  });
  res.status(200).json({
    message: "Parking space created successfully",
  });
};
export const getParkingSpaces = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { offset, limit } = req.query as QueryParams;
  const { skipValue, takeValue } = parsePaginationParams(offset, limit);

  const parkingSpaces = await prisma.parkingSpace.findMany({
    skip: skipValue,
    take: takeValue,
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

  res.status(200).json({ parkingSpaces });
};

export const getParkingSpaceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { spaceId } = req.params;

  if (!spaceId) {
    throw new AppError("Parking space id is required", 400);
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

  if (!parkingSpace) {
    throw new AppError("Parking space not found", 404);
  }

  res.status(200).json({ parkingSpace });
};

export const staffGetParkingSpaces = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { offset, limit } = req.query as QueryParams;
  const { skipValue, takeValue } = parsePaginationParams(offset, limit);

  const parkingSpaces = await prisma.parkingSpace.findMany({
    skip: skipValue,
    take: takeValue,
    select: {
      spaceId: true,
      state: true,
      status: true,
      floor: true,
      lot: true,
    },
  });

  res.status(200).json({ parkingSpaces });
};

export const staffGetParkingSpaceByUid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    throw new AppError("UserId is required", 400);
  }
  //Maybe we need to use findMany to handle the mutiple cars per user
  const parkingSpace = await prisma.record.findMany({
    where: { exitTime: null, userId: userId },
    select: {
      id: true,
      spaceId: true,
      userId: true,
      enterTime: true,
    },
  });

  if (!parkingSpace) {
    throw new AppError("Parking space not found", 404);
  }

  res.status(200).json({ parkingSpace });
};
