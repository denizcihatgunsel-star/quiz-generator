import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import ReferralAttribution from "@/components/ReferralAttribution";
import { pageMetadata, SITE_URL } from "@/lib/seo";
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
  ...pageMetadata({
    title: "Examina — AI Quiz Generator | Turn Notes into Quizzes",
    description:
      "Examina is the AI quiz generator that turns any text into multiple choice, flashcards, fill-in-the-blank & true/false questions in seconds. Free to try.",
    path: "/",
    ogTitle: "Examina — AI Quiz Generator | Turn Notes into Quizzes Instantly",
    ogDescription:
      "Examina turns any lesson into multiple choice, flashcards, fill-in-the-blank, and true/false questions in seconds. Free to try.",
    languages: true,
  }),
  icons: {
    icon: [
      { url: "/logo.png?v=3", type: "image/png" },
      { url: "/favicon.ico?v=3" },
    ],
    apple: [{ url: "/apple-icon.png?v=3" }],
  },
  metadataBase: new URL(SITE_URL),
  formatDetection: { telephone: false },
  appleWebApp: {
    capable: true,
    title: "Examina",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDE8EC",
};

export const revalidate = 60;

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
        <link rel="icon" href="/logo.png?v=3" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: "Examina",
              alternateName: "Examina AI Quiz Generator",
              description:
                "AI quiz generator that turns any text into multiple choice, flashcards, fill-in-the-blank and true/false questions.",
              inLanguage: "en",
              publisher: {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "Examina",
                logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/explore?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
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
