import { NextResponse, type NextRequest } from "next/server";

const MOBILE_UA =
  /android|iphone|ipad|ipod|mobile|opera mini|iemobile|blackberry|webos|kindle|silk/i;

const HTML_LOCALES = new Set(["es", "de", "fr", "pt", "tr"]);

function isMobileDevice(request: NextRequest): boolean {
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

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0];
  if (host === "examina.ink") {
    const dest = new URL(
      `https://www.examina.ink${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(dest, 308);
  }

  const { pathname } = request.nextUrl;
  const isMobile = isMobileDevice(request);
  const search = request.nextUrl.search;

  if (pathname === "/m" || pathname.startsWith("/m/")) {
    if (!isMobile) {
      let target = pathname === "/m" || pathname === "/m/create" ? "/" : pathname.replace(/^\/m(?=\/|$)/, "") || "/";
      const url = new URL(target, request.url);
      url.search = search;
      return NextResponse.redirect(url);
    }
    return nextWithHtmlLang(request);
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

  return nextWithHtmlLang(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon\\.ico|.*\\..*).*)"],
};
