import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

const LANG_TO_RELEVANCE: Record<string, string> = {
  English: "en",
  Spanish: "es",
  French: "fr",
  German: "de",
  Italian: "it",
  Portuguese: "pt",
  Dutch: "nl",
  Russian: "ru",
  Chinese: "zh",
  Japanese: "ja",
  Korean: "ko",
  Arabic: "ar",
  Turkish: "tr",
  Hindi: "hi",
  Polish: "pl",
  Swedish: "sv",
  Norwegian: "no",
  Danish: "da",
  Finnish: "fi",
  Greek: "el",
  Czech: "cs",
  Romanian: "ro",
  Hungarian: "hu",
  Vietnamese: "vi",
  Thai: "th",
  Indonesian: "id",
  Malay: "ms",
  Ukrainian: "uk",
  Hebrew: "he",
};

interface VideoResult {
  videoId: string;
  url: string;
  title: string;
  channel: string;
  fallback: false;
}

interface FallbackResult {
  fallback: true;
  searchUrl: string;
}

function fallback(searchQuery: string): FallbackResult {
  return {
    fallback: true,
    searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
  };
}

function getClient() {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
  });
}

async function aiSearchQuery(topic: string, language: string): Promise<string | null> {
  if (!process.env.DEEPSEEK_API_KEY) return null;
  try {
    const client = getClient();
    const res = await client.chat.completions.create({
      model: "deepseek-chat",
      temperature: 0.3,
      max_tokens: 60,
      messages: [
        {
          role: "system",
          content:
            "You convert a study topic into the best single YouTube search query for finding a clear explainer video for students. Reply with ONLY the query text — no quotes, no extra words, max 10 words.",
        },
        {
          role: "user",
          content: `Topic: "${topic}"${language !== "English" ? `\nSearch language: ${language}` : ""}`,
        },
      ],
    });
    const q = res.choices[0]?.message?.content?.trim().replace(/^["']+|["']+$/g, "");
    if (!q || q.length > 120) return null;
    return q;
  } catch {
    return null;
  }
}

async function youtubeSearch(
  query: string,
  relevanceLanguage?: string
): Promise<VideoResult | FallbackResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return fallback(query);

  const searchParams = new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: "3",
    q: query,
    key: apiKey,
  });
  if (relevanceLanguage) searchParams.set("relevanceLanguage", relevanceLanguage);

  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) return fallback(query);

  const data = (await res.json()) as {
    items?: { id: { videoId?: string }; snippet: { title: string; channelTitle: string } }[];
  };
  const items = data.items ?? [];
  if (items.length === 0) return fallback(query);

  const videoIds = items
    .map((i) => i.id.videoId)
    .filter((v): v is string => typeof v === "string" && v.length > 0);
  if (videoIds.length === 0) return fallback(query);

  const statsParams = new URLSearchParams({
    part: "statistics",
    id: videoIds.join(","),
    key: apiKey,
  });
  const statsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?${statsParams.toString()}`, {
    cache: "no-store",
  });
  const viewCounts = new Map<string, number>();
  if (statsRes.ok) {
    const statsData = (await statsRes.json()) as {
      items?: { id: string; statistics?: { viewCount?: string } }[];
    };
    for (const item of statsData.items ?? []) {
      const views = Number.parseInt(item.statistics?.viewCount ?? "0", 10);
      viewCounts.set(item.id, Number.isFinite(views) ? views : 0);
    }
  }

  const best = [...items].sort(
    (a, b) =>
      (viewCounts.get(b.id.videoId ?? "") ?? 0) - (viewCounts.get(a.id.videoId ?? "") ?? 0)
  )[0];

  const videoId = best.id.videoId ?? "";
  if (!videoId) return fallback(query);

  return {
    videoId,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    title: best.snippet.title,
    channel: best.snippet.channelTitle,
    fallback: false,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { topic, language } = await req.json();
    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }

    const cleanTopic = topic.trim().slice(0, 80);
    const lang = typeof language === "string" ? language : "English";
    const query = (await aiSearchQuery(cleanTopic, lang)) ?? cleanTopic;
    const result = await youtubeSearch(query, LANG_TO_RELEVANCE[lang]);

    return NextResponse.json({ query, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Video search error:", message);
    return NextResponse.json({ error: "Video search failed." }, { status: 500 });
  }
}