import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function makeClient() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN?.replace(/\s/g, "");

  // Turso (remote)
  if (tursoUrl && authToken) {
    const adapter = new PrismaLibSql({ url: tursoUrl, authToken });
    return new PrismaClient({ adapter });
  }

  // Local SQLite via libSQL adapter — use file: URL
  const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  const adapter = new PrismaLibSql({ url });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? makeClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Self-migration: make sure the email-verification columns exist.
// Runs at most once per server instance; safe to call concurrently
// (duplicate ALTER TABLE errors are swallowed).
const globalForMigration = globalThis as unknown as {
  verificationColumnsReady: Promise<void> | undefined;
};

export function ensureVerificationColumns(): Promise<void> {
  if (!globalForMigration.verificationColumnsReady) {
    globalForMigration.verificationColumnsReady = (async () => {
      const alters: [string, string][] = [
        ["emailVerified", `ALTER TABLE "User" ADD COLUMN "emailVerified" DATETIME`],
        ["verificationCode", `ALTER TABLE "User" ADD COLUMN "verificationCode" TEXT`],
        ["verificationExpires", `ALTER TABLE "User" ADD COLUMN "verificationExpires" DATETIME`],
      ];
      for (const [column, stmt] of alters) {
        try {
          await db.$executeRawUnsafe(`SELECT "${column}" FROM "User" LIMIT 1`);
        } catch {
          try {
            await db.$executeRawUnsafe(stmt);
          } catch {
            // column already added by another instance — ignore
          }
        }
      }
      // One-time backfill: accounts that existed before verification was
      // introduced stay usable. New signups always carry a code, so they
      // are excluded and must verify normally.
      try {
        await db.$executeRawUnsafe(
          `UPDATE "User" SET "emailVerified" = CURRENT_TIMESTAMP WHERE "emailVerified" IS NULL AND "verificationCode" IS NULL`
        );
      } catch {
        // non-fatal
      }

      // Smart Review table (Leitner boxes for missed questions)
      try {
        await db.$executeRawUnsafe(`SELECT "id" FROM "QuestionReview" LIMIT 1`);
      } catch {
        try {
          await db.$executeRawUnsafe(
            `CREATE TABLE IF NOT EXISTS "QuestionReview" (
              "id" TEXT PRIMARY KEY NOT NULL,
              "userId" TEXT NOT NULL,
              "quizId" TEXT NOT NULL DEFAULT '',
              "refId" TEXT NOT NULL,
              "topic" TEXT NOT NULL DEFAULT '',
              "payload" TEXT NOT NULL,
              "box" INTEGER NOT NULL DEFAULT 1,
              "dueDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "updatedAt" DATETIME NOT NULL
            )`
          );
          await db.$executeRawUnsafe(
            `CREATE UNIQUE INDEX IF NOT EXISTS "QuestionReview_userId_refId_key" ON "QuestionReview"("userId", "refId")`
          );
        } catch {
          // created by another instance — ignore
        }
      }
    })().catch((err) => {
      console.error("Verification column check failed:", err);
      globalForMigration.verificationColumnsReady = undefined;
    });
  }
  return globalForMigration.verificationColumnsReady;
}