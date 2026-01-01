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

export function createCategory(name: string, order = 0) {
  return prisma.menuCategory.create({
    data: { name, order },
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
