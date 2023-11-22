import { Router } from "express";
import { login, logout } from "../controllers/accountController";

const accountRouter = Router();

accountRouter.post("/login", login);
accountRouter.post("/logout", logout);

export default accountRouter;
