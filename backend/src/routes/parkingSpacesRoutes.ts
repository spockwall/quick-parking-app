import { Router } from "express";
import { verifyAdminAndGuard } from "../auth/auth";
import {
    createParkingSpace,
    getParkingSpaces,
    getParkingSpaceById,
} from "../controllers/parkingSpacesController";

const parkingSpacesRouter = Router();

parkingSpacesRouter.post("/parking_spaces", verifyAdminAndGuard, createParkingSpace);
parkingSpacesRouter.get("/parking_spaces", verifyAdminAndGuard, getParkingSpaces);
parkingSpacesRouter.get("/parking_spaces/:SpaceId", verifyAdminAndGuard, getParkingSpaceById);
export default parkingSpacesRouter;