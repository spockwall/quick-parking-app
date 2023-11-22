// staffRoutes.ts 或相应的路由文件
import { Router } from "express";
import { getUserById, updateUser } from "../controllers/userController";
import {
  staffGetParkingSpaces,
  staffGetParkingSpaceByUid,
} from "../controllers/parkingSpacesController";
import { verifyUserId, verifyAdminAndGuardAndStaff } from "../auth/auth";

const staffRouter = Router();

staffRouter.get("/users/:userId", verifyUserId, getUserById);
staffRouter.patch("/users/:userId", verifyUserId, updateUser);
staffRouter.get(
  "/parking_spaces",
  verifyAdminAndGuardAndStaff,
  staffGetParkingSpaces
);
staffRouter.get(
  "/parking_spaces/:userId",
  verifyUserId,
  staffGetParkingSpaceByUid
);

export default staffRouter;
