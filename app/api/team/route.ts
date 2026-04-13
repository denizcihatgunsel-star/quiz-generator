import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";
import { getPlan } from "@/lib/subscription";

// GET: Get my team info
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { teamId: true, ownedTeam: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // User owns a team
  if (user.ownedTeam) {
    const team = await db.team.findUnique({
      where: { id: user.ownedTeam.id },
      include: {
        members: { select: { id: true, name: true, email: true, role: true } },
      },
    });
    return NextResponse.json({ team, isOwner: true });
  }

  // User is a member
  if (user.teamId) {
    const team = await db.team.findUnique({
      where: { id: user.teamId },
      include: {
        members: { select: { id: true, name: true, email: true, role: true } },
        owner: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json({ team, isOwner: false });
  }

  return NextResponse.json({ team: null });
}

// POST: Create a team (team plan only)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscription = await db.subscription.findUnique({ where: { userId: session.user.id } });
  const plan = getPlan(subscription?.plan ?? "free");

  if (plan.id !== "team") {
    return NextResponse.json({ error: "Team creation requires a Team plan" }, { status: 403 });
  }

  // Check if already owns a team
  const existing = await db.team.findUnique({ where: { ownerId: session.user.id } });
  if (existing) {
    return NextResponse.json({ error: "You already own a team" }, { status: 409 });
  }

  const { name } = await req.json();
  const inviteCode = randomBytes(4).toString("hex");

  const team = await db.team.create({
    data: {
      name: name || "My Team",
      ownerId: session.user.id,
      inviteCode,
      members: { connect: { id: session.user.id } },
    },
  });

  return NextResponse.json({ team });
}

// PATCH: Join a team via invite code
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { inviteCode } = await req.json();
  if (!inviteCode) {
    return NextResponse.json({ error: "Missing invite code" }, { status: 400 });
  }

  const team = await db.team.findUnique({
    where: { inviteCode },
    include: { members: true },
  });

  if (!team) {
    return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });
  }

  if (team.members.length >= 5) {
    return NextResponse.json({ error: "Team is full (max 5 members)" }, { status: 400 });
  }

  // Check if already in a team
  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { teamId: true } });
  if (user?.teamId) {
    return NextResponse.json({ error: "You are already in a team" }, { status: 409 });
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { teamId: team.id },
  });

  return NextResponse.json({ success: true, teamName: team.name });
}
