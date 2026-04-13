import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";
import { getPlan } from "@/lib/subscription";

// GET: List user's API keys
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const keys = await db.apiKey.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      key: true,
      lastUsed: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Mask keys — only show first 8 and last 4 chars
  const masked = keys.map((k) => ({
    ...k,
    key: k.key.slice(0, 8) + "..." + k.key.slice(-4),
  }));

  return NextResponse.json({ keys: masked });
}

// POST: Create a new API key
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check plan — API access requires pro or team
  const subscription = await db.subscription.findUnique({ where: { userId: session.user.id } });
  const plan = getPlan(subscription?.plan ?? "free");

  if (plan.id !== "pro" && plan.id !== "team") {
    return NextResponse.json({ error: "API access requires a Pro or Team plan." }, { status: 403 });
  }

  const { name } = await req.json().catch(() => ({ name: "Default" }));

  // Limit to 5 keys per user
  const count = await db.apiKey.count({ where: { userId: session.user.id } });
  if (count >= 5) {
    return NextResponse.json({ error: "Maximum 5 API keys allowed" }, { status: 400 });
  }

  const key = "exm_" + randomBytes(24).toString("hex");

  const apiKey = await db.apiKey.create({
    data: {
      userId: session.user.id,
      key,
      name: name || "Default",
    },
  });

  // Return full key only on creation — it won't be shown again
  return NextResponse.json({ id: apiKey.id, key, name: apiKey.name });
}

// DELETE: Revoke an API key
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { keyId } = await req.json();
  const apiKey = await db.apiKey.findUnique({ where: { id: keyId } });

  if (!apiKey || apiKey.userId !== session.user.id) {
    return NextResponse.json({ error: "Key not found" }, { status: 404 });
  }

  await db.apiKey.delete({ where: { id: keyId } });
  return NextResponse.json({ success: true });
}
