// guardRoutes.ts 或相应的路由文件
import { Router } from "express";
import {
  getParkingSpaceUserInfo,
  getParkingSpacesDuration,
} from "../controllers/guardController";
import { verifyAdminAndGuard } from "../auth/auth";

const guardRouter = Router();

guardRouter
  .get("/duration", verifyAdminAndGuard, getParkingSpacesDuration)
  .get("/:parkingSpaceId", verifyAdminAndGuard, getParkingSpaceUserInfo);

export default guardRouter;
