#!/usr/bin/env node
/**
 * Seed local SQLite database (prisma/dev.db) with test user and approved study data.
 * Run with: npx tsx scripts/seed-local-db.ts
 * 
 * IMPORTANT: Unset TURSO_DATABASE_URL and TURSO_AUTH_TOKEN before running.
 */

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

// Force local SQLite
const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adapter = new PrismaLibSql({ url });
const db = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding local database:", url);

  // Check that we're NOT writing to Turso
  if (process.env.TURSO_DATABASE_URL || process.env.TURSO_AUTH_TOKEN) {
    console.error("❌ ERROR: TURSO_* environment variables are set. Refusing to seed.");
    console.error("   Unset TURSO_DATABASE_URL and TURSO_AUTH_TOKEN, then retry.");
    process.exit(1);
  }

  // Delete existing test user if present
  await db.user.deleteMany({ where: { email: "test@local.dev" } });

  // Hash password properly with bcrypt
  const hashedPassword = await bcrypt.hash("test1234", 10);

  // Create test user
  const user = await db.user.create({
    data: {
      id: "user-local-v7",
      email: "test@local.dev",
      password: hashedPassword,
      name: "Test User",
      role: "student",
      emailVerified: new Date(),
      createdAt: new Date(),
    },
  });

  console.log("✅ Created user:", user.email);

  // Verify password hash works
  const passwordMatches = await bcrypt.compare("test1234", user.password!);
  console.log("✅ Password verification:", passwordMatches ? "PASS" : "FAIL");

  if (!passwordMatches) {
    console.error("❌ Password hash verification failed!");
    process.exit(1);
  }

  // Create a draft set with approved GeneratedItems
  const draftSet = await db.draftQuizSet.create({
    data: {
      id: "draftset-local-v7",
      userId: user.id,
      topic: "Biology",
      sourceType: "text",
      quizData: JSON.stringify({ title: "Study Mode Test Quiz" }),
    },
  });

  console.log("✅ Created draft set:", draftSet.id);

  // Create approved GeneratedItems
  const items = [
    {
      question: "What is photosynthesis?",
      options: [
        "Process by which plants convert sunlight into energy",
        "Process of cell division",
        "Process of protein synthesis",
        "Process of respiration",
      ],
      correctIndex: 0,
      explanation: "Photosynthesis is the process by which plants use sunlight to produce glucose from carbon dioxide and water.",
      difficulty: "Medium",
      bloomLevel: "Understand",
    },
    {
      question: "What is the function of mitochondria?",
      options: [
        "Produce ATP through cellular respiration",
        "Store genetic information",
        "Synthesize proteins",
        "Package and transport proteins",
      ],
      correctIndex: 0,
      explanation: "Mitochondria are the powerhouse of the cell, producing ATP through cellular respiration.",
      difficulty: "Medium",
      bloomLevel: "Remember",
    },
    {
      question: "Explain the role of ribosomes in protein synthesis.",
      options: [
        "Ribosomes read mRNA and assemble amino acids into proteins",
        "Ribosomes store genetic information",
        "Ribosomes produce energy",
        "Ribosomes transport proteins",
      ],
      correctIndex: 0,
      explanation: "Ribosomes are the molecular machines that translate mRNA into proteins by assembling amino acids.",
      difficulty: "Medium",
      bloomLevel: "Understand",
    },
  ];

  for (const [idx, itemData] of items.entries()) {
    await db.generatedItem.create({
      data: {
        id: `item-local-v7-${idx}`,
        draftSetId: draftSet.id,
        itemType: "mcq",
        bloomLevel: itemData.bloomLevel,
        reviewStatus: "approved",
        payload: JSON.stringify({
          id: `q-local-v7-${idx}`,
          question: itemData.question,
          options: itemData.options,
          correctIndex: itemData.correctIndex,
          explanation: itemData.explanation,
          difficulty: itemData.difficulty,
        }),
      },
    });
  }

  console.log(`✅ Created ${items.length} approved GeneratedItems`);

  // Create a SavedQuiz (approved) with the same questions
  await db.savedQuiz.create({
    data: {
      id: "savedquiz-local-v7",
      userId: user.id,
      topic: "Biology",
      data: JSON.stringify({
        multipleChoice: items.map((item, idx) => ({
          id: `q-local-v7-${idx}`,
          question: item.question,
          options: item.options,
          correctIndex: item.correctIndex,
          explanation: item.explanation,
          difficulty: item.difficulty,
          bloomLevel: item.bloomLevel,
        })),
      }),
      reviewStatus: "approved",
      draftSetId: draftSet.id, // Link to draft set
      createdAt: new Date(),
    },
  });

  console.log("✅ Created approved SavedQuiz linked to draft set");

  // Create StudyConcepts from these items
  const concepts = [
    {
      concept: "biology:photosynthesis",
      originalBloom: 2, // Understand
      currentBloom: 2,
    },
    {
      concept: "biology:mitochondria",
      originalBloom: 1, // Remember
      currentBloom: 2, // Step up to Understand
    },
    {
      concept: "biology:ribosomes",
      originalBloom: 2, // Understand
      currentBloom: 3, // Step up to Apply
    },
  ];

  for (const [idx, conceptData] of concepts.entries()) {
    await db.studyConcept.create({
      data: {
        id: `concept-local-v7-${idx}`,
        userId: user.id,
        concept: conceptData.concept,
        originalBloom: conceptData.originalBloom,
        currentBloom: conceptData.currentBloom,
        correctStreak: 0,
        dueDate: new Date(), // Due now
        sourceQuizId: "savedquiz-local-v7",
        sourceTopic: "Biology",
        cleared: false,
        createdAt: new Date(),
      },
    });
  }

  console.log(`✅ Created ${concepts.length} StudyConcepts (due now)`);

  console.log("\n🎉 Seeding complete!");
  console.log("   User: test@local.dev / test1234");
  console.log("   Run: npm start (with AUTH_SECRET, AUTH_TRUST_HOST, AUTH_URL set)");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
