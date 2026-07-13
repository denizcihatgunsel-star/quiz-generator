import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

async function isAdmin(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;
  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  return user?.role === "admin";
}

// GET: List all users
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await db.user.findMany({
    include: {
      subscription: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    users: users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      plan: u.subscription?.plan ?? "free",
      createdAt: u.createdAt,
    })),
  });
}

// PATCH: Update a user's plan or role
export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, plan, role } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Update role if provided
  if (role === "student" || role === "teacher") {
    await db.user.update({ where: { id: userId }, data: { role } });
  }

  // Update plan if provided
  if (plan) {
    const existing = await db.subscription.findUnique({ where: { userId } });
    if (existing) {
      await db.subscription.update({
        where: { userId },
        data: { plan, status: "active" },
      });
    } else {
      await db.subscription.create({
        data: { userId, plan, status: "active" },
      });
    }
  }

  return NextResponse.json({ success: true });
}
