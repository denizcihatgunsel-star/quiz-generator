-- Study Mode: Add StudyConcept table for concept-based spaced repetition
-- Run this SQL against production Turso before merging PR #35

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
);

CREATE UNIQUE INDEX IF NOT EXISTS "StudyConcept_userId_concept_key" ON "StudyConcept"("userId", "concept");
CREATE INDEX IF NOT EXISTS "StudyConcept_userId_dueDate_idx" ON "StudyConcept"("userId", "dueDate");
CREATE INDEX IF NOT EXISTS "StudyConcept_userId_cleared_idx" ON "StudyConcept"("userId", "cleared");
