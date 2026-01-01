import { Router } from "express";
import {
  fetchAllOrders,
  fetchPendingOrders,
  fetchTodaysOrders,
  fetchTodayRevenue,
  adminUpdateOrderStatus,
} from "./admin.controller.js";
import { requireAuth, requireAdmin } from "../../../middleware/auth.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

adminRouter.get("/orders", fetchAllOrders);
adminRouter.get("/orders/pending", fetchPendingOrders);
adminRouter.get("/orders/today", fetchTodaysOrders);
adminRouter.get("/revenue/today", fetchTodayRevenue);

adminRouter.patch("/orders/status", adminUpdateOrderStatus);
