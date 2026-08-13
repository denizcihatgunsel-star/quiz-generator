import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Community Quizzes — Study Anything | Examina",
  description:
    "Browse quizzes created by students and teachers around the world. Practice biology, history, languages, and more — free.",
  alternates: { canonical: "https://www.examina.ink/explore" },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}