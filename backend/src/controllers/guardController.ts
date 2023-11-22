// guardController.ts
import { PrismaClient, State, Status, Record } from "@prisma/client";
import { Request, Response } from "express";
import { QueryParams } from "../utils/params";
import { parsePaginationParams } from "../utils/pagination";
import { processQueryParams } from "../utils/queryUtils";
import { AppError } from "../err/errorHandler";
import { recordSchema } from "../utils/validation";

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

  const currentTime = Math.floor(Date.now() / 1000);

  const records = await prisma.record.findMany({
    skip: skipValue,
    take: takeValue,
    where: whereCondition,
    select: {
      spaceId: true,
      enterTime: true,
      exitTime: true,
    },
  });

  const parkingSpacesWithDuration = records.map((record) => {
    const exitTime = record.exitTime ?? currentTime;
    const duration = exitTime - record.enterTime;
    return {
      spaceId: record.spaceId,
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

  const activeRecord = await prisma.record.findFirst({
    where: {
      spaceId: parkingSpaceId,
      exitTime: null,
    },
    include: {
      user: true,
    },
  });

  if (!activeRecord) {
    res.status(200).json({ userInfo: null });
    return;
  }

  const userInfo = {
    username: activeRecord.user?.name,
    phone: activeRecord.user?.phone,
    email: activeRecord.user?.email,
    licensePlateNumber: activeRecord.licensePlateNumber,
  };

  res.status(200).json({ userInfo });
};

export const createEnterRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { spaceId, licensePlateNumber } = req.body;

  const enterTime = Math.floor(Date.now() / 1000);

  const parkingSpace = await prisma.parkingSpace.findUnique({
    where: { spaceId },
  });

  if (!parkingSpace) {
    throw new AppError("Parking space not found", 404);
  }

  if (parkingSpace.state === State.occupied) {
    throw new AppError("Parking space is already occupied", 400);
  }

  const licensePlate = await prisma.licensePlate.findUnique({
    where: { licensePlateNumber },
    include: {
      user: true,
    },
  });

  if (!licensePlate || !licensePlate.user) {
    throw new AppError("License plate not found or no associated user", 404);
  }

  if (
    (parkingSpace.status === Status.difficulty &&
      licensePlate.user.status !== Status.difficulty) ||
    (parkingSpace.status === Status.disability &&
      licensePlate.user.status !== Status.disability)
  ) {
    throw new AppError("User is not eligible to book this parking space", 403);
  }

  const record = await prisma.record.create({
    data: {
      spaceId,
      userId: licensePlate.userId,
      licensePlateNumber,
      enterTime,
    },
  });

  await prisma.parkingSpace.update({
    where: { spaceId },
    data: { state: State.occupied },
  });

  res.status(201).json({
    message: "Enter record created successfully",
    record,
  });
};

export const recordExit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { spaceId, licensePlateNumber } = req.body;

  const { error } = recordSchema.validate({
    spaceId: spaceId,
    licensePlateNumber,
  });
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const exitTime = Math.floor(Date.now() / 1000);

  const recordToUpdate = await prisma.record.findFirst({
    where: {
      spaceId: spaceId,
      licensePlateNumber: licensePlateNumber,
      exitTime: null,
    },
  });

  if (!recordToUpdate) {
    throw new AppError("Record not found", 404);
  }

  const updatedRecord = await prisma.record.update({
    where: { id: recordToUpdate.id },
    data: { exitTime: exitTime },
  });

  await prisma.parkingSpace.update({
    where: { spaceId: spaceId },
    data: { state: State.available },
  });

  res.status(200).json({
    message: "Exit record updated successfully",
    updatedRecord,
  });
};

export const getParkingSpacesRatio = async (
  req: Request,
  res: Response
): Promise<void> => {
  interface SpaceUsage {
    [key: string]: number;
  }
  const today = new Date();
  today.setHours(9, 0, 0, 0); // Set to 9 AM local server time
  const startOfDayInSeconds = Math.floor(today.getTime() / 1000);

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const elapsedTimeTodayInSeconds = currentTimeInSeconds - startOfDayInSeconds;

  const spaceUsage: SpaceUsage = {};

  const records: Record[] = await prisma.record.findMany({
    where: {
      AND: [
        { enterTime: { gte: startOfDayInSeconds } },
        {
          OR: [{ exitTime: null }, { exitTime: { gte: startOfDayInSeconds } }],
        },
      ],
    },
  });

  records.forEach((record) => {
    const exitTime = record.exitTime ?? currentTimeInSeconds;
    const duration = exitTime - record.enterTime;
    if (duration > 0) {
      spaceUsage[record.spaceId] = (spaceUsage[record.spaceId] || 0) + duration;
    }
  });

  const spaceVacancy: SpaceUsage = {};
  Object.keys(spaceUsage).forEach((spaceId) => {
    spaceVacancy[spaceId] = spaceUsage[spaceId] / elapsedTimeTodayInSeconds;
  });

  const formattedVacancy = Object.entries(spaceVacancy).map(
    ([spaceId, ratio]) => ({
      spaceId,
      ratio,
    })
  );

  res.json({ spaceVacancy: formattedVacancy });
};

export const getParkingSpaceRatioById = async (
  req: Request<{ spaceId: string }>,
  res: Response
): Promise<void> => {
  const { spaceId } = req.params;

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);
  sevenDaysAgo.setHours(9, 0, 0, 0); // Start from 9 AM 7 days ago

  const startOfSevenDaysAgoInSeconds = Math.floor(
    sevenDaysAgo.getTime() / 1000
  );
  const currentTimeInSeconds = Math.floor(now.getTime() / 1000);

  const records: Record[] = await prisma.record.findMany({
    where: {
      spaceId: spaceId,
      enterTime: {
        gte: startOfSevenDaysAgoInSeconds,
      },
    },
  });

  let totalUsedTime = 0;
  records.forEach((record) => {
    const exitTime = record.exitTime ?? currentTimeInSeconds;
    totalUsedTime += exitTime - record.enterTime;
  });

  let totalAvailableTime = 0;
  for (let day = 0; day < 7; day++) {
    const startOfDay = new Date();
    startOfDay.setDate(now.getDate() - day);
    startOfDay.setHours(9, 0, 0, 0);
    const startOfDayTimestamp = startOfDay.getTime();

    let endOfDayTimestamp;
    if (day === 0) {
      endOfDayTimestamp = now.getTime();
    } else {
      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);
      endOfDayTimestamp = endOfDay.getTime();
    }

    totalAvailableTime += (endOfDayTimestamp - startOfDayTimestamp) / 1000;
  }

  const usageRatio = totalUsedTime / totalAvailableTime;

  res.json({
    spaceId,
    usageRatio,
  });
};
