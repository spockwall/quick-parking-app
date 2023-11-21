import { Router } from "express";
import { login, logout } from "../controllers/accountController";
import { verifyUserId } from "../auth/auth";

const accountRouter = Router();

accountRouter.post("/login", login);
accountRouter.post("/logout", logout);

export default accountRouter;
