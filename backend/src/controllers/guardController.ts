import {
  PrismaClient,
  State,
  Status,
  Record as PrismaRecord,
} from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";
import { QueryParams } from "../utils/params";
import { parsePaginationParams } from "../utils/pagination";
import { processQueryParams } from "../utils/queryUtils";
import { AppError } from "../err/errorHandler";
import { recordSchema } from "../utils/validation";
import redis from "../config/redisconfig";

const prisma = new PrismaClient();

export const getParkingSpacesDuration = async (
  req: Request,
  res: Response
): Promise<void> => {
  const queryParams = req.query as Partial<QueryParams>;
  const whereCondition = processQueryParams(queryParams);
  const cacheKey = JSON.stringify(whereCondition);

  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    res.json(JSON.parse(cachedData));
    return;
  }

  const { skipValue, takeValue } = parsePaginationParams(
    queryParams.offset,
    queryParams.limit
  );

  const currentTime = moment().unix();

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

  await redis.set(
    cacheKey,
    JSON.stringify(parkingSpacesWithDuration),
    "EX",
    3600
  );

  res.json({
    parkingSpaces: parkingSpacesWithDuration,
  });
};

export const getParkingSpaceUserInfo = async (
  req: Request<{ parkingSpaceId: string }>,
  res: Response
): Promise<void> => {
  const { parkingSpaceId } = req.params;

  const cacheKey = `parkingSpaceUserInfo:${parkingSpaceId}`;

  const cachedUserInfo = await redis.get(cacheKey);
  if (cachedUserInfo) {
    res.status(200).json({ userInfo: JSON.parse(cachedUserInfo) });
    return;
  }

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

  await redis.set(cacheKey, JSON.stringify(userInfo), "EX", 3600);

  res.status(200).json({ userInfo });
};

export const createEnterRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { spaceId, licensePlateNumber } = req.body;

  const enterTime = moment().unix();

  const parkingSpace = await prisma.parkingSpace.findUnique({
    where: { spaceId },
  });

  if (!parkingSpace) {
    throw new AppError("Resource not found", 404);
  }

  if (parkingSpace.state === State.occupied) {
    throw new AppError("Operation not permitted", 400);
  }

  const licensePlate = await prisma.licensePlate.findUnique({
    where: { licensePlateNumber },
    include: { user: true },
  });

  if (!licensePlate || !licensePlate.user) {
    throw new AppError("Resource not found", 404);
  }

  if (
    (parkingSpace.status === Status.difficulty &&
      licensePlate.user.status !== Status.difficulty) ||
    (parkingSpace.status === Status.disability &&
      licensePlate.user.status !== Status.disability)
  ) {
    throw new AppError("Operation not permitted", 403);
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

  const cacheKey = `parkingSpaceInfo:${spaceId}`;
  await redis.del(cacheKey);

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
    spaceId,
    licensePlateNumber,
  });
  if (error) {
    throw new AppError("Invalid request data", 400);
  }

  const exitTime = moment().unix();

  const recordToUpdate = await prisma.record.findFirst({
    where: {
      spaceId: spaceId,
      licensePlateNumber: licensePlateNumber,
      exitTime: null,
    },
  });

  if (!recordToUpdate) {
    throw new AppError("Resource not found", 404);
  }

  const updatedRecord = await prisma.record.update({
    where: { id: recordToUpdate.id },
    data: { exitTime: exitTime },
  });

  await prisma.parkingSpace.update({
    where: { spaceId: spaceId },
    data: { state: State.available },
  });

  const parkingSpaceCacheKey = `parkingSpaceInfo:${spaceId}`;
  await redis.del(parkingSpaceCacheKey);

  const allParkingSpacesCacheKey = "allParkingSpacesInfo";
  await redis.del(allParkingSpacesCacheKey);

  res.status(200).json({
    message: "Exit record updated successfully",
    updatedRecord,
  });
};

export const getParkingSpacesRatio = async (
  req: Request,
  res: Response
): Promise<void> => {
  const queryParams = req.query as Partial<QueryParams>;
  const whereCondition = processQueryParams(queryParams);

  const spaceUsage: Record<string, number> = {};

  // Fetch records from the past 'days' days
  const records: PrismaRecord[] = await prisma.record.findMany({
    where: {
      ...whereCondition,
      enterTime: {
        gte: moment()
          .subtract(Number(queryParams.days || 7), "days")
          .unix(),
      },
    },
  });

  records.forEach((record) => {
    const exitTimeMoment = record.exitTime
      ? moment.unix(record.exitTime)
      : moment();
    const enterTimeMoment = moment.unix(record.enterTime);
    const durationInSeconds = exitTimeMoment.diff(enterTimeMoment, "seconds");
    if (durationInSeconds > 0) {
      spaceUsage[record.spaceId] =
        (spaceUsage[record.spaceId] || 0) + durationInSeconds;
    }
  });

  const days = Number(queryParams.days || 7);
  const totalPeriodInSeconds = days * 24 * 60 * 60; // Total period in seconds

  const spaceVacancy: Record<string, number> = {};
  Object.keys(spaceUsage).forEach((spaceId) => {
    // Calculate the vacancy ratio for each space
    spaceVacancy[spaceId] = spaceUsage[spaceId] / totalPeriodInSeconds;
  });

  // Format the results for the response
  const formattedVacancy = Object.entries(spaceVacancy).map(
    ([spaceId, ratio]) => ({
      spaceId,
      ratio: parseFloat(ratio.toFixed(5)), // Optionally round the ratio to two decimal places for readability
    })
  );

  res.json({ spaceVacancy: formattedVacancy });
};

export const getParkingSpaceRatioById = async (
  req: Request<{ spaceId: string }>,
  res: Response
): Promise<void> => {
  const { spaceId } = req.params;

  const now = moment();
  const sevenDaysAgo = moment().subtract(7, "days").startOf("day");

  const startOfSevenDaysAgoInSeconds = sevenDaysAgo.unix();
  const currentTimeInSeconds = now.unix();

  const cacheKey = `spaceRatio:${spaceId}:${now.format("YYYY-MM-DD")}`;

  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    res.json(JSON.parse(cachedData));
    return;
  }

  const records: PrismaRecord[] = await prisma.record.findMany({
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
    const startOfDay = moment().subtract(day, "days").startOf("day");
    const endOfDay = day === 0 ? now : startOfDay.clone().endOf("day");

    totalAvailableTime += endOfDay.unix() - startOfDay.unix();
  }

  const usageRatio = parseFloat(
    (totalUsedTime / totalAvailableTime).toFixed(5)
  );

  await redis.set(
    cacheKey,
    JSON.stringify({ spaceId, usageRatio }),
    "EX",
    86400
  );

  res.json({ spaceId, usageRatio });
};
