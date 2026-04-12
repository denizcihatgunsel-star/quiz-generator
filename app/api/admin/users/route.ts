import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// Only this email can access admin
const ADMIN_EMAIL = "denizcihatgunsel@gmail.com";

// GET: List all users
export async function GET() {
  const session = await auth();
  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
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
  const session = await auth();
  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
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
