import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing â€” Free, Starter, Plus, Pro & Team Plans | Examina",
  description:
    "Simple pricing for every learner. Start free with 5 quizzes a month, or unlock 20, 60, 200, or unlimited quizzes. Cancel anytime.",
  robots: { index: false, follow: false },
};

export default function MobilePricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
