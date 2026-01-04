import { Request, Response } from "express";
import { createCategorySchema, createMenuItemSchema } from "./menu.schema.js";
import {
  getMenu,
  createCategory,
  createMenuItem,
  getCategoryWithItems,
  getFeaturedItems,
  getMenuItemById,
} from "./menu.service.js";

export async function fetchMenu(_req: Request, res: Response) {
  const menu = await getMenu();
  res.json(menu);
}

export async function addCategory(req: Request, res: Response) {
  const body = createCategorySchema.parse(req.body);

  const category = await createCategory(body.name, body.order, body?.imageUrl);

  res.status(201).json(category);
}

export async function addMenuItem(req: Request, res: Response) {
  const body = createMenuItemSchema.parse(req.body);
  const item = await createMenuItem(body);
  res.status(201).json(item);
}

export async function fetchCategoryWithItem(req: Request, res: Response) {
  const category = await getCategoryWithItems(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
}

export async function fetchFeaturedItems(req: Request, res: Response) {
  const items = await getFeaturedItems();
  res.json(items);
}

export async function getMenuItem(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const item = await getMenuItemById(id);

    res.json(item);
  } catch (error: any) {
    res.status(404).json({
      message: error.message || "Menu item not found",
    });
  }
}
