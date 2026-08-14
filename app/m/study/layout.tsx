import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Mode â€” Flashcards on a Schedule | Examina",
  description:
    "Review flashcards on a spaced-repetition schedule so knowledge actually sticks. Built for active recall.",
  robots: { index: false, follow: false },
};

export default function MobileStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
