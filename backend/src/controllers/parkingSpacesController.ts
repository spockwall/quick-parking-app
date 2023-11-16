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
  try {
    const { error, value: newParkingSpace } = parkingSpaceSchema.validate(
      req.body
    );
    console.log(req.body);
    if (error) {
      throw new AppError("ParkingSpaceSchema Validation error", 400);
    }
    const parkingSpace = await prisma.parkingSpace.create({
      data: newParkingSpace,
    });
    res.status(200).json({
      message: "Parking space created successfully",
    });
  } catch (error) {
    console.error("Error creating parking space:", error);
    res.status(401).json({ message: "Could not create parking space" });
  }
};
export const getParkingSpaces = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { offset, limit } = req.query as QueryParams;
    const { skipValue, takeValue } = parsePaginationParams(offset, limit);

    const parkingSpaces = await prisma.parkingSpace.findMany({
      skip: skipValue,
      take: takeValue,
      select: {
        id: true,
        SpaceId: true,
        state: true,
        type: true,
        startTime: true,
        occupant: true,
        floor: true,
        slot: true,
        licensePlateNumber: true,
      },
    });

    res.status(200).json({ parkingSpaces });
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: "Invalid Credentials", Description: "Unauthorized" });
  }
};

export const getParkingSpaceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { SpaceId } = req.params;

    if (!SpaceId) {
      throw new AppError("Parking space id is required", 400);
    }
    const parkingSpace = await prisma.parkingSpace.findUnique({
      where: { SpaceId },
      select: {
        id: true,
        SpaceId: true,
        state: true,
        type: true,
        startTime: true,
        occupant: true,
        floor: true,
        slot: true,
        licensePlateNumber: true,
      },
    });

    if (!parkingSpace) {
      throw new AppError("Parking space not found", 404);
    }

    res.status(200).json({ parkingSpace });
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: "Invalid Credentials", Description: "Unauthorized" });
  }
};
