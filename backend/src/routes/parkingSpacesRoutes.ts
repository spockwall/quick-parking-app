import { Router } from "express";
import { verifyAdminAndGuard } from "../auth/auth";
import {
  createParkingSpace,
  getParkingSpaces,
  getParkingSpaceById,
} from "../controllers/parkingSpacesController";

const parkingSpacesRouter = Router();

parkingSpacesRouter.post("/", verifyAdminAndGuard, createParkingSpace);
parkingSpacesRouter.get("/", verifyAdminAndGuard, getParkingSpaces);
parkingSpacesRouter.get("/:SpaceId", verifyAdminAndGuard, getParkingSpaceById);
export default parkingSpacesRouter;
