import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const statements: string[] = [
  `CREATE TABLE IF NOT EXISTS "FlashcardReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "cardIndex" INTEGER NOT NULL,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "repetition" INTEGER NOT NULL DEFAULT 0,
    "efactor" REAL NOT NULL DEFAULT 2.5,
    "dueDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewed" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FlashcardReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "FlashcardReview_userId_quizId_cardIndex_key" ON "FlashcardReview"("userId", "quizId", "cardIndex")`,

  `CREATE TABLE IF NOT EXISTS "UserStreak" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TEXT,
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "streakFreezes" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserStreak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "UserStreak_userId_key" ON "UserStreak"("userId")`,

  `CREATE TABLE IF NOT EXISTS "XpEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "XpEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS "ClassroomSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hostId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "quizData" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'lobby',
    "currentQuestion" INTEGER NOT NULL DEFAULT -1,
    "totalQuestions" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClassroomSession_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "ClassroomSession_code_key" ON "ClassroomSession"("code")`,

  `CREATE TABLE IF NOT EXISTS "ClassroomParticipant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "answers" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClassroomParticipant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ClassroomSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "ClassroomParticipant_sessionId_nickname_key" ON "ClassroomParticipant"("sessionId", "nickname")`,

  // Referral system columns on User
  `ALTER TABLE "User" ADD COLUMN "referralCode" TEXT`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_referralCode_key" ON "User"("referralCode")`,
  `ALTER TABLE "User" ADD COLUMN "referredBy" TEXT`,
  `ALTER TABLE "User" ADD COLUMN "bonusQuizzes" INTEGER NOT NULL DEFAULT 0`,

  // Public quiz library column on SavedQuiz
  `ALTER TABLE "SavedQuiz" ADD COLUMN "isPublic" INTEGER NOT NULL DEFAULT 0`,

  // API Keys table
  `CREATE TABLE IF NOT EXISTS "ApiKey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Default',
    "lastUsed" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "ApiKey_key_key" ON "ApiKey"("key")`,

  // Teams table
  `CREATE TABLE IF NOT EXISTS "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Team_ownerId_key" ON "Team"("ownerId")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Team_inviteCode_key" ON "Team"("inviteCode")`,

  // Team membership column on User
  `ALTER TABLE "User" ADD COLUMN "teamId" TEXT`,
];

async function main() {
  console.log("Connecting to Turso...");
  for (const sql of statements) {
    try {
      await client.execute(sql);
      console.log("OK:", sql.slice(0, 60) + "...");
    } catch (err) {
      console.error("Error:", err);
    }
  }
  console.log("Done! All tables created.");
}

main();
