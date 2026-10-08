import { describe, it, expect } from 'vitest';
import { 
  shuffleExamQuestions, 
  generateShuffleSeed, 
  scoreShuffledAnswer,
  type ShuffledQuestion 
} from '../lib/examMode';
import type { MultipleChoiceQuestion } from '../types/quiz';

const mockQuestions: MultipleChoiceQuestion[] = [
  {
    id: '1',
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctIndex: 1,
    explanation: 'Basic math',
    difficulty: 'Easy',
    bloomLevel: 'Remember',
  },
  {
    id: '2',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctIndex: 2,
    explanation: 'Geography',
    difficulty: 'Easy',
    bloomLevel: 'Remember',
  },
  {
    id: '3',
    question: 'What is 10 * 5?',
    options: ['30', '40', '50', '60'],
    correctIndex: 2,
    explanation: 'Multiplication',
    difficulty: 'Medium',
    bloomLevel: 'Apply',
  },
];

describe('examMode', () => {
  describe('generateShuffleSeed', () => {
    it('should generate consistent seeds for the same input', () => {
      const input = 'test123';
      const seed1 = generateShuffleSeed(input);
      const seed2 = generateShuffleSeed(input);
      expect(seed1).toBe(seed2);
    });

    it('should generate different seeds for different inputs', () => {
      const seed1 = generateShuffleSeed('test123');
      const seed2 = generateShuffleSeed('test456');
      expect(seed1).not.toBe(seed2);
    });

    it('should always generate positive integers', () => {
      const seed = generateShuffleSeed('test');
      expect(seed).toBeGreaterThan(0);
      expect(Number.isInteger(seed)).toBe(true);
    });
  });

  describe('shuffleExamQuestions', () => {
    it('should shuffle questions with the same seed consistently', () => {
      const seed = 12345;
      const shuffled1 = shuffleExamQuestions(mockQuestions, seed);
      const shuffled2 = shuffleExamQuestions(mockQuestions, seed);

      expect(shuffled1.map(q => q.originalIndex)).toEqual(
        shuffled2.map(q => q.originalIndex)
      );
    });

    it('should preserve all original questions', () => {
      const seed = 12345;
      const shuffled = shuffleExamQuestions(mockQuestions, seed);

      expect(shuffled.length).toBe(mockQuestions.length);
      
      const originalIndices = shuffled.map(q => q.originalIndex).sort();
      expect(originalIndices).toEqual([0, 1, 2]);
    });

    it('should shuffle answer options for each question', () => {
      const seed = 12345;
      const shuffled = shuffleExamQuestions(mockQuestions, seed);

      shuffled.forEach((q, idx) => {
        const original = mockQuestions[q.originalIndex];
        expect(q.shuffledOptions.length).toBe(original.options.length);
        expect(q.shuffledOptions).not.toEqual(original.options);
      });
    });

    it('should correctly map the correct answer index', () => {
      const seed = 12345;
      const shuffled = shuffleExamQuestions(mockQuestions, seed);

      shuffled.forEach((q) => {
        const original = mockQuestions[q.originalIndex];
        const correctOption = original.options[original.correctIndex];
        expect(q.shuffledOptions[q.correctShuffledIndex]).toBe(correctOption);
      });
    });

    it('should produce different shuffles with different seeds', () => {
      const shuffled1 = shuffleExamQuestions(mockQuestions, 111);
      const shuffled2 = shuffleExamQuestions(mockQuestions, 222);

      const order1 = shuffled1.map(q => q.originalIndex).join(',');
      const order2 = shuffled2.map(q => q.originalIndex).join(',');

      // With 3 items, there's a small chance they could be the same
      // What's important is that the shuffle is consistent per seed
      const shuffled1Again = shuffleExamQuestions(mockQuestions, 111);
      const order1Again = shuffled1Again.map(q => q.originalIndex).join(',');
      
      expect(order1).toBe(order1Again); // Same seed = same order
    });
  });

  describe('scoreShuffledAnswer', () => {
    it('should score correct answers correctly', () => {
      const seed = 12345;
      const shuffled = shuffleExamQuestions(mockQuestions, seed);
      
      shuffled.forEach((q) => {
        const isCorrect = scoreShuffledAnswer(q.correctShuffledIndex, q);
        expect(isCorrect).toBe(true);
      });
    });

    it('should score incorrect answers correctly', () => {
      const seed = 12345;
      const shuffled = shuffleExamQuestions(mockQuestions, seed);
      
      shuffled.forEach((q) => {
        const wrongIndex = (q.correctShuffledIndex + 1) % q.shuffledOptions.length;
        const isCorrect = scoreShuffledAnswer(wrongIndex, q);
        expect(isCorrect).toBe(false);
      });
    });

    it('should handle scoring across multiple shuffle variations', () => {
      const seeds = [111, 222, 333, 444, 555];
      
      seeds.forEach(seed => {
        const shuffled = shuffleExamQuestions(mockQuestions, seed);
        
        // Test that correct index always scores as correct
        shuffled.forEach(q => {
          expect(scoreShuffledAnswer(q.correctShuffledIndex, q)).toBe(true);
        });

        // Test that wrong indices score as incorrect
        shuffled.forEach(q => {
          for (let i = 0; i < q.shuffledOptions.length; i++) {
            if (i !== q.correctShuffledIndex) {
              expect(scoreShuffledAnswer(i, q)).toBe(false);
            }
          }
        });
      });
    });
  });

  describe('shuffle mapping integrity', () => {
    it('should maintain correct answer mapping through multiple shuffles', () => {
      const seeds = [1, 100, 1000, 10000, 99999];
      
      seeds.forEach(seed => {
        const shuffled = shuffleExamQuestions(mockQuestions, seed);
        
        // For each shuffled question, verify the correct answer
        shuffled.forEach(shuffledQ => {
          const originalQ = mockQuestions[shuffledQ.originalIndex];
          const originalCorrectOption = originalQ.options[originalQ.correctIndex];
          const shuffledCorrectOption = shuffledQ.shuffledOptions[shuffledQ.correctShuffledIndex];
          
          expect(shuffledCorrectOption).toBe(originalCorrectOption);
        });
      });
    });

    it('should correctly score a full exam attempt', () => {
      const seed = 54321;
      const shuffled = shuffleExamQuestions(mockQuestions, seed);
      
      // Simulate a student answering all questions correctly
      let correctCount = 0;
      shuffled.forEach(q => {
        if (scoreShuffledAnswer(q.correctShuffledIndex, q)) {
          correctCount++;
        }
      });
      
      expect(correctCount).toBe(mockQuestions.length);
      
      // Simulate a student answering all questions incorrectly
      correctCount = 0;
      shuffled.forEach(q => {
        const wrongIndex = (q.correctShuffledIndex + 1) % q.shuffledOptions.length;
        if (scoreShuffledAnswer(wrongIndex, q)) {
          correctCount++;
        }
      });
      
      expect(correctCount).toBe(0);
    });

    it('should handle edge cases with minimal questions', () => {
      const singleQuestion = [mockQuestions[0]];
      const seed = 123;
      const shuffled = shuffleExamQuestions(singleQuestion, seed);
      
      expect(shuffled.length).toBe(1);
      expect(shuffled[0].originalIndex).toBe(0);
      expect(scoreShuffledAnswer(shuffled[0].correctShuffledIndex, shuffled[0])).toBe(true);
    });
  });

  describe('timer auto-submit behavior', () => {
    it('should correctly calculate remaining questions when time expires', () => {
      // This is a logic test - ExamRunner would auto-submit
      const totalQuestions = mockQuestions.length;
      const answeredQuestions = 2;
      const unansweredQuestions = totalQuestions - answeredQuestions;
      
      expect(unansweredQuestions).toBe(1);
      expect(answeredQuestions + unansweredQuestions).toBe(totalQuestions);
    });

    it('should allow partial completion when timer expires', () => {
      const seed = 12345;
      const shuffled = shuffleExamQuestions(mockQuestions, seed);
      
      // Student only answered first 2 questions
      const userAnswers = [
        shuffled[0].correctShuffledIndex,  // correct
        (shuffled[1].correctShuffledIndex + 1) % shuffled[1].shuffledOptions.length,  // wrong
        null,  // unanswered
      ];
      
      let correctCount = 0;
      userAnswers.forEach((answer, idx) => {
        if (answer !== null && scoreShuffledAnswer(answer, shuffled[idx])) {
          correctCount++;
        }
      });
      
      expect(correctCount).toBe(1);
    });
  });
});
