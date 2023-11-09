import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { verifyAdmin, verifyAdminAndGuard } from "../auth/auth";
import { errorHandler } from "../err/errorHandler";

const router = Router();
router.get("/users", verifyAdminAndGuard, getUsers);
router.post("/users", verifyAdmin, createUser);
router.get("/users/:id", verifyAdminAndGuard, getUserById);
router.patch("/users/:id", verifyAdmin, updateUser);
router.delete("/users/:id", verifyAdmin, deleteUser);
router.use(errorHandler);

export default router;
