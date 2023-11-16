import { Router } from "express";
import userRouter from "./userRoutes";
import accountRouter from "./accountRoutes";
import parkingSpacesRouter from "./parkingSpacesRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", accountRouter);
router.use("/parking_spaces", parkingSpacesRouter);

export default router;
