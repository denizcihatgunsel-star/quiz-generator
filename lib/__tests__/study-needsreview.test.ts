import { describe, it, expect, vi, beforeEach } from 'vitest';
import { recordMissesToStudy } from '../study';
import { db } from '../db';
import { MultipleChoiceQuestion } from '@/types/quiz';

// Mock the database
vi.mock('../db', () => ({
  db: {
    studyConcept: {
      upsert: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

describe('Study Mode - needsReview filtering', () => {
  const getUserId = () => `test-user-${Date.now()}-${Math.random()}`;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should exclude items with needsReview: true from being recorded', async () => {
    const userId = getUserId();
    const quizId = 'test-quiz-1';
    const quizTopic = 'Test Topic';

    const normalQuestion: MultipleChoiceQuestion = {
      id: 'mcq-1',
      question: 'What is photosynthesis?',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
      explanation: 'Explanation',
      difficulty: 'Medium',
      bloomLevel: 'Understand'
    };

    const flaggedQuestion: MultipleChoiceQuestion = {
      id: 'mcq-2',
      question: 'What is cellular respiration?',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1,
      explanation: 'Explanation',
      difficulty: 'Medium',
      bloomLevel: 'Understand',
      needsReview: true // Flagged by grounding check
    };

    const missed = [
      { question: normalQuestion },
      { question: flaggedQuestion }
    ];

    const saved = await recordMissesToStudy(userId, quizId, quizTopic, missed);

    // Should only save 1 concept (the normal one, not the flagged one)
    expect(saved).toBe(1);
    
    // Verify db.studyConcept.upsert was called exactly once (for the normal question)
    expect(db.studyConcept.upsert).toHaveBeenCalledTimes(1);
    
    const upsertCall = vi.mocked(db.studyConcept.upsert).mock.calls[0][0];
    expect(upsertCall.where.userId_concept.concept).toContain('photosynthesi'); // Normalized
  });

  it('should record all items when none have needsReview', async () => {
    const userId = getUserId();
    const quizId = 'test-quiz-2';
    const quizTopic = 'Science';

    const question1: MultipleChoiceQuestion = {
      id: 'mcq-1',
      question: 'What is ATP?',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
      explanation: 'Energy',
      difficulty: 'Easy',
      bloomLevel: 'Remember'
    };

    const question2: MultipleChoiceQuestion = {
      id: 'mcq-2',
      question: 'What is DNA?',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1,
      explanation: 'Genetic',
      difficulty: 'Easy',
      bloomLevel: 'Remember'
    };

    const missed = [
      { question: question1 },
      { question: question2 }
    ];

    const saved = await recordMissesToStudy(userId, quizId, quizTopic, missed);

    expect(saved).toBe(2);
    
    // Verify db.studyConcept.upsert was called twice
    expect(db.studyConcept.upsert).toHaveBeenCalledTimes(2);
  });

  it('should return 0 when all items have needsReview', async () => {
    const userId = getUserId();
    const quizId = 'test-quiz-3';
    const quizTopic = 'Flagged Quiz';

    const flaggedQuestion1: MultipleChoiceQuestion = {
      id: 'mcq-1',
      question: 'What is X?',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
      explanation: 'Explanation',
      difficulty: 'Medium',
      bloomLevel: 'Apply',
      needsReview: true
    };

    const flaggedQuestion2: MultipleChoiceQuestion = {
      id: 'mcq-2',
      question: 'What is Y?',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1,
      explanation: 'Explanation',
      difficulty: 'Hard',
      bloomLevel: 'Analyze',
      needsReview: true
    };

    const missed = [
      { question: flaggedQuestion1 },
      { question: flaggedQuestion2 }
    ];

    const saved = await recordMissesToStudy(userId, quizId, quizTopic, missed);

    expect(saved).toBe(0);
    
    // Verify db.studyConcept.upsert was never called
    expect(db.studyConcept.upsert).not.toHaveBeenCalled();
  });
});
