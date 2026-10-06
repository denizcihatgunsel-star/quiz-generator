import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Space_Grotesk, Creepster, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import ReferralAttribution from "@/components/ReferralAttribution";
import HalloweenLayout from "@/components/seasonal/halloween/HalloweenLayout";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { isHalloweenSeason } from "@/lib/seasonal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const creepster = Creepster({
  weight: "400",
  variable: "--font-creepster",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
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
        return '#0A1614'; // Halloween dark teal
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

// Seasonal theme decided on the server (env + date, no cookies, so marketing
// HTML stays static/CDN-cacheable). The first paint is already themed: <body
// data-season> and the stylesheet are in the SSR HTML. The ?halloween=1 / cookie
// preview path and the ?halloween=0 opt-out are applied by the inline scripts
// below before first paint; HalloweenLayout keeps them in sync after hydration.
function seasonInitScript(serverActive: boolean): string {
  return `(function(){try{
    var d=document,h=d.documentElement;
    var q=new URLSearchParams(location.search).get('halloween');
    var ck=/(?:^|;\\s*)seasonal=halloween/.test(d.cookie);
    var on=Date.now()<Date.parse('2026-11-01T00:00:00+03:00')&&q!=='0'&&(q==='1'||ck||${serverActive ? "true" : "false"});
    var l=d.getElementById('halloween-theme-css');
    if(on){if(!l){l=d.createElement('link');l.id='halloween-theme-css';l.rel='stylesheet';l.href='/seasonal/halloween.css';l.setAttribute('blocking','render');d.head.appendChild(l);}else{l.disabled=false;}}
    else if(l){l.disabled=true;}
    h.setAttribute('data-season-init',on?'halloween':'off');
    var p=location.pathname;
    if((p==='/'||p==='/m')&&/(?:^|;\\s*)examina_auth_hint=1/.test(d.cookie)){h.setAttribute('data-auth-pending','');setTimeout(function(){h.removeAttribute('data-auth-pending');},7000);}
  }catch(e){}})();`;
}

const BODY_SEASON_SCRIPT = `(function(){try{var s=document.documentElement.getAttribute('data-season-init'),b=document.body;if(s==='halloween')b.setAttribute('data-season','halloween');else if(s==='off')b.removeAttribute('data-season');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seasonActive = process.env.NEXT_PUBLIC_SEASONAL_THEME === "halloween" && isHalloweenSeason();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${creepster.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/logo.png?v=3" />
        {seasonActive && <link rel="stylesheet" href="/seasonal/halloween.css" id="halloween-theme-css" />}
        <style
          dangerouslySetInnerHTML={{
            // Signed-in visit to / or /m: keep the page blank (theme background only)
            // until the client session resolves, instead of painting the signed-out
            // homepage first. Set by the inline script below; cleared by AuthPendingGate.
            __html: `html[data-auth-pending] body > *{visibility:hidden}`,
          }}
        />
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
        <script dangerouslySetInnerHTML={{ __html: seasonInitScript(seasonActive) }} />
      </head>
      <body
        className="min-h-full flex flex-col"
        data-season={seasonActive ? "halloween" : undefined}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: BODY_SEASON_SCRIPT }} />
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
            <HalloweenLayout serverActive={seasonActive}>
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
