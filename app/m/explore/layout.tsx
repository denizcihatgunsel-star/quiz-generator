import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Community Quizzes â€” Study Anything | Examina",
  description:
    "Browse quizzes created by students and teachers around the world. Practice biology, history, languages, and more â€” free.",
  robots: { index: false, follow: false },
};

export default function MobileExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
