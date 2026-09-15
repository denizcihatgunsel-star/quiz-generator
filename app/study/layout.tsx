import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Study Mode — Flashcards on a Schedule | Examina",
  description:
    "Review flashcards on a spaced-repetition schedule so knowledge actually sticks. Built for active recall.",
  path: "/study",
  noIndex: true,
});

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="sr-only">
        <p>
          Review flashcards on a spaced-repetition schedule so knowledge actually sticks.
          Built for active recall with Examina.
        </p>
      </section>
      {children}
    </>
  );
}
