import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const statements = [
  `ALTER TABLE "SavedQuiz" ADD COLUMN "reviewStatus" TEXT NOT NULL DEFAULT 'approved'`,
  `ALTER TABLE "SavedQuiz" ADD COLUMN "draftSetId" TEXT`,
  `CREATE TABLE IF NOT EXISTS "DraftQuizSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL DEFAULT 'text',
    "ocrUsed" INTEGER NOT NULL DEFAULT 0,
    "sourceConfidence" REAL,
    "reviewStatus" TEXT NOT NULL DEFAULT 'draft',
    "reviewerNotes" TEXT,
    "rejectionReason" TEXT,
    "quizData" TEXT NOT NULL,
    "savedQuizId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DraftQuizSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "DraftQuizSet_savedQuizId_key" ON "DraftQuizSet"("savedQuizId")`,
  `CREATE TABLE IF NOT EXISTS "GeneratedItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "draftSetId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "bloomLevel" TEXT NOT NULL,
    "bloomRationale" TEXT,
    "ocrUsed" INTEGER NOT NULL DEFAULT 0,
    "sourceConfidence" REAL,
    "distractorStrength" REAL,
    "reviewStatus" TEXT NOT NULL DEFAULT 'draft',
    "reviewerNotes" TEXT,
    "rejectionReason" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GeneratedItem_draftSetId_fkey" FOREIGN KEY ("draftSetId") REFERENCES "DraftQuizSet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "GeneratedItem_draftSetId_reviewStatus_idx" ON "GeneratedItem"("draftSetId", "reviewStatus")`,
];

for (const sql of statements) {
  try {
    await client.execute(sql);
    console.log("OK", sql.split("\n")[0].slice(0, 80));
  } catch (e) {
    const msg = String(e?.message || e);
    if (msg.includes("duplicate column") || msg.includes("already exists")) {
      console.log("SKIP", msg.slice(0, 100));
    } else {
      console.error("FAIL", msg);
      throw e;
    }
  }
}
console.log("apply-draft-review done");
