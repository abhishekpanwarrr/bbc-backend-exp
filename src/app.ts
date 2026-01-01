import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./api/v1/auth/auth.routes";

export const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
