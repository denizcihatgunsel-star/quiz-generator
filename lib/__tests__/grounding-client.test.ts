import { describe, it, expect } from 'vitest';
import { parseQuizWithGrounding } from '../grounding-client';

describe('parseQuizWithGrounding', () => {
  it('should parse quiz without grounding marker', () => {
    const fullText = JSON.stringify({
      topic: "Test Topic",
      multipleChoice: [
        { id: "mcq-1", question: "Q1", options: ["A", "B"], correctIndex: 0, explanation: "E1", difficulty: "Easy", bloomLevel: "Remember" },
        { id: "mcq-2", question: "Q2", options: ["C", "D"], correctIndex: 1, explanation: "E2", difficulty: "Medium", bloomLevel: "Understand" }
      ],
      flashcards: [
        { id: "fc-1", front: "F1", back: "B1" }
      ],
      fillInTheBlank: [],
      trueFalse: []
    });
    
    const result = parseQuizWithGrounding(fullText);
    
    expect(result.topic).toBe("Test Topic");
    expect(result.multipleChoice).toHaveLength(2);
    expect(result.grounding).toBeUndefined();
  });

  it('should parse quiz with grounding marker and apply keep list', () => {
    const quizData = {
      topic: "Test Topic",
      multipleChoice: [
        { id: "mcq-1", question: "Q1", options: ["A", "B"], correctIndex: 0, explanation: "E1", difficulty: "Easy", bloomLevel: "Remember" },
        { id: "mcq-2", question: "Q2", options: ["C", "D"], correctIndex: 1, explanation: "E2", difficulty: "Medium", bloomLevel: "Understand" },
        { id: "mcq-3", question: "Q3", options: ["E", "F"], correctIndex: 0, explanation: "E3", difficulty: "Hard", bloomLevel: "Apply" }
      ],
      flashcards: [
        { id: "fc-1", front: "F1", back: "B1" }
      ],
      fillInTheBlank: [],
      trueFalse: []
    };
    
    const groundingData = {
      keep: [0, 2], // Keep items at index 0 and 2, drop index 1
      dropped: 1,
      warned: false
    };
    
    const fullText = JSON.stringify(quizData) + "\n__EXAMINA_GROUNDING__:" + JSON.stringify(groundingData);
    
    const result = parseQuizWithGrounding(fullText);
    
    expect(result.topic).toBe("Test Topic");
    expect(result.multipleChoice).toHaveLength(2);
    expect(result.multipleChoice[0].id).toBe("mcq-1");
    expect(result.multipleChoice[1].id).toBe("mcq-3");
    expect(result.grounding).toEqual({
      dropped: 1,
      warned: false
    });
  });

  it('should handle warned status without drops', () => {
    const quizData = {
      topic: "Test Topic",
      multipleChoice: [
        { id: "mcq-1", question: "Q1", options: ["A", "B"], correctIndex: 0, explanation: "E1", difficulty: "Easy", bloomLevel: "Remember" },
        { id: "mcq-2", question: "Q2", options: ["C", "D"], correctIndex: 1, explanation: "E2", difficulty: "Medium", bloomLevel: "Understand" }
      ],
      flashcards: [],
      fillInTheBlank: [],
      trueFalse: []
    };
    
    const groundingData = {
      keep: [0, 1], // Keep all
      dropped: 0,
      warned: true // But warned
    };
    
    const fullText = JSON.stringify(quizData) + "\n__EXAMINA_GROUNDING__:" + JSON.stringify(groundingData);
    
    const result = parseQuizWithGrounding(fullText);
    
    expect(result.multipleChoice).toHaveLength(2);
    expect(result.grounding).toEqual({
      dropped: 0,
      warned: true
    });
  });

  it('should throw error on invalid format', () => {
    const invalidText = "not json";
    
    expect(() => parseQuizWithGrounding(invalidText)).toThrow();
  });

  it('should throw error on multiple grounding markers', () => {
    const invalidText = '{"topic":"Test"}__EXAMINA_GROUNDING__:{"keep":[]}__EXAMINA_GROUNDING__:{"keep":[]}';
    
    expect(() => parseQuizWithGrounding(invalidText)).toThrow("Invalid grounding response format");
  });

  it('should not add grounding field if neither dropped nor warned', () => {
    const quizData = {
      topic: "Test Topic",
      multipleChoice: [
        { id: "mcq-1", question: "Q1", options: ["A", "B"], correctIndex: 0, explanation: "E1", difficulty: "Easy", bloomLevel: "Remember" }
      ],
      flashcards: [],
      fillInTheBlank: [],
      trueFalse: []
    };
    
    const groundingData = {
      keep: [0],
      dropped: 0,
      warned: false
    };
    
    const fullText = JSON.stringify(quizData) + "\n__EXAMINA_GROUNDING__:" + JSON.stringify(groundingData);
    
    const result = parseQuizWithGrounding(fullText);
    
    expect(result.grounding).toBeUndefined();
  });

  it('should mark flagged items with needsReview in warn path', () => {
    const quizData = {
      topic: "Test Topic",
      multipleChoice: [
        { id: "mcq-1", question: "Q1", options: ["A", "B"], correctIndex: 0, explanation: "E1", difficulty: "Easy", bloomLevel: "Remember" },
        { id: "mcq-2", question: "Q2", options: ["C", "D"], correctIndex: 1, explanation: "E2", difficulty: "Medium", bloomLevel: "Understand" },
        { id: "mcq-3", question: "Q3", options: ["E", "F"], correctIndex: 0, explanation: "E3", difficulty: "Hard", bloomLevel: "Apply" }
      ],
      flashcards: [],
      fillInTheBlank: [],
      trueFalse: []
    };
    
    const groundingData = {
      keep: [0, 1, 2], // Keep all (warn path)
      dropped: 0,
      warned: true,
      flagged: [1, 2] // Items 1 and 2 failed check
    };
    
    const fullText = JSON.stringify(quizData) + "\n__EXAMINA_GROUNDING__:" + JSON.stringify(groundingData);
    
    const result = parseQuizWithGrounding(fullText);
    
    expect(result.multipleChoice).toHaveLength(3);
    expect(result.multipleChoice[0].needsReview).toBeUndefined();
    expect(result.multipleChoice[1].needsReview).toBe(true);
    expect(result.multipleChoice[2].needsReview).toBe(true);
    expect(result.grounding).toEqual({
      dropped: 0,
      warned: true
    });
  });
});
