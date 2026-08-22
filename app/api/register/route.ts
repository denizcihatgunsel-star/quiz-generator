import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, ensureVerificationColumns } from "@/lib/db";
import { getVipPlan } from "@/lib/vip";
import { sendEmail, verificationCodeHtml } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    await ensureVerificationColumns();
    const { name, email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);
    const verificationCode = String(Math.floor(100000 + Math.random() * 900000));

    const user = await db.user.create({
      data: {
        email,
        password: hashed,
        name: name?.trim() || null,
        role: role === "teacher" ? "teacher" : "student",
        verificationCode,
        verificationExpires: new Date(Date.now() + 30 * 60 * 1000),
        subscription: {
          create: { plan: getVipPlan(email), status: "active" },
        },
      },
    });

    const mail = await sendEmail(
      email,
      "Your Examina verification code",
      verificationCodeHtml(verificationCode)
    );

    return NextResponse.json(
      { id: user.id, email: user.email, verificationSent: mail.sent },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Register error:", message, err);
    return NextResponse.json(
      { error: `Registration failed: ${message}` },
      { status: 500 }
    );
  }
}
