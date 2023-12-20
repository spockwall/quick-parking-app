import express from "express";
import "express-async-errors";
import { errorHandler } from "./err/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes";
import { startProcessing } from "./controllers/messageProcessor";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

startProcessing();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
