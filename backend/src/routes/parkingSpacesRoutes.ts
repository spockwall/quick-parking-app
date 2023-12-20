import { Router } from "express";
import { verifyAdminAndGuard } from "../auth/authService";
import {
  createParkingSpace,
  getParkingSpaces,
  getParkingSpaceById,
} from "../controllers/parkingSpacesController";

const parkingSpacesRouter = Router();

parkingSpacesRouter.post("/", verifyAdminAndGuard, createParkingSpace);
parkingSpacesRouter.get("/", verifyAdminAndGuard, getParkingSpaces);
parkingSpacesRouter.get("/:spaceId", verifyAdminAndGuard, getParkingSpaceById);
export default parkingSpacesRouter;
