import { Request, Response } from "express";
import { createCategorySchema, createMenuItemSchema } from "./menu.schema.js";
import { getMenu, createCategory, createMenuItem } from "./menu.service.js";

export async function fetchMenu(_req: Request, res: Response) {
  const menu = await getMenu();
  res.json(menu);
}

export async function addCategory(req: Request, res: Response) {
  const body = createCategorySchema.parse(req.body);
  const category = await createCategory(body.name, body.order);
  res.status(201).json(category);
}

export async function addMenuItem(req: Request, res: Response) {
  const body = createMenuItemSchema.parse(req.body);
  const item = await createMenuItem(body);
  res.status(201).json(item);
}
