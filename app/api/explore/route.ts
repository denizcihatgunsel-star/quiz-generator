import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

// GET: List public quizzes
export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
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
    quizzes: quizzes.map((q) => {
      const data = JSON.parse(q.data);
      const questionCount =
        (data.multipleChoice?.length || 0) +
        (data.flashcards?.length || 0) +
        (data.fillInTheBlank?.length || 0) +
        (data.trueFalse?.length || 0);

      return {
        id: q.id,
        topic: q.topic,
        shareId: q.shareId,
        author: q.user.name || "Anonymous",
        questionCount,
        createdAt: q.createdAt,
      };
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

  return NextResponse.json({ success: true, isPublic: !!isPublic });
}
