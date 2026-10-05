import type { Metadata } from "next";
import Link from "next/link";
import LandingPageLayout from "@/components/LandingPageLayout";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <LandingPageLayout>
      <section className="py-32 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h1 className="text-6xl font-medium text-neutral-900 mb-4">404</h1>
          <p className="text-xl text-neutral-500 mb-8">
            This page doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Go to homepage
          </Link>
        </div>
      </section>
    </LandingPageLayout>
  );
}
