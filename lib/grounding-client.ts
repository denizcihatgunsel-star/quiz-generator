/**
 * Client-side helper for applying grounding results to a quiz.
 * 
 * The server streams the quiz JSON, then appends a grounding marker line.
 * This helper splits the response, parses both parts, and applies the filter.
 */

interface GroundingResult {
  keep: number[]; // Indices of MCQ items to keep
  dropped: number;
  warned: boolean;
}

interface QuizData {
  multipleChoice: any[];
  flashcards: any[];
  fillInTheBlank?: any[];
  trueFalse?: any[];
  topic: string;
  grounding?: {
    dropped: number;
    warned: boolean;
  };
  [key: string]: any;
}

/**
 * Parse streamed quiz response that may include grounding metadata.
 * 
 * @param fullText - Complete streamed response from server
 * @returns Parsed quiz with grounding applied
 * @throws Error if parsing fails
 */
export function parseQuizWithGrounding(fullText: string): QuizData {
  const groundingMarker = "__EXAMINA_GROUNDING__:";
  
  if (!fullText.includes(groundingMarker)) {
    // No grounding check was performed, parse as normal
    return JSON.parse(fullText);
  }
  
  // Split on the marker
  const parts = fullText.split(groundingMarker);
  if (parts.length !== 2) {
    throw new Error("Invalid grounding response format");
  }
  
  const quizJson = parts[0].trim();
  const groundingJson = parts[1].trim();
  
  // Parse both parts
  const quiz = JSON.parse(quizJson) as QuizData;
  const grounding = JSON.parse(groundingJson) as GroundingResult;
  
  // Apply the keep list to filter MCQ items
  if (grounding.keep && Array.isArray(quiz.multipleChoice)) {
    const keepSet = new Set(grounding.keep);
    quiz.multipleChoice = quiz.multipleChoice.filter((_, idx) => keepSet.has(idx));
  }
  
  // Attach grounding metadata
  if (grounding.dropped > 0 || grounding.warned) {
    quiz.grounding = {
      dropped: grounding.dropped,
      warned: grounding.warned
    };
  }
  
  return quiz;
}
