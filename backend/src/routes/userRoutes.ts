import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { verifyAdmin, verifyAdminAndGuard } from "../auth/auth";

const userRouter = Router();

userRouter.get("/", verifyAdminAndGuard, getUsers);
userRouter.post("/", verifyAdmin, createUser);
userRouter.get("/:userId", verifyAdminAndGuard, getUserById);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", verifyAdmin, deleteUser);

export default userRouter;
