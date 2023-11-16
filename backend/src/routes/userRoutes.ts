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
userRouter.get("/:id", verifyAdminAndGuard, getUserById);
userRouter.patch("/:id", verifyAdmin, updateUser);
userRouter.delete("/:id", verifyAdmin, deleteUser);

export default userRouter;
