import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),
  order: z.number().optional(),
});

export const createMenuItemSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().min(1),
  categoryId: z.string(),
  imageUrl: z.string().url().optional(),
});
