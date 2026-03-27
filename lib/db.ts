import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function makeClient() {
  const url = process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  const authToken = process.env.TURSO_AUTH_TOKEN?.replace(/\s/g, "");

  const adapter = new PrismaLibSql(
    authToken ? { url, authToken } : { url }
  );
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? makeClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
