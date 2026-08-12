import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import ReferralAttribution from "@/components/ReferralAttribution";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Examina — AI Quiz Generator | Turn Notes into Quizzes",
  description:
    "Examina is the AI quiz generator that turns any text into multiple choice, flashcards, fill-in-the-blank & true/false questions in seconds. Free to try.",
  alternates: {
    canonical: "https://www.examina.ink/",
  },
  openGraph: {
    type: "website",
    siteName: "Examina",
    title: "Examina — AI Quiz Generator | Turn Notes into Quizzes Instantly",
    description:
      "Examina turns any lesson into multiple choice, flashcards, fill-in-the-blank, and true/false questions in seconds. Free to try.",
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
    title: "Examina — AI Quiz Generator | Turn Notes into Quizzes Instantly",
    description:
      "Examina turns any lesson into multiple choice, flashcards, fill-in-the-blank, and true/false questions in seconds.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var key = 'examina-theme';
                  var stored = localStorage.getItem(key);
                  if (stored === null) stored = localStorage.getItem('darkMode');
                  var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored === null ? sysDark : (stored === 'dark' || stored === 'true');
                  document.documentElement.classList.toggle('dark', isDark);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SessionProviderWrapper>
            {children}
            <ReferralAttribution />
          </SessionProviderWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
