// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Declare a global variable to hold the Prisma Client instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client, reusing the instance in development if it exists
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;
