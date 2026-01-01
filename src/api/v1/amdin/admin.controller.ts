import { Request, Response } from "express";
import {
  getAllOrders,
  getPendingOrders,
  getTodaysOrders,
  getTodayRevenue,
} from "./admin.service.js";
import { updateOrderStatus } from "../orders/orders.service.js";
import { io } from "../../../server.js";

export async function fetchAllOrders(_req: Request, res: Response) {
  const orders = await getAllOrders();
  res.json(orders);
}

export async function fetchPendingOrders(_req: Request, res: Response) {
  const orders = await getPendingOrders();
  res.json(orders);
}

export async function fetchTodaysOrders(_req: Request, res: Response) {
  const orders = await getTodaysOrders();
  res.json(orders);
}

export async function fetchTodayRevenue(_req: Request, res: Response) {
  const revenue = await getTodayRevenue();
  res.json({ revenue });
}

export async function adminUpdateOrderStatus(req: Request, res: Response) {
  const { orderId, status } = req.body;

  const order = await updateOrderStatus(orderId, status);

  // real-time update to users
  io.to(orderId).emit("order:update", order);

  res.json(order);
}
