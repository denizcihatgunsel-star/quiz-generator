export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface QuizData {
  multipleChoice: MultipleChoiceQuestion[];
  flashcards: Flashcard[];
  topic: string;
}

export type GenerateStatus = "idle" | "loading" | "success" | "error";
