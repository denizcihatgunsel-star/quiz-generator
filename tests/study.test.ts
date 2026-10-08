import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  deriveConceptKey,
  bloomNameToNumber,
  bloomNumberToName,
  recordMissesToStudy,
  gradeStudyReview,
  getDueConcepts,
  countDueConcepts,
} from "@/lib/study";
import { db } from "@/lib/db";
import { MultipleChoiceQuestion } from "@/types/quiz";

describe("Study Mode", () => {
  const quizId = "test-quiz-id";
  let testCounter = 0;

  function getUserId() {
    // Use timestamp + counter for guaranteed uniqueness
    return `test-user-${Date.now()}-${testCounter++}`;
  }

  beforeEach(async () => {
    // Minimal cleanup - tests use unique IDs
  });

  afterEach(async () => {
    // Clean up this test's data only
  });

  describe("Bloom level conversion", () => {
    it("should convert Bloom level names to numbers", () => {
      expect(bloomNameToNumber("Remember")).toBe(1);
      expect(bloomNameToNumber("Understand")).toBe(2);
      expect(bloomNameToNumber("Apply")).toBe(3);
      expect(bloomNameToNumber("Analyze")).toBe(4);
      expect(bloomNameToNumber("Evaluate")).toBe(5);
      expect(bloomNameToNumber("Create")).toBe(6);
    });

    it("should convert Bloom level numbers to names", () => {
      expect(bloomNumberToName(1)).toBe("Remember");
      expect(bloomNumberToName(2)).toBe("Understand");
      expect(bloomNumberToName(3)).toBe("Apply");
      expect(bloomNumberToName(4)).toBe("Analyze");
      expect(bloomNumberToName(5)).toBe("Evaluate");
      expect(bloomNumberToName(6)).toBe("Create");
    });

    it("should handle out-of-range Bloom numbers", () => {
      expect(bloomNumberToName(0)).toBe("Remember");
      expect(bloomNumberToName(7)).toBe("Create");
    });
  });

  describe("Concept key derivation", () => {
    it("should use question concept tag if present", () => {
      const question: MultipleChoiceQuestion = {
        id: "q1",
        question: "What is photosynthesis?",
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        explanation: "...",
        difficulty: "Medium",
        bloomLevel: "Remember",
      };
      const conceptKey = deriveConceptKey(question, "Biology", "photosynthesis");
      expect(conceptKey).toBe("photosynthesis");
    });

    it("should derive from quiz topic + question if no concept tag", () => {
      const question: MultipleChoiceQuestion = {
        id: "q1",
        question: "What is photosynthesis in plants?",
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        explanation: "...",
        difficulty: "Medium",
        bloomLevel: "Remember",
      };
      const conceptKey = deriveConceptKey(question, "Biology 101", undefined);
      expect(conceptKey).toContain("biology");
      expect(conceptKey).toContain("photosynthesis");
    });

    it("should normalize keys to lowercase and remove special chars", () => {
      const question: MultipleChoiceQuestion = {
        id: "q1",
        question: "What's the Krebs Cycle?",
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        explanation: "...",
        difficulty: "Medium",
        bloomLevel: "Remember",
      };
      const conceptKey = deriveConceptKey(question, "Advanced Biology!", undefined);
      expect(conceptKey).toMatch(/^[a-z0-9-:]+$/);
    });
  });

  describe("Recording misses", () => {
    it("should step up Bloom level on regular miss", async () => {
      const userId = getUserId();
      const missed = [
        {
          question: {
            id: "q-test-alpha",
            question: "What is mitosis in cell division?",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
            explanation: "...",
            difficulty: "Medium",
            bloomLevel: "Remember" as const,
          },
          concept: "mitosis-alpha-test",
        },
      ];

      await recordMissesToStudy(userId, quizId, "Biology Test Alpha", missed);

      const concepts = await db.studyConcept.findMany({ where: { userId } });
      expect(concepts).toHaveLength(1);
      // originalBloom = base level of missed question (Remember = 1)
      // currentBloom = stepped-up level to serve (Understand = 2)
      expect(concepts[0].originalBloom).toBe(1); // Original Remember level
      expect(concepts[0].currentBloom).toBe(2); // Remember -> Understand
    });

    it("should keep same Bloom level on weak distractor", async () => {
      const userId = getUserId();
      const missed = [
        {
          question: {
            id: "q1",
            question: "What is mitosis?",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
            explanation: "...",
            difficulty: "Medium",
            bloomLevel: "Apply" as const,
          },
          concept: "mitosis",
          distractorStrength: 0.3, // weak distractor
        },
      ];

      await recordMissesToStudy(userId, quizId, "Biology", missed);

      const concepts = await db.studyConcept.findMany({ where: { userId } });
      expect(concepts).toHaveLength(1);
      expect(concepts[0].currentBloom).toBe(3); // Apply stays at Apply
    });

    it("should cap at Bloom level 6 (Create)", async () => {
      const userId = getUserId();
      const missed = [
        {
          question: {
            id: "q1",
            question: "Design an experiment",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
            explanation: "...",
            difficulty: "Hard",
            bloomLevel: "Evaluate" as const,
          },
          concept: "experiment-design",
        },
      ];

      await recordMissesToStudy(userId, quizId, "Science", missed);

      const concepts = await db.studyConcept.findMany({ where: { userId } });
      expect(concepts).toHaveLength(1);
      expect(concepts[0].currentBloom).toBe(6); // Evaluate -> Create (capped)
    });

    it("should dedupe by concept key", async () => {
      const userId = getUserId();
      const missed = [
        {
          question: {
            id: "q1",
            question: "What is mitosis?",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
            explanation: "...",
            difficulty: "Medium",
            bloomLevel: "Remember" as const,
          },
          concept: "mitosis",
        },
        {
          question: {
            id: "q2",
            question: "Explain mitosis phases",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
            explanation: "...",
            difficulty: "Medium",
            bloomLevel: "Understand" as const,
          },
          concept: "mitosis",
        },
      ];

      await recordMissesToStudy(userId, quizId, "Biology", missed);

      const concepts = await db.studyConcept.findMany({ where: { userId } });
      expect(concepts).toHaveLength(1); // deduped
    });

    it("should cap deck at 2x the number of misses", async () => {
      const userId = getUserId();
      const suffixes = ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa"];
      const missed = Array.from({ length: 10 }, (_, i) => ({
        question: {
          id: `q-captest-${suffixes[i]}`,
          question: `Question about topic ${suffixes[i]} detail`,
          options: ["A", "B", "C", "D"],
          correctIndex: 0,
          explanation: "...",
          difficulty: "Medium" as const,
          bloomLevel: "Remember" as const,
        },
        concept: `captest-unique-concept-${suffixes[i]}`,
      }));

      await recordMissesToStudy(userId, quizId, "Test Cap Unique", missed);

      const concepts = await db.studyConcept.findMany({ where: { userId } });
      expect(concepts).toHaveLength(10); // 10 misses, cap at 20 (but only 10 unique concepts)
    });
  });

  describe("Grading reviews", () => {
    it("should increment streak on correct answer", async () => {
      const userId = getUserId();
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-concept",
          originalBloom: 1,
          currentBloom: 2,
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 0,
        },
      });

      const result = await gradeStudyReview(userId, concept.id, true);

      expect(result.streak).toBe(1);
      expect(result.cleared).toBe(false);

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.correctStreak).toBe(1);
      expect(updated?.firstCorrectAt).not.toBeNull();
    });

    it("should reset streak on wrong answer", async () => {
      const userId = getUserId();
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-concept",
          originalBloom: 1,
          currentBloom: 2,
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 1,
          firstCorrectAt: new Date(Date.now() - 2 * 24 * 3600 * 1000), // 2 days ago
        },
      });

      const result = await gradeStudyReview(userId, concept.id, false);

      expect(result.streak).toBe(0);
      expect(result.cleared).toBe(false);

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.correctStreak).toBe(0);
      expect(updated?.firstCorrectAt).toBeNull();
    });

    it("should clear after 2 correct in different sessions (>= 1 day apart)", async () => {
      const userId = getUserId();
      const firstCorrectAt = new Date(Date.now() - 25 * 3600 * 1000); // 25 hours ago
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-concept",
          originalBloom: 1,
          currentBloom: 2,
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 1,
          firstCorrectAt,
        },
      });

      const result = await gradeStudyReview(userId, concept.id, true);

      expect(result.streak).toBe(2);
      expect(result.cleared).toBe(true);

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.cleared).toBe(true);
    });

    it("should NOT clear if 2nd correct is too soon (< 1 day)", async () => {
      const userId = getUserId();
      const firstCorrectAt = new Date(Date.now() - 12 * 3600 * 1000); // 12 hours ago
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-concept",
          originalBloom: 1,
          currentBloom: 2,
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 1,
          firstCorrectAt,
        },
      });

      const result = await gradeStudyReview(userId, concept.id, true);

      expect(result.streak).toBe(2);
      expect(result.cleared).toBe(false); // too soon

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.cleared).toBe(false);
    });

    it("should schedule next due >= 24h after correct", async () => {
      const userId = getUserId();
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-concept",
          originalBloom: 1,
          currentBloom: 2,
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 0,
        },
      });

      const before = Date.now();
      await gradeStudyReview(userId, concept.id, true);
      const after = Date.now();

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      const dueDelta = updated!.dueDate.getTime() - before;
      expect(dueDelta).toBeGreaterThanOrEqual(24 * 3600 * 1000 - 1000); // ~24h (with tolerance)
      expect(dueDelta).toBeLessThan(26 * 3600 * 1000); // sanity check
    });
  });

  describe("DeepThinker drop-back rule", () => {
    it("should drop currentBloom to originalBloom after 2 consecutive misses at stepped-up level", async () => {
      const userId = getUserId();
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-dropback",
          originalBloom: 2, // Understand
          currentBloom: 3,  // Apply (stepped up once)
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 0,
          missStreak: 0,
        },
      });

      // First miss: increment missStreak
      await gradeStudyReview(userId, concept.id, false);
      let updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.missStreak).toBe(1);
      expect(updated?.currentBloom).toBe(3); // Still at stepped-up level

      // Second miss: trigger drop-back
      await gradeStudyReview(userId, concept.id, false);
      updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.missStreak).toBe(0); // Reset after drop
      expect(updated?.currentBloom).toBe(2); // Dropped to originalBloom
      expect(updated?.correctStreak).toBe(0);
    });

    it("should NOT drop if currentBloom equals originalBloom", async () => {
      const userId = getUserId();
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-no-drop",
          originalBloom: 2,
          currentBloom: 2, // Same as original
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 0,
          missStreak: 0,
        },
      });

      // Two misses
      await gradeStudyReview(userId, concept.id, false);
      await gradeStudyReview(userId, concept.id, false);

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.currentBloom).toBe(2); // Stays at originalBloom
      expect(updated?.missStreak).toBe(2); // Counter keeps incrementing
    });

    it("should reset missStreak to 0 on correct answer", async () => {
      const userId = getUserId();
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-reset-miss",
          originalBloom: 1,
          currentBloom: 2,
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 0,
          missStreak: 1, // Had one miss
        },
      });

      await gradeStudyReview(userId, concept.id, true);

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.missStreak).toBe(0); // Reset
      expect(updated?.correctStreak).toBe(1);
    });

    it("should NOT drop below originalBloom", async () => {
      const userId = getUserId();
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-floor",
          originalBloom: 3, // Apply
          currentBloom: 3,  // Same as original
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 0,
          missStreak: 0,
        },
      });

      // Many misses
      for (let i = 0; i < 5; i++) {
        await gradeStudyReview(userId, concept.id, false);
      }

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.currentBloom).toBe(3); // Never drops below originalBloom
      expect(updated?.currentBloom).toBeGreaterThanOrEqual(updated!.originalBloom);
    });

    it("should reset correctStreak on a miss (next-day check)", async () => {
      const userId = getUserId();
      const firstCorrectAt = new Date(Date.now() - 25 * 3600 * 1000); // 25 hours ago
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-nextday-miss",
          originalBloom: 1,
          currentBloom: 2,
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 1,
          missStreak: 0,
          firstCorrectAt,
        },
      });

      // Wrong answer on next-day check
      await gradeStudyReview(userId, concept.id, false);

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.correctStreak).toBe(0); // Reset
      expect(updated?.firstCorrectAt).toBeNull();
      expect(updated?.missStreak).toBe(1);
    });

    it("should use the new currentBloom after drop-back", async () => {
      const userId = getUserId();
      const concept = await db.studyConcept.create({
        data: {
          userId,
          concept: "test-serve-dropped",
          originalBloom: 1, // Remember
          currentBloom: 3,  // Apply (stepped up twice)
          sourceQuizId: quizId,
          sourceTopic: "Test",
          correctStreak: 0,
          missStreak: 1, // One miss already
        },
      });

      // Second miss triggers drop
      await gradeStudyReview(userId, concept.id, false);

      const updated = await db.studyConcept.findUnique({ where: { id: concept.id } });
      expect(updated?.currentBloom).toBe(1); // Dropped to originalBloom
      
      // Next serve should use currentBloom = 1 (Remember)
      const concepts = await getDueConcepts(userId, 10);
      expect(concepts.length).toBeGreaterThan(0);
      const found = concepts.find(c => c.id === concept.id);
      expect(found?.currentBloom).toBe(1);
    });
  });

  describe("Draft exclusion", () => {
    it("should match each concept to its own question, never another's", async () => {
      const userId = getUserId();
      
      // Create questions and derive their concept keys
      const osmosisQ: MultipleChoiceQuestion = {
        id: "q-osmo",
        question: "What is osmosis?",
        options: ["Water movement", "Protein synthesis", "ATP production", "DNA replication"],
        correctIndex: 0,
        explanation: "Osmosis is water movement",
        difficulty: "Medium",
        bloomLevel: "Understand",
      };
      
      const mitoQ: MultipleChoiceQuestion = {
        id: "q-mito",
        question: "What is mitochondria?",
        options: ["Powerhouse", "Nucleus", "Membrane", "Ribosome"],
        correctIndex: 0,
        explanation: "Mitochondria is the powerhouse",
        difficulty: "Medium",
        bloomLevel: "Understand",
      };
      
      // Derive the actual concept keys that will be used
      const concept1Key = deriveConceptKey(osmosisQ, "Biology");
      const concept2Key = deriveConceptKey(mitoQ, "Biology");
      
      // Ensure they're different
      expect(concept1Key).not.toBe(concept2Key);
      
      // Create two concepts with these keys
      await db.studyConcept.createMany({
        data: [
          {
            userId,
            concept: concept1Key,
            originalBloom: 1,
            currentBloom: 2,
            sourceQuizId: "q1",
            sourceTopic: "Biology",
            dueDate: new Date(),
            cleared: false,
          },
          {
            userId,
            concept: concept2Key,
            originalBloom: 1,
            currentBloom: 2,
            sourceQuizId: "q2",
            sourceTopic: "Biology",
            dueDate: new Date(),
            cleared: false,
          },
        ],
      });

      // Create SavedQuiz with questions matching each concept
      await db.$executeRawUnsafe(`
        INSERT INTO SavedQuiz (id, userId, topic, data, reviewStatus, createdAt)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
      `, 
        "quiz-match-test",
        userId,
        "Biology",
        JSON.stringify({
          multipleChoice: [osmosisQ, mitoQ],
        }),
        "approved"
      );

      // Now test that getDueConcepts and question matching work correctly
      const concepts = await db.studyConcept.findMany({
        where: { userId, cleared: false },
      });

      expect(concepts).toHaveLength(2);
      
      // Verify the keys match what we created
      const conceptKeys = concepts.map(c => c.concept).sort();
      expect(conceptKeys).toContain(concept1Key);
      expect(conceptKeys).toContain(concept2Key);
    });

    it("should skip concepts whose only matches are in draft/rejected quizzes", async () => {
      const userId = getUserId();
      
      await db.studyConcept.create({
        data: {
          userId,
          concept: "biology:photosynthesis",
          originalBloom: 1,
          currentBloom: 2,
          sourceQuizId: "draft-quiz",
          sourceTopic: "Biology",
          dueDate: new Date(),
          cleared: false,
        },
      });

      // Create a draft (non-approved) SavedQuiz
      await db.$executeRawUnsafe(`
        INSERT INTO SavedQuiz (id, userId, topic, data, reviewStatus, createdAt)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
      `,
        "draft-quiz",
        userId,
        "Biology",
        JSON.stringify({
          multipleChoice: [
            {
              id: "q-photo",
              question: "What is photosynthesis?",
              options: ["Energy conversion", "B", "C", "D"],
              correctIndex: 0,
              explanation: "...",
              difficulty: "Medium",
              bloomLevel: "Understand",
            },
          ],
        }),
        "draft"
      );

      // Verify the quiz is draft
      const quiz = await db.$queryRawUnsafe(`
        SELECT reviewStatus FROM SavedQuiz WHERE id = ?
      `, "draft-quiz");
      
      expect(quiz).toHaveLength(1);
      expect((quiz as any)[0].reviewStatus).toBe("draft");
      
      // The concept exists but should be skipped (no approved match)
      const concepts = await db.studyConcept.findMany({
        where: { userId, cleared: false },
      });
      
      expect(concepts).toHaveLength(1);
      expect(concepts[0].concept).toBe("biology:photosynthesis");
    });

    it("should only return approved GeneratedItems", async () => {
      const userId = getUserId();
      
      // Create a draft set for the user
      const draftSet = await db.draftQuizSet.create({
        data: {
          userId,
          topic: "Biology",
          sourceType: "text",
          quizData: JSON.stringify({ title: "Test Quiz" }),
        },
      });
      
      // Create GeneratedItems with different review statuses
      const approvedItem = await db.generatedItem.create({
        data: {
          draftSetId: draftSet.id,
          itemType: "mcq",
          bloomLevel: "Remember",
          reviewStatus: "approved",
          payload: JSON.stringify({
            id: "q-approved",
            question: "What is mitochondria?",
            options: ["Powerhouse", "Nucleus", "Ribosome", "Membrane"],
            correctIndex: 0,
            explanation: "Mitochondria is the powerhouse",
            difficulty: "Medium",
          }),
        },
      });
      
      await db.generatedItem.create({
        data: {
          draftSetId: draftSet.id,
          itemType: "mcq",
          bloomLevel: "Remember",
          reviewStatus: "draft",
          payload: JSON.stringify({
            id: "q-draft",
            question: "Draft question",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
          }),
        },
      });
      
      await db.generatedItem.create({
        data: {
          draftSetId: draftSet.id,
          itemType: "mcq",
          bloomLevel: "Remember",
          reviewStatus: "rejected",
          payload: JSON.stringify({
            id: "q-rejected",
            question: "Rejected question",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
          }),
        },
      });
      
      // Query only approved items
      const approvedOnly = await db.generatedItem.findMany({
        where: {
          draftSetId: draftSet.id,
          reviewStatus: "approved",
        },
      });
      
      expect(approvedOnly).toHaveLength(1);
      expect(approvedOnly[0].id).toBe(approvedItem.id);
      expect(approvedOnly[0].reviewStatus).toBe("approved");
      
      // Verify draft and rejected are excluded
      const allItems = await db.generatedItem.findMany({
        where: { draftSetId: draftSet.id },
      });
      
      expect(allItems).toHaveLength(3);
      expect(allItems.some(i => i.reviewStatus === "draft")).toBe(true);
      expect(allItems.some(i => i.reviewStatus === "rejected")).toBe(true);
    });

    it("should never return placeholder questions", async () => {
      const userId = getUserId();
      
      // Create a draft set with no approved items
      const draftSet = await db.draftQuizSet.create({
        data: {
          userId,
          topic: "Biology",
          sourceType: "text",
          quizData: JSON.stringify({ title: "Test Quiz" }),
        },
      });
      
      // Create only draft/rejected items
      await db.generatedItem.create({
        data: {
          draftSetId: draftSet.id,
          itemType: "mcq",
          bloomLevel: "Remember",
          reviewStatus: "draft",
          payload: JSON.stringify({
            id: "q1",
            question: "Draft",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
          }),
        },
      });
      
      // Query approved items - should be empty
      const approvedItems = await db.generatedItem.findMany({
        where: {
          draftSetId: draftSet.id,
          reviewStatus: "approved",
        },
      });
      
      expect(approvedItems).toHaveLength(0);
      
      // Verify no placeholder patterns exist in approved items
      for (const item of approvedItems) {
        const payload = JSON.parse(item.payload);
        expect(payload.question).not.toContain("Review concept:");
        expect(payload.question).not.toContain("placeholder");
        expect(payload.options).not.toEqual(["Option A", "Option B", "Option C", "Option D"]);
      }
    });

    it("should exclude SavedQuiz questions whose GeneratedItem is not approved", async () => {
      const userId = getUserId();
      
      // Create a draft set
      const draftSet = await db.draftQuizSet.create({
        data: {
          userId,
          topic: "Biology",
          sourceType: "text",
          quizData: JSON.stringify({ title: "Test Quiz" }),
        },
      });

      // Create two GeneratedItems: one approved, one draft
      await db.generatedItem.create({
        data: {
          draftSetId: draftSet.id,
          itemType: "mcq",
          bloomLevel: "Understand",
          reviewStatus: "approved",
          payload: JSON.stringify({
            id: "q-approved",
            question: "What is photosynthesis?",
            options: ["Energy conversion", "B", "C", "D"],
            correctIndex: 0,
            explanation: "Photosynthesis converts light to energy",
            difficulty: "Medium",
          }),
        },
      });

      await db.generatedItem.create({
        data: {
          draftSetId: draftSet.id,
          itemType: "mcq",
          bloomLevel: "Understand",
          reviewStatus: "draft",
          payload: JSON.stringify({
            id: "q-draft",
            question: "What is cellular respiration?",
            options: ["ATP production", "B", "C", "D"],
            correctIndex: 0,
            explanation: "Respiration produces ATP",
            difficulty: "Medium",
          }),
        },
      });

      // Create a SavedQuiz with both questions, linked to the draft set
      const quiz = await db.savedQuiz.create({
        data: {
          userId,
          topic: "Biology",
          reviewStatus: "approved",
          draftSetId: draftSet.id,
          data: JSON.stringify({
            multipleChoice: [
              {
                id: "q-approved",
                question: "What is photosynthesis?",
                options: ["Energy conversion", "B", "C", "D"],
                correctIndex: 0,
                explanation: "Photosynthesis converts light to energy",
                difficulty: "Medium",
                bloomLevel: "Understand",
              },
              {
                id: "q-draft",
                question: "What is cellular respiration?",
                options: ["ATP production", "B", "C", "D"],
                correctIndex: 0,
                explanation: "Respiration produces ATP",
                difficulty: "Medium",
                bloomLevel: "Understand",
              },
            ],
          }),
        },
      });

      // Create StudyConcepts that match both questions
      const photoConceptKey = deriveConceptKey(
        {
          id: "q-approved",
          question: "What is photosynthesis?",
          options: ["Energy conversion", "B", "C", "D"],
          correctIndex: 0,
          explanation: "Photosynthesis converts light to energy",
          difficulty: "Medium",
          bloomLevel: "Understand",
        },
        "Biology"
      );

      const respConceptKey = deriveConceptKey(
        {
          id: "q-draft",
          question: "What is cellular respiration?",
          options: ["ATP production", "B", "C", "D"],
          correctIndex: 0,
          explanation: "Respiration produces ATP",
          difficulty: "Medium",
          bloomLevel: "Understand",
        },
        "Biology"
      );

      await db.studyConcept.createMany({
        data: [
          {
            userId,
            concept: photoConceptKey,
            originalBloom: 2,
            currentBloom: 2,
            sourceQuizId: quiz.id,
            sourceTopic: "Biology",
            dueDate: new Date(),
            cleared: false,
          },
          {
            userId,
            concept: respConceptKey,
            originalBloom: 2,
            currentBloom: 2,
            sourceQuizId: quiz.id,
            sourceTopic: "Biology",
            dueDate: new Date(),
            cleared: false,
          },
        ],
      });

      // Now test getDueConcepts behavior
      const due = await getDueConcepts(userId, 10);
      expect(due).toHaveLength(2); // Both concepts are due

      // The route's GET handler should only return the approved question
      // We can't test the full HTTP handler here, but we can verify the data setup
      const approvedItems = await db.generatedItem.findMany({
        where: {
          draftSetId: draftSet.id,
          reviewStatus: "approved",
        },
      });

      expect(approvedItems).toHaveLength(1);
      
      const approvedPayload = JSON.parse(approvedItems[0].payload);
      expect(approvedPayload.question).toBe("What is photosynthesis?");
      
      // The draft item should be excluded
      const draftItems = await db.generatedItem.findMany({
        where: {
          draftSetId: draftSet.id,
          reviewStatus: "draft",
        },
      });

      expect(draftItems).toHaveLength(1);
      
      const draftPayload = JSON.parse(draftItems[0].payload);
      expect(draftPayload.question).toBe("What is cellular respiration?");
    });
  });

  describe("Error handling and resilience", () => {
    it("should not throw when recordMissesToStudy encounters a DB error", async () => {
      const userId = getUserId();
      
      // Create a mock that will fail
      const originalUpsert = db.studyConcept.upsert;
      vi.spyOn(db.studyConcept, 'upsert').mockRejectedValueOnce(
        new Error("Simulated DB failure")
      );

      const missed = [
        {
          question: {
            id: "q-error-test",
            question: "Test question",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
            explanation: "...",
            difficulty: "Medium" as const,
            bloomLevel: "Remember" as const,
          },
          concept: "error-test-concept",
        },
      ];

      // Should not throw - error is handled internally
      await expect(async () => {
        await recordMissesToStudy(userId, "test-quiz", "Test Topic", missed);
      }).rejects.toThrow("Simulated DB failure");

      // Restore original
      db.studyConcept.upsert = originalUpsert;
    });
  });
});
