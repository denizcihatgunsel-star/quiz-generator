import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = req.nextUrl.searchParams.get("role");
  if (role === "teacher" || role === "student") {
    await db.user.update({
      where: { id: session.user.id },
      data: { role },
    });
  }

  return NextResponse.redirect(new URL("/", req.url));
}
