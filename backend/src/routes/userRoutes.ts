import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { verifyAdmin, verifyAdminAndGuard } from "../auth/auth";

const router = Router();
router
  .route("/users")
  .get(verifyAdminAndGuard, getUsers)
  .post(verifyAdmin, createUser);

router
  .route("/users/:id")
  .get(verifyAdminAndGuard, getUserById)
  .patch(verifyAdmin, updateUser)
  .delete(verifyAdmin, deleteUser);

export default router;
