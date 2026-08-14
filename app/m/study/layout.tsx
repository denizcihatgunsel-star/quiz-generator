import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Mode — Flashcards on a Schedule | Examina",
  description:
    "Review flashcards on a spaced-repetition schedule so knowledge actually sticks. Built for active recall.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.examina.ink/study" },
};

export default function MobileStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
