import { Request, Response } from "express";
import { createOrderSchema } from "./orders.schema.js";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} from "./orders.service.js";
import { io } from "../../../server.js";

export async function placeOrder(req: Request, res: Response) {
  const body = createOrderSchema.parse(req.body);

  const order = await createOrder(req.user!.id, body.items);

  io.emit("order:new", order); // admin notification

  res.status(201).json(order);
}

export async function fetchMyOrders(req: Request, res: Response) {
  const orders = await getUserOrders(req.user!.id);
  res.json(orders);
}

export async function changeOrderStatus(req: Request, res: Response) {
  const { orderId, status } = req.body;

  const order = await updateOrderStatus(orderId, status);

  io.to(orderId).emit("order:update", order);

  res.json(order);
}
