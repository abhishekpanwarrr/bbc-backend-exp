import { prisma } from "../../../config/prisma.js";

export function getAllOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: true,
    },
  });
}

export function getPendingOrders() {
  return prisma.order.findMany({
    where: {
      status: { in: ["PENDING", "PREPARING"] },
    },
    orderBy: { createdAt: "asc" },
    include: { items: true },
  });
}

export function getTodaysOrders() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  return prisma.order.findMany({
    where: {
      createdAt: { gte: start },
    },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
}

export async function getTodayRevenue() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const result = await prisma.order.aggregate({
    _sum: { total: true },
    where: {
      createdAt: { gte: start },
      status: { in: ["PAID", "COMPLETED"] },
    },
  });

  return result._sum.total ?? 0;
}
