import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz | Examina",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}