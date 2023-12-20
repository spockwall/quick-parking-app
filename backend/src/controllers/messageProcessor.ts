import moment from "moment";
import { connectRabbitMQ } from "../config/rabbitMQ";
import { clearParkingSpacesListCache } from "./guardController";
import redis from "../config/redisconfig";
import { AppError } from "../err/errorHandler";
import {
  PrismaClient,
  State,
  Status,
  Record as PrismaRecord,
} from "@prisma/client";

const prisma = new PrismaClient();

// 启动消息处理
export const startProcessing = async () => {
  const channel = await connectRabbitMQ();

  //   channel.consume(
  //     "enterRecordQueue",
  //     async (msg) => {
  //       if (msg) {
  //         try {
  //           const msgContent = msg.content.toString();
  //           await processEnterRecord(JSON.parse(msgContent));
  //           channel.ack(msg);
  //         } catch (error) {
  //           console.error("Error processing message:", error);
  //           // 可以考虑在这里添加错误处理逻辑，例如重新入队或记录错误
  //         }
  //       }
  //     },
  //     { noAck: false }
  //   );
};

// 可以添加更多的处理函数或队列消费者

interface EnterRecordMessage {
  spaceId: string;
  licensePlateNumber: string;
}

export const processEnterRecord = async (message: EnterRecordMessage) => {
  const { spaceId, licensePlateNumber } = message;

  const enterTime = moment().unix();

  // 查找停车位
  const parkingSpace = await prisma.parkingSpace.findUnique({
    where: { spaceId },
  });

  // console.log(parkingSpace);
  if (!parkingSpace) {
    throw new AppError("Resource not found", 404);
  }

  // 检查停车位状态
  if (parkingSpace.state === State.occupied) {
    throw new AppError("Operation not permitted", 400);
  }

  // 查找车牌和用户信息
  const licensePlate = await prisma.licensePlate.findUnique({
    where: { licensePlateNumber },
    include: { user: true },
  });

  if (!licensePlate || !licensePlate.user) {
    throw new AppError("Resource not found", 404);
  }

  // 检查停车位和用户状态
  if (
    (parkingSpace.status === Status.difficulty &&
      licensePlate.user.status !== Status.difficulty) ||
    (parkingSpace.status === Status.disability &&
      licensePlate.user.status !== Status.disability)
  ) {
    throw new AppError("Operation not permitted", 403);
  }

  // 创建入场记录
  const record = await prisma.record.create({
    data: {
      spaceId,
      userId: licensePlate.userId,
      licensePlateNumber,
      enterTime,
    },
  });

  // 更新停车位状态
  await prisma.parkingSpace.update({
    where: { spaceId },
    data: { state: State.occupied },
  });

  // 更新 Redis 缓存
  await redis.del(`parkingSpaceInfo:${spaceId}`);
  await clearParkingSpacesListCache();
  const userId = licensePlate.userId;
  await redis.del(`staffParkingSpaceByUserId:${userId}`);

  // 返回记录（或其他处理，取决于您的业务逻辑）
  return record;
};
