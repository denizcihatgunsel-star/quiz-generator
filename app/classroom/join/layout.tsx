import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Join a Classroom Live Quiz — Enter Code | Examina",
  description: "Enter your classroom game code and play live quizzes hosted by your teacher. No account needed.",
  path: "/classroom/join",
});

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}