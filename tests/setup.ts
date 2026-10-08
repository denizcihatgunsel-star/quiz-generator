import { beforeAll } from "vitest";
import "dotenv/config";
import { db } from "@/lib/db";

beforeAll(async () => {
  // Ensure test database is set up
  process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./test.db";

  // Create StudyConcept table if it doesn't exist
  try {
    // Drop and recreate tables to ensure schema is current
    await db.$executeRawUnsafe(`DROP TABLE IF EXISTS "GeneratedItem"`);
    await db.$executeRawUnsafe(`DROP TABLE IF EXISTS "DraftQuizSet"`);
    await db.$executeRawUnsafe(`DROP TABLE IF EXISTS "StudyConcept"`);
    await db.$executeRawUnsafe(`DROP TABLE IF EXISTS "SavedQuiz"`);
    
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "StudyConcept" (
        "id" TEXT PRIMARY KEY NOT NULL,
        "userId" TEXT NOT NULL,
        "concept" TEXT NOT NULL,
        "originalBloom" INTEGER NOT NULL DEFAULT 1,
        "currentBloom" INTEGER NOT NULL DEFAULT 1,
        "correctStreak" INTEGER NOT NULL DEFAULT 0,
        "firstCorrectAt" DATETIME,
        "lastReviewedAt" DATETIME,
        "dueDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "sourceQuizId" TEXT NOT NULL DEFAULT '',
        "sourceTopic" TEXT NOT NULL DEFAULT '',
        "cleared" INTEGER NOT NULL DEFAULT 0,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      )
    `);
    await db.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "StudyConcept_userId_concept_key" ON "StudyConcept"("userId", "concept")
    `);
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "StudyConcept_userId_dueDate_idx" ON "StudyConcept"("userId", "dueDate")
    `);
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "StudyConcept_userId_cleared_idx" ON "StudyConcept"("userId", "cleared")
    `);
    
    // Create DraftQuizSet table for draft exclusion tests
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "DraftQuizSet" (
        "id" TEXT PRIMARY KEY NOT NULL,
        "userId" TEXT NOT NULL,
        "topic" TEXT NOT NULL,
        "sourceType" TEXT NOT NULL DEFAULT 'text',
        "ocrUsed" INTEGER NOT NULL DEFAULT 0,
        "sourceConfidence" REAL,
        "reviewStatus" TEXT NOT NULL DEFAULT 'draft',
        "reviewerNotes" TEXT,
        "rejectionReason" TEXT,
        "quizData" TEXT NOT NULL,
        "savedQuizId" TEXT UNIQUE,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create GeneratedItem table
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "GeneratedItem" (
        "id" TEXT PRIMARY KEY NOT NULL,
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
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("draftSetId") REFERENCES "DraftQuizSet"("id") ON DELETE CASCADE
      )
    `);
    
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "GeneratedItem_draftSetId_reviewStatus_idx" ON "GeneratedItem"("draftSetId", "reviewStatus")
    `);
    
    // Create SavedQuiz table for question matching tests
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SavedQuiz" (
        "id" TEXT PRIMARY KEY NOT NULL,
        "userId" TEXT NOT NULL,
        "topic" TEXT NOT NULL,
        "data" TEXT NOT NULL,
        "theme" TEXT NOT NULL DEFAULT 'rose',
        "score" INTEGER,
        "total" INTEGER,
        "shareId" TEXT UNIQUE,
        "isPublic" INTEGER NOT NULL DEFAULT 0,
        "reviewStatus" TEXT NOT NULL DEFAULT 'approved',
        "draftSetId" TEXT UNIQUE,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    // Tables might already exist
  }
});

