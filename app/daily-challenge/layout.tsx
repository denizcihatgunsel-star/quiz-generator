import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Challenge — A New Quiz Every Day | Examina",
  description:
    "Test yourself with a fresh community quiz every day, earn XP, and keep your study streak alive. Free to play.",
  alternates: { canonical: "https://www.examina.ink/daily-challenge" },
};

export default function DailyChallengeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}