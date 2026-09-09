import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Daily Challenge — A New Quiz Every Day | Examina",
    description: "Test yourself with a fresh community quiz every day, earn XP, and keep your study streak alive. Free to play.",
    path: "/daily-challenge",
    noIndex: true,
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="sr-only">
        <h1>Daily Challenge</h1>
        <p>Test yourself with a fresh community quiz every day, earn XP, and keep your study streak alive. Free to play.</p>
      </section>
      {children}
    </>
  );
}
