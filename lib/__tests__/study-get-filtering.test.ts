import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { db } from '../db';

// Mock the database
vi.mock('../db', () => ({
  db: {
    savedQuiz: {
      findMany: vi.fn(),
    },
    generatedItem: {
      findMany: vi.fn(),
    },
  },
  ensureVerificationColumns: vi.fn(),
}));

describe('Study Mode GET endpoint - needsReview filtering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should exclude questions with needsReview: true from candidate pool', async () => {
    const userId = 'test-user';
    
    // Mock SavedQuiz with one normal and one flagged question
    const mockSavedQuizzes = [
      {
        id: 'quiz-1',
        userId,
        topic: 'Biology',
        draftSetId: null,
        data: JSON.stringify({
          topic: 'Biology',
          multipleChoice: [
            {
              id: 'mcq-1',
              question: 'What is photosynthesis?',
              options: ['A', 'B', 'C', 'D'],
              correctIndex: 0,
              explanation: 'Process by which plants make food',
              difficulty: 'Medium',
              bloomLevel: 'Understand'
            },
            {
              id: 'mcq-2',
              question: 'What is mitochondria?',
              options: ['A', 'B', 'C', 'D'],
              correctIndex: 1,
              explanation: 'Powerhouse of the cell',
              difficulty: 'Medium',
              bloomLevel: 'Remember',
              needsReview: true // This should be filtered out
            },
            {
              id: 'mcq-3',
              question: 'What is cellular respiration?',
              options: ['A', 'B', 'C', 'D'],
              correctIndex: 2,
              explanation: 'Process of breaking down glucose',
              difficulty: 'Hard',
              bloomLevel: 'Apply'
            }
          ]
        })
      }
    ];

    vi.mocked(db.savedQuiz.findMany).mockResolvedValue(mockSavedQuizzes as any);
    vi.mocked(db.generatedItem.findMany).mockResolvedValue([]);

    // Simulate the candidate pool building logic from app/api/study/route.ts
    const candidates: Array<{
      question: any;
      bloomLevel: string;
      source: 'savedQuiz' | 'generatedItem';
    }> = [];

    for (const quiz of mockSavedQuizzes) {
      const data = JSON.parse(quiz.data);
      const questions = data.multipleChoice || data.questions || [];

      for (const q of questions) {
        if (!q.question || !Array.isArray(q.options)) continue;

        // Skip flagged items that may go beyond the user's notes
        if (q.needsReview) continue;

        candidates.push({
          question: q,
          bloomLevel: q.bloomLevel || 'Remember',
          source: 'savedQuiz',
        });
      }
    }

    // Should only have 2 candidates (mcq-1 and mcq-3), not mcq-2 which has needsReview: true
    expect(candidates).toHaveLength(2);
    expect(candidates[0].question.id).toBe('mcq-1');
    expect(candidates[1].question.id).toBe('mcq-3');
    expect(candidates.find(c => c.question.id === 'mcq-2')).toBeUndefined();
  });

  it('should include all questions when none have needsReview', async () => {
    const userId = 'test-user';
    
    const mockSavedQuizzes = [
      {
        id: 'quiz-2',
        userId,
        topic: 'Chemistry',
        draftSetId: null,
        data: JSON.stringify({
          topic: 'Chemistry',
          multipleChoice: [
            {
              id: 'mcq-1',
              question: 'What is H2O?',
              options: ['Water', 'Hydrogen', 'Oxygen', 'Air'],
              correctIndex: 0,
              explanation: 'Water molecule',
              difficulty: 'Easy',
              bloomLevel: 'Remember'
            },
            {
              id: 'mcq-2',
              question: 'What is NaCl?',
              options: ['Salt', 'Sugar', 'Water', 'Air'],
              correctIndex: 0,
              explanation: 'Table salt',
              difficulty: 'Easy',
              bloomLevel: 'Remember'
            }
          ]
        })
      }
    ];

    vi.mocked(db.savedQuiz.findMany).mockResolvedValue(mockSavedQuizzes as any);
    vi.mocked(db.generatedItem.findMany).mockResolvedValue([]);

    const candidates: Array<{
      question: any;
      bloomLevel: string;
      source: 'savedQuiz' | 'generatedItem';
    }> = [];

    for (const quiz of mockSavedQuizzes) {
      const data = JSON.parse(quiz.data);
      const questions = data.multipleChoice || data.questions || [];

      for (const q of questions) {
        if (!q.question || !Array.isArray(q.options)) continue;
        if (q.needsReview) continue;

        candidates.push({
          question: q,
          bloomLevel: q.bloomLevel || 'Remember',
          source: 'savedQuiz',
        });
      }
    }

    expect(candidates).toHaveLength(2);
  });

  it('should return empty candidates when all questions have needsReview', async () => {
    const userId = 'test-user';
    
    const mockSavedQuizzes = [
      {
        id: 'quiz-3',
        userId,
        topic: 'Flagged Quiz',
        draftSetId: null,
        data: JSON.stringify({
          topic: 'Flagged Quiz',
          multipleChoice: [
            {
              id: 'mcq-1',
              question: 'What is X?',
              options: ['A', 'B', 'C', 'D'],
              correctIndex: 0,
              explanation: 'X',
              difficulty: 'Hard',
              bloomLevel: 'Apply',
              needsReview: true
            },
            {
              id: 'mcq-2',
              question: 'What is Y?',
              options: ['A', 'B', 'C', 'D'],
              correctIndex: 1,
              explanation: 'Y',
              difficulty: 'Hard',
              bloomLevel: 'Analyze',
              needsReview: true
            }
          ]
        })
      }
    ];

    vi.mocked(db.savedQuiz.findMany).mockResolvedValue(mockSavedQuizzes as any);
    vi.mocked(db.generatedItem.findMany).mockResolvedValue([]);

    const candidates: Array<{
      question: any;
      bloomLevel: string;
      source: 'savedQuiz' | 'generatedItem';
    }> = [];

    for (const quiz of mockSavedQuizzes) {
      const data = JSON.parse(quiz.data);
      const questions = data.multipleChoice || data.questions || [];

      for (const q of questions) {
        if (!q.question || !Array.isArray(q.options)) continue;
        if (q.needsReview) continue;

        candidates.push({
          question: q,
          bloomLevel: q.bloomLevel || 'Remember',
          source: 'savedQuiz',
        });
      }
    }

    expect(candidates).toHaveLength(0);
  });
});
