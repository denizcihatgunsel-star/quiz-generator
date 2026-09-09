import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Explore Community Quizzes — Study Anything | Examina",
    description: "Browse quizzes created by students and teachers around the world. Practice biology, history, languages, and more — free.",
    path: "/explore",
    noIndex: true,
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="sr-only">
        <h1>Explore Community Quizzes</h1>
        <p>Browse quizzes created by students and teachers around the world. Practice biology, history, languages, and more — free.</p>
      </section>
      {children}
    </>
  );
}
