import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

const BLOCKED_HOSTS = /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[::1\])/i;

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/&mdash;/gi, "—")
    .replace(/&ndash;/gi, "–")
    .replace(/&hellip;/gi, "…")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number.parseInt(d, 10)));
}

export function htmlToText(html: string): string {
  return (
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      // Remove non-content blocks entirely
      .replace(
        /<(script|style|noscript|svg|iframe|nav|header|footer|form|aside|button|select)[^>]*>[\s\S]*?<\/\1>/gi,
        " "
      )
      // Block-level closers become newlines
      .replace(/<\/(p|div|h[1-6]|li|tr|section|article|blockquote|table|ul|ol)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<li[^>]*>/gi, "• ")
      // Strip remaining tags
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, (m) => decodeEntities(m))
      .replace(/[ \t]+/g, " ")
      .replace(/\n[ \t]+/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (typeof url !== "string" || !/^https?:\/\/.+\..+/i.test(url.trim())) {
      return NextResponse.json(
        { error: "Please provide a full URL starting with https://" },
        { status: 400 }
      );
    }

    let hostname = "";
    try {
      hostname = new URL(url.trim()).hostname;
    } catch {
      return NextResponse.json({ error: "That doesn't look like a valid URL." }, { status: 400 });
    }
    if (BLOCKED_HOSTS.test(hostname)) {
      return NextResponse.json({ error: "That URL can't be read." }, { status: 400 });
    }

    let res: Response;
    try {
      res = await fetch(url.trim(), {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; ExaminaBot/1.0; +https://www.examina.ink) AppleWebKit/537.36",
          Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5",
          "Accept-Language": "en,*;q=0.5",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(12000),
        cache: "no-store",
      });
    } catch {
      return NextResponse.json(
        { error: "Couldn't reach that page. Check the link and try again." },
        { status: 504 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: `That page returned an error (${res.status}). Try a different link.` },
        { status: 400 }
      );
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!/text\/html|application\/xhtml|text\/plain/i.test(contentType)) {
      return NextResponse.json(
        { error: "Only regular web pages are supported (PDFs and uploads have their own tools)." },
        { status: 400 }
      );
    }

    let html = await res.text();
    if (html.length > 2_000_000) html = html.slice(0, 2_000_000);

    const text = htmlToText(html);
    if (text.length < 200) {
      return NextResponse.json(
        { error: "Couldn't find enough readable text on that page." },
        { status: 400 }
      );
    }

    return NextResponse.json({ text: text.slice(0, 15000), length: Math.min(text.length, 15000) });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Extract URL error:", message);
    return NextResponse.json({ error: "Failed to read that page." }, { status: 500 });
  }
}