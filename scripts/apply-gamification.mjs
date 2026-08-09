import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const statements = [
  `ALTER TABLE "SavedQuiz" ADD COLUMN "theme" TEXT NOT NULL DEFAULT 'rose'`,
  `CREATE TABLE "QuizAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "SavedQuiz" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE INDEX "QuizAttempt_quizId_idx" ON "QuizAttempt"("quizId")`,
  `CREATE INDEX "QuizAttempt_userId_idx" ON "QuizAttempt"("userId")`,
  `CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "unlockedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX "UserAchievement_userId_code_key" ON "UserAchievement"("userId", "code")`,
  `ALTER TABLE "UserStreak" ADD COLUMN "lastChallengeDate" TEXT`,
];

for (const sql of statements) {
  try {
    await client.execute(sql);
    console.log("OK:", sql.slice(0, 60).replace(/\s+/g, " "));
  } catch (err) {
    console.error("FAIL:", sql.slice(0, 60).replace(/\s+/g, " "));
    console.error("  ", err instanceof Error ? err.message : err);
  }
}

client.close();
console.log("done");
