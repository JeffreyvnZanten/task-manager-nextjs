import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create JefvnZanten user
  const user = await prisma.user.upsert({
    where: { username: "JefvnZanten" },
    update: {},
    create: {
      username: "JefvnZanten",
      name: "Jeff van Zanten",
      email: "jeffvnzanten@gmail.com",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
