import { Router } from "express";
import { register, login, logout } from "../controllers/accountController";
import { verifyUserId } from "../auth/auth";

const accountRouter = Router();

accountRouter.post("/register", verifyUserId, register);
accountRouter.post("/login", login);
accountRouter.post("/logout", logout);

export default accountRouter;
