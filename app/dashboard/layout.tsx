import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Examina",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  // Intentionally no alternates.canonical — do not point dashboard at the homepage
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
