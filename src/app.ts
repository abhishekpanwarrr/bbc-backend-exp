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
 * ✅ CORS FIX (IMPORTANT)
 */
const allowedOrigins = [
  process.env.CORS_ORIGIN, // http://localhost:3000
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server & tools like curl/postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ VERY IMPORTANT: handle preflight
app.options("*", cors());

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
