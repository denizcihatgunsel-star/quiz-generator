import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  // Intentionally no alternates.canonical — do not point auth pages at the homepage
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
