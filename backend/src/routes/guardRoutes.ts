// guardRoutes.ts 或相应的路由文件
import { Router } from "express";
import {
  createEnterRecord,
  getParkingSpaceUserInfo,
  recordExit,
  getParkingSpacesDuration,
  getParkingSpacesRatio,
  getParkingSpaceRatioById,
} from "../controllers/guardController";
import { verifyAdmin, verifyAdminAndGuard } from "../auth/auth";

const guardRouter = Router();

guardRouter
  .get("/duration", verifyAdminAndGuard, getParkingSpacesDuration)
  .get("/ratio", verifyAdminAndGuard, getParkingSpacesRatio)
  .get("/ratio/:spaceId", verifyAdminAndGuard, getParkingSpaceRatioById)
  .get("/:parkingSpaceId", verifyAdminAndGuard, getParkingSpaceUserInfo)
  .post("/entry_record", verifyAdminAndGuard, createEnterRecord)
  .post("/exit_record", verifyAdminAndGuard, recordExit);

export default guardRouter;
