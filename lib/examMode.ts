import type { MultipleChoiceQuestion } from "@/types/quiz";

/**
 * Seeded shuffle using a simple LCG (Linear Congruential Generator)
 * This ensures the same seed always produces the same shuffle order
 */
function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentSeed = seed;

  // LCG parameters (same as used in Java's Random)
  const a = 1103515245;
  const c = 12345;
  const m = 2 ** 31;

  for (let i = shuffled.length - 1; i > 0; i--) {
    currentSeed = (a * currentSeed + c) % m;
    const j = Math.floor((currentSeed / m) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Generate a seed from attemptId or userId + timestamp
 */
export function generateShuffleSeed(attemptId: string): number {
  let hash = 0;
  for (let i = 0; i < attemptId.length; i++) {
    const char = attemptId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export interface ShuffledQuestion extends MultipleChoiceQuestion {
  originalIndex: number;
  shuffledOptions: string[];
  correctShuffledIndex: number;
}

/**
 * Shuffle questions and their answer options for exam mode
 * Returns shuffled questions with mapping information
 */
export function shuffleExamQuestions(
  questions: MultipleChoiceQuestion[],
  seed: number
): ShuffledQuestion[] {
  // First, shuffle the question order
  const questionsWithIndex = questions.map((q, idx) => ({ ...q, originalIndex: idx }));
  const shuffledQuestions = seededShuffle(questionsWithIndex, seed);

  // Then shuffle each question's options
  return shuffledQuestions.map((q, qIdx) => {
    const optionsWithIndex = q.options.map((opt, idx) => ({ opt, idx }));
    const shuffledOptionsData = seededShuffle(optionsWithIndex, seed + qIdx + 1);
    
    const shuffledOptions = shuffledOptionsData.map(d => d.opt);
    const correctShuffledIndex = shuffledOptionsData.findIndex(d => d.idx === q.correctIndex);

    return {
      ...q,
      shuffledOptions,
      correctShuffledIndex,
    };
  });
}

/**
 * Map user's answer back to the original correct answer for scoring
 */
export function scoreShuffledAnswer(
  userAnswerIndex: number,
  shuffledQuestion: ShuffledQuestion
): boolean {
  return userAnswerIndex === shuffledQuestion.correctShuffledIndex;
}

/**
 * Create the answers JSON structure to store with the attempt
 */
export interface ExamAnswersJson {
  seed: number;
  questionOrder: number[]; // original indices in shuffled order
  optionMappings: Array<{
    originalIndex: number;
    shuffledOptions: number[]; // original option indices in shuffled order
  }>;
}

export function createExamAnswersJson(
  shuffledQuestions: ShuffledQuestion[]
): ExamAnswersJson {
  const seed = generateShuffleSeed(Date.now().toString());
  
  return {
    seed,
    questionOrder: shuffledQuestions.map(q => q.originalIndex),
    optionMappings: shuffledQuestions.map(q => {
      const originalOptionsOrder = q.shuffledOptions.map(shuffledOpt => 
        q.options.indexOf(shuffledOpt)
      );
      return {
        originalIndex: q.originalIndex,
        shuffledOptions: originalOptionsOrder,
      };
    }),
  };
}
