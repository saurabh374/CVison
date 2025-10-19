import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";

config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [process.env.ALLOWED_SITE],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

export default app;
