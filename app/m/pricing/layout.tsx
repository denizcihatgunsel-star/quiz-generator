import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Examina",
  description: "Simple pricing for every learner. Start free. Cancel anytime.",
  robots: { index: false, follow: false },
};

export default function MPricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
