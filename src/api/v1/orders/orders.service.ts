import { prisma } from "../../../config/prisma.js";

export async function createOrder(
  userId: string,
  items: { menuItemId: string; quantity: number }[]
) {
  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: { in: items.map((i) => i.menuItemId) },
      isAvailable: true,
    },
  });

  if (menuItems.length !== items.length) {
    throw new Error("Invalid or unavailable menu item");
  }

  const orderItems = items.map((item) => {
    const menu = menuItems.find((m) => m.id === item.menuItemId)!;
    return {
      name: menu.name,
      price: menu.price,
      quantity: item.quantity,
    };
  });

  const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: orderItems,
      },
    },
    include: { items: true },
  });
}

export function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
}

export function updateOrderStatus(orderId: string, status: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status: status as any },
  });
}
