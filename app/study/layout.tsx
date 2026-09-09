import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Study Mode — Flashcards on a Schedule | Examina",
  description:
    "Review flashcards on a spaced-repetition schedule so knowledge actually sticks. Built for active recall.",
  path: "/study",
});

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="sr-only">
        <h1>Study Mode — Flashcards on a Schedule</h1>
        <p>
          Review flashcards on a spaced-repetition schedule so knowledge actually sticks.
          Built for active recall with Examina.
        </p>
      </section>
      {children}
    </>
  );
}
