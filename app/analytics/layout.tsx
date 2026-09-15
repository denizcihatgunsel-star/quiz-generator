import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | Examina",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}