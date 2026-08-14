import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join a Classroom Live Quiz â€” Enter Code | Examina",
  description:
    "Enter your classroom game code and play live quizzes hosted by your teacher. No account needed.",
  robots: { index: false, follow: false },
};

export default function MobileJoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
