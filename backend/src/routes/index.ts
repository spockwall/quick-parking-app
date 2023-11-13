import { Router } from "express";
import userRouter from "./userRoutes";
import accountRouter from "./accountRoutes";
import parkingSpacesRouter from "./parkingSpacesRoutes";

const router = Router();

router.use('/users',userRouter);
router.use('/account',accountRouter);
router.use(parkingSpacesRouter);

export default router;