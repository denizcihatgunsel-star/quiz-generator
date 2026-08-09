import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { unlockAchievement } from "@/lib/achievements";

// GET: List public quizzes
export async function GET(req: NextRequest) {
  const rawPage = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const search = req.nextUrl.searchParams.get("q") || "";
  const limit = 20;
  const offset = (page - 1) * limit;

  const where: Record<string, unknown> = { isPublic: true };
  if (search) {
    where.topic = { contains: search };
  }

  const [quizzes, total] = await Promise.all([
    db.savedQuiz.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
      include: {
        user: { select: { name: true } },
      },
    }),
    db.savedQuiz.count({ where }),
  ]);

  return NextResponse.json({
    quizzes: quizzes.flatMap((q) => {
      let data: Record<string, unknown> = {};
      try {
        data = JSON.parse(q.data);
      } catch {
        return []; // skip corrupted quizzes
      }
      const questions = data.multipleChoice as unknown[] | undefined;
      const flashcards = data.flashcards as unknown[] | undefined;
      const fillInTheBlank = data.fillInTheBlank as unknown[] | undefined;
      const trueFalse = data.trueFalse as unknown[] | undefined;

      return [
        {
          id: q.id,
          topic: q.topic,
          shareId: q.shareId,
          author: q.user.name || "Anonymous",
          questionCount:
            (questions?.length || 0) +
            (flashcards?.length || 0) +
            (fillInTheBlank?.length || 0) +
            (trueFalse?.length || 0),
          createdAt: q.createdAt,
        },
      ];
    }),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

// PATCH: Toggle public/private on a quiz
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quizId, isPublic } = await req.json();

  const quiz = await db.savedQuiz.findUnique({ where: { id: quizId } });
  if (!quiz || quiz.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.savedQuiz.update({
    where: { id: quizId },
    data: { isPublic: !!isPublic },
  });

  if (isPublic && !quiz.isPublic) {
    await unlockAchievement(session.user.id, "first_publish");
  }

  return NextResponse.json({ success: true, isPublic: !!isPublic });
}
