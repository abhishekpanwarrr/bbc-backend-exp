import { Router } from "express";
import {
  placeOrder,
  fetchMyOrders,
  changeOrderStatus,
} from "./orders.controller.js";
import { requireAuth, requireAdmin } from "../../../middleware/auth.js";

export const ordersRouter = Router();

// User
ordersRouter.post("/", requireAuth, placeOrder);
ordersRouter.get("/me", requireAuth, fetchMyOrders);

// Admin
ordersRouter.patch("/status", requireAuth, requireAdmin, changeOrderStatus);
