import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Free, Starter, Plus, Pro & Team Plans | Examina",
  description:
    "Simple pricing for every learner. Start free with 5 quizzes a month, or unlock 20, 60, 200, or unlimited quizzes. Cancel anytime.",
  alternates: { canonical: "https://www.examina.ink/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}