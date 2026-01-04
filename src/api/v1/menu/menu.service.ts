import { FEATURED_ITEM_IDS } from "../../../config/featured.js";
import { prisma } from "../../../config/prisma.js";

export function getMenu() {
  return prisma.menuCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      items: {
        where: { isAvailable: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export function createCategory(name: string, order = 0, imageUrl?: string) {
  return prisma.menuCategory.create({
    data: {
      name,
      order,
      imageUrl,
    },
  });
}

export function createMenuItem(data: {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
}) {
  return prisma.menuItem.create({ data });
}

export async function getCategoryWithItems(categoryId: string) {
  return prisma.menuCategory.findUnique({
    where: { id: categoryId },
    include: {
      items: true,
    },
  });
}

export async function getFeaturedItems() {
  if (FEATURED_ITEM_IDS.length === 0) {
    return [];
  }

  return prisma.menuItem.findMany({
    where: {
      id: {
        in: FEATURED_ITEM_IDS,
      },
      isAvailable: true,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function getMenuItemById(id: string) {
  const item = await prisma.menuItem.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!item) {
    throw new Error("Menu item not found");
  }

  return item;
}
