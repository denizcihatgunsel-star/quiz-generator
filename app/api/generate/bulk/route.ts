import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/lib/subscription";

export const maxDuration = 120;

// POST: Generate multiple quizzes from a list of topics or a long document split into sections
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check plan — bulk gen requires pro or team
  const subscription = await db.subscription.findUnique({ where: { userId: session.user.id } });
  const plan = getPlan(subscription?.plan ?? "free");

  if (plan.id !== "pro" && plan.id !== "team") {
    return NextResponse.json(
      { error: "Bulk generation requires a Pro or Team plan.", code: "PLAN_REQUIRED" },
      { status: 403 }
    );
  }

  const { topics, language } = await req.json();

  if (!Array.isArray(topics) || topics.length === 0 || topics.length > 10) {
    return NextResponse.json(
      { error: "Provide 1-10 topics as an array of strings." },
      { status: 400 }
    );
  }

  // Generate each quiz by calling the main generate endpoint internally
  const results: Array<{ topic: string; status: string; shareId?: string; error?: string }> = [];

  for (const topic of topics) {
    if (typeof topic !== "string" || topic.trim().length < 50) {
      results.push({ topic: topic?.toString() || "", status: "skipped", error: "Content too short (min 50 chars)" });
      continue;
    }

    try {
      const res = await fetch(new URL("/api/generate", req.url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: req.headers.get("cookie") || "",
        },
        body: JSON.stringify({ lesson: topic.trim(), language: language || "English" }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Generation failed" }));
        results.push({ topic: topic.slice(0, 50) + "...", status: "failed", error: err.error });
        continue;
      }

      // Read streamed response
      const reader = res.body?.getReader();
      if (!reader) {
        results.push({ topic: topic.slice(0, 50) + "...", status: "failed", error: "No response body" });
        continue;
      }

      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      // Parse and save
      let data;
      try {
        data = JSON.parse(fullText);
      } catch {
        results.push({ topic: topic.slice(0, 50) + "...", status: "failed", error: "Failed to parse quiz" });
        continue;
      }

      const { randomBytes } = await import("crypto");
      const shareId = randomBytes(8).toString("hex");

      await db.savedQuiz.create({
        data: {
          userId: session.user.id,
          topic: data.topic || topic.slice(0, 100),
          data: JSON.stringify(data),
          shareId,
        },
      });

      results.push({ topic: data.topic || topic.slice(0, 50), status: "success", shareId });
    } catch (err) {
      results.push({
        topic: topic.slice(0, 50) + "...",
        status: "failed",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return NextResponse.json({
    total: topics.length,
    success: results.filter((r) => r.status === "success").length,
    failed: results.filter((r) => r.status === "failed").length,
    results,
  });
}
