import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./api/v1/auth/auth.routes";
import { menuRouter } from "./api/v1/menu/menu.routes";
import { ordersRouter } from "./api/v1/orders/orders.routes";
import { adminRouter } from "./api/v1/amdin/admin.routes";
console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);

export const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
