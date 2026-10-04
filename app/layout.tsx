import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import ReferralAttribution from "@/components/ReferralAttribution";
import HalloweenLayout from "@/components/seasonal/halloween/HalloweenLayout";
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
  title: {
    template: "%s | Examina",
    default: "Examina — AI Quiz Generator",
  },
  icons: {
    icon: [
      { url: "/logo.png?v=3", type: "image/png" },
      { url: "/favicon.ico?v=3" },
    ],
    apple: [{ url: "/apple-icon.png?v=3" }],
  },
  formatDetection: { telephone: false },
  appleWebApp: {
    capable: true,
    title: "Examina",
    statusBarStyle: "black-translucent",
  },
};

// Check if Halloween theme should be active server-side (by date, not query param)
function getThemeColor(): string {
  if (process.env.NEXT_PUBLIC_SEASONAL_THEME === 'halloween') {
    try {
      const now = new Date();
      const cutoff = new Date('2026-11-01T00:00:00+03:00');
      if (now < cutoff) {
        return '#C2410C'; // Halloween orange
      }
    } catch {
      // Fall through to default
    }
  }
  return '#FDE8EC'; // Normal blush
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: getThemeColor(),
};

export const revalidate = 60;

// Force recompilation
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
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: `${SITE_URL}/`,
                  name: "Examina",
                  alternateName: "Examina AI Quiz Generator",
                  description:
                    "AI quiz generator that turns any text into multiple choice, flashcards, fill-in-the-blank and true/false questions.",
                  inLanguage: "en",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${SITE_URL}/explore?q={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Examina",
                  url: SITE_URL,
                  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
                  description: "AI quiz generator that turns notes and PDFs into quizzes and flashcards",
                  sameAs: [
                    "https://www.indiehackers.com/product/examina",
                    "https://www.saashub.com/examina",
                    "https://peerlist.io/denizcih_dev",
                    "https://sideprojectors.com/project/96481/examina",
                    "https://peerpush.com/p/examina",
                    "https://tinystartups.com/startup/examina",
                    "https://smollaunch.com/products/examina",
                  ],
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <SessionProviderWrapper>
            <HalloweenLayout>
              {children}
              <ReferralAttribution />
            </HalloweenLayout>
          </SessionProviderWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
