import { PrismaClient } from "@/app/generated/prisma/client";

// Prisma 7: connection URL is configured via prisma.config.ts, not the constructor.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
