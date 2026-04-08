import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Quiz Generator — Turn Notes into Quizzes | Examina",
  description:
    "Generate quizzes from any text in seconds. AI quiz generator for multiple choice, flashcards, fill-in-the-blank & true/false questions. Free to try.",
  alternates: {
    canonical: "https://www.examina.ink/",
  },
  openGraph: {
    type: "website",
    siteName: "Examina",
    title: "AI Quiz Generator — Turn Notes into Quizzes Instantly",
    description:
      "Paste any lesson and generate multiple choice, flashcards, fill-in-the-blank, and true/false questions in seconds. Free to try.",
    url: "https://www.examina.ink/",
    images: [
      {
        url: "https://www.examina.ink/og-image.png",
        width: 1200,
        height: 630,
        alt: "Examina AI Quiz Generator — generate quizzes from any text",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Quiz Generator — Turn Notes into Quizzes Instantly",
    description:
      "Paste any lesson and generate multiple choice, flashcards, fill-in-the-blank, and true/false questions in seconds.",
    images: ["https://www.examina.ink/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('darkMode');
                  var isDark = stored === 'true';
                  if (isDark) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
        <Analytics />
      </body>
    </html>
  );
}
