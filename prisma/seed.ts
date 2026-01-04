import { PrismaClient } from "@prisma/client";
import categories from "./data/menuCategories.json";
import items from "./data/menuItems.json";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Insert categories first
  await prisma.menuCategory.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log("✅ Menu categories inserted");

  // 2️⃣ Insert menu items
  await prisma.menuItem.createMany({
    data: items,
    skipDuplicates: true,
  });

  console.log("✅ Menu items inserted");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
