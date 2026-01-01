import { Router } from "express";
import { requireAuth, requireAdmin } from "../../../middleware/auth.js";
import { addCategory, addMenuItem, fetchMenu } from "./ menu.controller.js";

export const menuRouter = Router();

// Public
menuRouter.get("/", fetchMenu);

// Admin only
menuRouter.post("/categories", requireAuth, requireAdmin, addCategory);
menuRouter.post("/items", requireAuth, requireAdmin, addMenuItem);
