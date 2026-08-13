import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Mode — Flashcards on a Schedule | Examina",
  description:
    "Review flashcards on a spaced-repetition schedule so knowledge actually sticks. Built for active recall.",
  alternates: { canonical: "https://www.examina.ink/study" },
};

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}