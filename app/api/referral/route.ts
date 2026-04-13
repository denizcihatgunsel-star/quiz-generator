import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

const REFERRAL_BONUS = 5; // both referrer and referred get 5 bonus quizzes

// GET: Get my referral code + stats
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { referralCode: true, bonusQuizzes: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Generate referral code if they don't have one
  if (!user.referralCode) {
    const code = randomBytes(4).toString("hex");
    await db.user.update({
      where: { id: session.user.id },
      data: { referralCode: code },
    });
    user = { ...user, referralCode: code };
  }

  // Count how many people they've referred
  const referralCount = await db.user.count({
    where: { referredBy: session.user.id },
  });

  return NextResponse.json({
    referralCode: user.referralCode,
    bonusQuizzes: user.bonusQuizzes,
    referralCount,
    referralLink: `https://www.examina.ink/auth/register?ref=${user.referralCode}`,
  });
}

// POST: Apply a referral code (called during registration)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { referralCode } = await req.json();
  if (!referralCode) {
    return NextResponse.json({ error: "Missing referral code" }, { status: 400 });
  }

  // Check if user already has a referrer
  const currentUser = await db.user.findUnique({
    where: { id: session.user.id },
    select: { referredBy: true },
  });

  if (currentUser?.referredBy) {
    return NextResponse.json({ error: "Already referred" }, { status: 409 });
  }

  // Find the referrer
  const referrer = await db.user.findUnique({
    where: { referralCode },
    select: { id: true },
  });

  if (!referrer) {
    return NextResponse.json({ error: "Invalid referral code" }, { status: 404 });
  }

  if (referrer.id === session.user.id) {
    return NextResponse.json({ error: "Cannot refer yourself" }, { status: 400 });
  }

  // Award both sides
  await db.user.update({
    where: { id: session.user.id },
    data: {
      referredBy: referrer.id,
      bonusQuizzes: { increment: REFERRAL_BONUS },
    },
  });

  await db.user.update({
    where: { id: referrer.id },
    data: {
      bonusQuizzes: { increment: REFERRAL_BONUS },
    },
  });

  return NextResponse.json({ success: true, bonus: REFERRAL_BONUS });
}
