import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — Free, Starter, Plus, Pro & Team Plans | Examina",
  description:
    "Simple pricing for every learner. Start free with 5 quizzes a month, or unlock 20, 60, 200, or unlimited quizzes. Cancel anytime.",
  path: "/pricing",
  ogTitle: "Pricing — Free, Starter, Plus, Pro & Team Plans | Examina",
  ogDescription:
    "Simple pricing for every learner. Start free with 5 quizzes a month, or unlock 20, 60, 200, or unlimited quizzes. Cancel anytime.",
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
