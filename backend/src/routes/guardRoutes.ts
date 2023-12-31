import { Router } from "express";
import {
  createEnterRecord,
  getParkingSpaceUserInfo,
  recordExit,
  getParkingSpacesDuration,
  getParkingSpacesRatio,
  getParkingSpaceRatioById,
  getDurationBySpaceId,
} from "../controllers/guardController";
import { verifyAdminAndGuard } from "../auth/authService";

const guardRouter = Router();

guardRouter
  .get("/duration", verifyAdminAndGuard, getParkingSpacesDuration)
  .get("/duration/:spaceId", verifyAdminAndGuard, getDurationBySpaceId)
  .get("/ratio", verifyAdminAndGuard, getParkingSpacesRatio)
  .get("/ratio/:spaceId", verifyAdminAndGuard, getParkingSpaceRatioById)
  .get("/:parkingSpaceId", verifyAdminAndGuard, getParkingSpaceUserInfo)
  .post("/entry_record", verifyAdminAndGuard, createEnterRecord)
  .post("/exit_record", verifyAdminAndGuard, recordExit);

export default guardRouter;
