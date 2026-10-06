import { NextResponse, type NextRequest } from "next/server";

const MOBILE_UA =
  /android|iphone|ipad|ipod|mobile|opera mini|iemobile|blackberry|webos|kindle|silk/i;

const HTML_LOCALES = new Set(["es", "de", "fr", "pt", "tr"]);

/** Known bot/crawler UAs — never force through mobile redirects. */
const BOT_UA =
  /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|applebot|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|anthropic|ccbot|chatgpt|perplexity|ia_archiver/i;

function isBot(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  return BOT_UA.test(ua);
}

function isMobileDevice(request: NextRequest): boolean {
  if (isBot(request)) return false;
  const hint = request.headers.get("sec-ch-ua-mobile");
  if (hint === "?1") return true;
  if (hint === "?0") return false;
  const ua = request.headers.get("user-agent") ?? "";
  return MOBILE_UA.test(ua);
}

const MOBILE_MAP: Record<string, string> = {
  "/": "/m",
  "/dashboard": "/m/dashboard",
  "/explore": "/m/explore",
  "/study": "/m/study",
  "/daily-challenge": "/m/daily-challenge",
  "/settings": "/m/settings",
  "/analytics": "/m/analytics",
  "/pricing": "/m/pricing",
  "/auth/login": "/m/auth/login",
  "/auth/register": "/m/auth/register",
  "/classroom/join": "/m/classroom/join",
};

function htmlLangFromPath(pathname: string): string {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && HTML_LOCALES.has(first) ? first : "en";
}

function nextWithHtmlLang(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-html-lang", htmlLangFromPath(request.nextUrl.pathname));
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}


const MARKETING_EXACT = new Set([
  "/",
  "/pricing",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/blog",
  "/ai-quiz-generator",
  "/free-quiz-generator",
  "/create-a-quiz",
  "/quiz-generator-from-pdf",
  "/quiz-generator-from-text",
  "/study-quiz",
  "/daily-quiz",
  "/notes-to-quiz",
  "/ai-flashcards",
  "/multiple-choice-quiz-maker",
  "/true-false-quiz-generator",
  "/fill-in-the-blank-generator",
  "/for-teachers",
  "/for-students",
  "/classroom/join",
  "/es",
  "/de",
  "/fr",
  "/pt",
  "/tr",
]);

// Auth.js v5 names the session cookie authjs.session-token (prefixed __Secure-
// on https, chunked as .0/.1 when large); NextAuth v4 used next-auth.*. Accept both.
const SESSION_COOKIE_RE = /^(?:__Secure-|__Host-)?(?:authjs|next-auth)\.session-token(?:\.\d+)?$/;

function hasSessionCookie(request: NextRequest): boolean {
  return request.cookies.getAll().some((c) => SESSION_COOKIE_RE.test(c.name));
}

/**
 * Non-secret, JS-readable hint that a session cookie exists (the real one is
 * httpOnly). The inline script in app/layout.tsx uses it to keep / and /m blank
 * until the client session resolves, so the signed-out homepage never paints
 * first for signed-in users. Only touched when it is out of date, so anonymous
 * responses (and their CDN cache headers) are unchanged.
 */
const AUTH_HINT_COOKIE = "examina_auth_hint";

function withAuthHint(request: NextRequest, response: NextResponse): NextResponse {
  const signedIn = hasSessionCookie(request);
  const hinted = request.cookies.get(AUTH_HINT_COOKIE)?.value === "1";
  if (signedIn && !hinted) {
    response.cookies.set(AUTH_HINT_COOKIE, "1", {
      path: "/",
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      maxAge: 60 * 60 * 24 * 30,
    });
  } else if (!signedIn && hinted) {
    response.cookies.set(AUTH_HINT_COOKIE, "", { path: "/", maxAge: 0 });
  }
  return response;
}

function withMarketingCache(request: NextRequest, response: NextResponse): NextResponse {
  const { pathname } = request.nextUrl;
  const isMarketing =
    MARKETING_EXACT.has(pathname) || pathname.startsWith("/blog/");
  if (isMarketing && !hasSessionCookie(request) && request.method === "GET") {
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=600",
    );
  }
  return response;
}

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  if (host === "examina.ink") {
    const dest = new URL(
      `https://www.examina.ink${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(dest, 308);
  }

  const { pathname } = request.nextUrl;
  const search = request.nextUrl.search;

  // Repair broken MCQ strip from old startsWith('/m') bug
  if (pathname === "/ultiple-choice-quiz-maker") {
    const url = new URL("/multiple-choice-quiz-maker", request.url);
    url.search = search;
    return NextResponse.redirect(url, 301);
  }

  const isMobile = isMobileDevice(request);

  // Folder-only /m routes — serve the mobile app shell to ANY client that
  // requests /m/* (including desktop UA at a phone viewport). Previously
  // desktop was bounced to / / /pricing, which made Soft A / Pricing A QA
  // at 390px show the marketing hero instead of Jump Back In + /m/create quiz
  // + /m/pricing decorations. Mobile still maps / → /m via MOBILE_MAP below.
  // NOT startsWith('/m') alone on other branches (would break /multiple-choice-…).
  if (pathname === "/m" || pathname.startsWith("/m/")) {
    return withAuthHint(request, withMarketingCache(request, nextWithHtmlLang(request)));
  }

  if (isMobile) {
    let target: string | null = null;
    if (pathname === "/quiz" || pathname.startsWith("/quiz/")) {
      target = `/m${pathname}`;
    } else if (pathname in MOBILE_MAP) {
      target = MOBILE_MAP[pathname];
    }
    if (target) {
      const url = new URL(target, request.url);
      url.search = search;
      return NextResponse.redirect(url);
    }
  }

  return withAuthHint(request, withMarketingCache(request, nextWithHtmlLang(request)));
}

export const config = {
  // Keep extensioned static assets (sitemap.xml, og-image.png, robots.txt) OUT of middleware
  matcher: ["/((?!api|_next/static|_next/image|images|favicon\\.ico|.*\\..*).*)"],
};
