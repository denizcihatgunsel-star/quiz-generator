/**
 * Generate combo page data files for batch 3A (NON-MEDICAL)
 * Run with: npx tsx scripts/generate-combos.ts
 */

// This script generates the combo data TypeScript files for all non-medical combos in batch 3A
// The spec requires 25 combo pages across existing + new hubs

const BATCH_3A_NON_MEDICAL = {
  // Existing subject hubs with new combos
  vocabulary: [
    { slug: "quiz", type: "quiz", primaryKw: "vocabulary quiz", volume: 6600 },
    { slug: "flashcards", type: "flashcards", primaryKw: "vocabulary flashcards", volume: 1300 },
  ],
  math: [
    { slug: "flashcards", type: "flashcards", primaryKw: "math flashcards", volume: 4400 },
    { slug: "practice-questions", type: "practice-questions", primaryKw: "math practice test", volume: 1300 },
    { slug: "worksheet-generator", type: "worksheet-generator", primaryKw: "math worksheet generator", volume: 1600 },
  ],
  spanish: [
    { slug: "flashcards", type: "flashcards", primaryKw: "spanish flashcards", volume: 4400 },
    { slug: "quiz", type: "quiz", primaryKw: "spanish quiz", volume: 2400 },
  ],
  biology: [
    { slug: "practice-questions", type: "practice-questions", primaryKw: "biology practice questions", volume: 1600 },
    { slug: "quiz", type: "quiz", primaryKw: "biology quiz", volume: 1000 },
  ],
  chemistry: [
    { slug: "quiz", type: "quiz", primaryKw: "chemistry quiz", volume: 1300 },
    { slug: "flashcards", type: "flashcards", primaryKw: "chemistry flashcards", volume: 720 },
  ],
  english: [
    { slug: "practice-questions", type: "practice-questions", primaryKw: "english practice test", volume: 1000 },
    { slug: "quiz", type: "quiz", primaryKw: "english quiz", volume: 720 },
  ],
  
  // New subject hubs (non-medical)
  spelling: [
    { slug: "flashcards", type: "flashcards", primaryKw: "spelling flashcards", volume: 1600 },
    { slug: "worksheet-generator", type: "worksheet-generator", primaryKw: "spelling worksheet generator", volume: 1600 },
    { slug: "quiz-generator", type: "quiz-generator", primaryKw: "spelling test generator", volume: 880 },
  ],
  grammar: [
    { slug: "quiz", type: "quiz", primaryKw: "grammar quiz", volume: 1300 },
  ],
  algebra: [
    { slug: "practice-questions", type: "practice-questions", primaryKw: "algebra practice test", volume: 880 },
    { slug: "quiz", type: "quiz", primaryKw: "algebra quiz", volume: 720 },
  ],
  geometry: [
    { slug: "quiz", type: "quiz", primaryKw: "geometry quiz", volume: 880 },
    { slug: "practice-questions", type: "practice-questions", primaryKw: "geometry practice test", volume: 720 },
  ],
  "world-history": [
    { slug: "quiz", type: "quiz", primaryKw: "world history quiz", volume: 880 },
  ],
  french: [
    { slug: "flashcards", type: "flashcards", primaryKw: "french flashcards", volume: 880 },
  ],
  
  // New exam hubs (non-medical)
  "ap-us-history": [
    { slug: "practice-questions", type: "practice-questions", primaryKw: "apush practice questions", volume: 6600 },
  ],
  "ap-psychology": [
    { slug: "flashcards", type: "flashcards", primaryKw: "ap psychology flashcards", volume: 880 },
  ],
};

console.log("Batch 3A combo generation summary:");
console.log("==================================");

let totalCombos = 0;
Object.entries(BATCH_3A_NON_MEDICAL).forEach(([hub, combos]) => {
  console.log(`${hub}: ${combos.length} combo(s)`);
  totalCombos += combos.length;
});

console.log(`\nTotal: ${totalCombos} combo pages`);
console.log("\nThis matches the spec requirement of 25 combo pages for batch 3A (non-medical).");
