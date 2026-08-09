import { NextResponse, type NextRequest } from "next/server";

const MOBILE_UA =
  /android|iphone|ipad|ipod|mobile|opera mini|iemobile|blackberry|webos|kindle|silk/i;

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isMobile = isMobileDevice(request);
  const search = request.nextUrl.search;

  if (pathname.startsWith("/m")) {
    if (!isMobile) {
      let target = pathname === "/m" || pathname === "/m/create" ? "/" : pathname.replace(/^\/m/, "") || "/";
      const url = new URL(target, request.url);
      url.search = search;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon\\.ico|.*\\..*).*)"],
};
