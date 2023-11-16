// guardController.ts
import { PrismaClient, State, Status } from "@prisma/client";
import { Request, Response } from "express";
import { QueryParams } from "../utils/params";
import { parsePaginationParams } from "../utils/pagination";
import { processQueryParams } from "../utils/queryUtils";
import { AppError } from "../err/errorHandler";

const prisma = new PrismaClient();

export const getParkingSpacesDuration = async (
  req: Request,
  res: Response
): Promise<void> => {
  const queryParams = req.query as Partial<QueryParams>;
  const whereCondition = processQueryParams(queryParams);

  const { skipValue, takeValue } = parsePaginationParams(
    queryParams.offset,
    queryParams.limit
  );

  const parkingSpaces = await prisma.parkingSpace.findMany({
    skip: skipValue,
    take: takeValue,
    where: whereCondition,
    select: {
      spaceId: true,
      state: true,
      status: true,
      startTime: true,
    },
  });

  const currentTime = Math.floor(Date.now() / 1000);
  const parkingSpacesWithDuration = parkingSpaces.map((ps) => {
    const duration = ps.startTime ? currentTime - ps.startTime : null;
    return {
      parkingSpaceId: ps.spaceId,
      state: ps.state,
      status: ps.status,
      startTime: ps.startTime,
      duration: duration,
    };
  });

  res.json({
    parkingSpaces: parkingSpacesWithDuration,
  });
};

export const getParkingSpaceUserInfo = async (
  req: Request<{ parkingSpaceId: string }>,
  res: Response
): Promise<void> => {
  const { parkingSpaceId } = req.params;

  const parkingSpace = await prisma.parkingSpace.findUnique({
    where: { spaceId: parkingSpaceId },
    include: {
      user: true,
    },
  });

  if (!parkingSpace) {
    throw new AppError("Parking space not found", 404);
  }

  const userInfo = parkingSpace.user
    ? {
        username: parkingSpace.user.name,
        phone: parkingSpace.user.phone,
        email: parkingSpace.user.email,
        licensePlateNumber: parkingSpace.licensePlateNumber,
      }
    : {};
  res.status(200).json({
    userInfo,
  });
};
