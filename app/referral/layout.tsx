import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Program | Examina",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}