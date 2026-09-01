export type Difficulty = "Easy" | "Medium" | "Hard";
export type BloomLevel = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate";

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
  bloomLevel: BloomLevel;
  bloomRationale?: string;
  distractorStrength?: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  bloomLevel?: BloomLevel;
  bloomRationale?: string;
}

export interface FillInTheBlankQuestion {
  id: string;
  sentence: string;       // sentence with "___" for the blank
  answer: string;         // correct word/phrase
  explanation: string;
  difficulty: Difficulty;
  bloomLevel: BloomLevel;
  bloomRationale?: string;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  correct: boolean;       // true or false
  explanation: string;
  difficulty: Difficulty;
  bloomLevel: BloomLevel;
  bloomRationale?: string;
}

export interface QuizData {
  multipleChoice: MultipleChoiceQuestion[];
  flashcards: Flashcard[];
  fillInTheBlank: FillInTheBlankQuestion[];
  trueFalse: TrueFalseQuestion[];
  topic: string;
  theme?: string; // quiz theme id, default "rose"
  ocrUsed?: boolean;
  sourceConfidence?: number;
}

export type GenerateStatus = "idle" | "loading" | "success" | "error";
