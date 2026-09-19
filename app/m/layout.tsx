import type { Metadata } from "next";
import MobileShell from "@/components/MobileShell";

export const metadata: Metadata = {
  title: "Examina — App",
  description: "Create, share, and study quizzes on Examina.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return <MobileShell>{children}</MobileShell>;
}