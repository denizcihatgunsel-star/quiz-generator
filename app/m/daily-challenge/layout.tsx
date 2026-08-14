import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Challenge â€” A New Quiz Every Day | Examina",
  description:
    "Test yourself with a fresh community quiz every day, earn XP, and keep your study streak alive. Free to play.",
  robots: { index: false, follow: false },
};

export default function MobileDailyChallengeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
