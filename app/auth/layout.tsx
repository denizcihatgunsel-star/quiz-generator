import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In or Create an Account",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
