import { Router } from "express";
import userRouter from "./userRoutes";
import accountRouter from "./accountRoutes";
import parkingSpacesRouter from "./parkingSpacesRoutes";
import guardRouter from "./guardRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", accountRouter);
router.use("/parking_spaces", parkingSpacesRouter);
router.use("/guards/parking_spaces", guardRouter);

export default router;
