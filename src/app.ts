import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { authRouter } from "./api/v1/auth/auth.routes";
import { menuRouter } from "./api/v1/menu/menu.routes";
import { ordersRouter } from "./api/v1/orders/orders.routes";
import { adminRouter } from "./api/v1/amdin/admin.routes";

export const app = express();

/**
 * ✅ CORS — SIMPLE, CORRECT, BULLETPROOF
 */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight
app.options("*", cors());

/**
 * Security & parsing AFTER CORS
 */
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
