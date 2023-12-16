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
    res.json({
      ...JSON.parse(cachedData),
      message: "Fetch all parking spaces duration successfully",
    });
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
    where: {
      ...whereCondition,
      parkingSpace: {
        ...(whereCondition.floor !== undefined && {
          floor: whereCondition.floor,
        }),
        ...(whereCondition.lot !== undefined && { lot: whereCondition.lot }),
      },
    },
    select: {
      spaceId: true,
      enterTime: true,
      exitTime: true,
      parkingSpace: {
        select: {
          state: true,
          status: true,
        },
      },
    },
  });

  const parkingSpaces = records.map((record) => {
    const exitTime = record.exitTime ?? currentTime;
    const duration = exitTime - record.enterTime;
    return {
      parkingSpaceId: record.spaceId,
      state: record.parkingSpace.state,
      status: record.parkingSpace.status,
      startTime: record.enterTime,
      duration: duration,
    };
  });

  await redis.set(cacheKey, JSON.stringify(parkingSpaces), "EX", 60);

  res.json(parkingSpaces);
};

export const getParkingSpaceUserInfo = async (
  req: Request<{ parkingSpaceId: string }>,
  res: Response
): Promise<void> => {
  const { parkingSpaceId } = req.params;

  const cacheKey = `parkingSpaceUserInfo:${parkingSpaceId}`;

  const cachedUserInfo = await redis.get(cacheKey);
  if (cachedUserInfo) {
    res.status(200).json(JSON.parse(cachedUserInfo));

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
    res.status(200).json(null);
    return;
  }

  const userInfo = {
    username: activeRecord.user?.name,
    phone: activeRecord.user?.phone,
    email: activeRecord.user?.email,
    licensePlateNumber: activeRecord.licensePlateNumber,
  };

  await redis.set(cacheKey, JSON.stringify(userInfo), "EX", 3600);

  res.status(200).json(userInfo);
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

  await redis.del(`parkingSpaceInfo:${spaceId}`);

  await clearParkingSpacesListCache();

  const userId = licensePlate.userId;
  await redis.del(`staffParkingSpaceByUserId:${userId}`);

  res.status(201).json({
    ...record,
    message: "Enter record created successfully",
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

  await redis.del(`parkingSpaceInfo:${spaceId}`);

  await clearParkingSpacesListCache();

  await redis.del(`parkingSpaceUserInfo:${spaceId}`);

  const userId = recordToUpdate.userId;
  await redis.del(`staffParkingSpaceByUserId:${userId}`);

  res.status(200).json({
    ...updatedRecord,
    message: "Exit record updated successfully",
  });
};

export const getParkingSpacesRatio = async (
  req: Request,
  res: Response
): Promise<void> => {
  const queryParams = req.query as Partial<QueryParams>;
  const whereCondition = processQueryParams(queryParams);

  const spaceUsage: Record<string, number> = {};

  const records = await prisma.record.findMany({
    where: {
      ...whereCondition,
      enterTime: {
        gte: moment()
          .subtract(Number(queryParams.days || 7), "days")
          .unix(),
      },
    },
    include: {
      parkingSpace: true,
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
  const totalPeriodInSeconds = days * 24 * 60 * 60;

  const parkingSpaces = Object.keys(spaceUsage).map((spaceId) => {
    const parkingSpace = records.find(
      (record) => record.spaceId === spaceId
    )?.parkingSpace;

    const usageRatio = spaceUsage[spaceId] / totalPeriodInSeconds;

    return {
      parkingSpaceId: spaceId,
      status: parkingSpace?.status,
      usageRatio: parseFloat(usageRatio.toFixed(5)),
    };
  });
  res.json(parkingSpaces);
};

export const getParkingSpaceRatioById = async (
  req: Request<{ spaceId: string }>,
  res: Response
): Promise<void> => {
  const { spaceId } = req.params;

  const now = moment();
  const sevenDaysAgo = moment().subtract(6, "days").startOf("day");

  const cacheKey = `spaceRatio:${spaceId}:${sevenDaysAgo.format(
    "YYYY-MM-DD"
  )}-${now.format("YYYY-MM-DD")}`;

  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    res.json({
      ...JSON.parse(cachedData),
      message: "Fetch usage ratio of the specific parking spaces successfully",
    });
    return;
  }

  const parkingSpace = await prisma.parkingSpace.findUnique({
    where: { spaceId },
  });

  if (!parkingSpace) {
    throw new AppError("Parking space not found", 404);
  }
  interface UsageHistory {
    parkingSpaceId: string;
    dates: string[];
    usageRatios: number[];
  }

  const usageHistory: UsageHistory = {
    parkingSpaceId: spaceId,
    dates: [],
    usageRatios: [],
  };

  for (let day = 0; day < 7; day++) {
    const startOfDay = moment().subtract(day, "days").startOf("day").unix();
    const endOfDay = moment().subtract(day, "days").endOf("day").unix();

    const records = await prisma.record.findMany({
      where: {
        spaceId: spaceId,
        enterTime: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    let totalUsedTime = 0;
    records.forEach((record) => {
      const exitTime = record.exitTime ?? endOfDay;
      totalUsedTime += exitTime - record.enterTime;
    });

    const totalAvailableTime = endOfDay - startOfDay;
    const usageRatio = parseFloat(
      (totalUsedTime / totalAvailableTime).toFixed(5)
    );

    usageHistory.dates.unshift(moment.unix(startOfDay).format("YYYY-MM-DD"));
    usageHistory.usageRatios.unshift(usageRatio);
  }

  await redis.set(cacheKey, JSON.stringify(usageHistory), "EX", 86400);

  res.json({
    ...usageHistory,
    message: "Fetch usage ratio of the specific parking spaces successfully",
  });
};

async function clearParkingSpacesListCache() {
  const scanAndDelete = async (pattern: string) => {
    let cursor = "0";
    do {
      const reply = await redis.scan(cursor, "MATCH", pattern, "COUNT", 20);
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
