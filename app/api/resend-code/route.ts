import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // If already verified, no need to resend
    if (user.emailVerified) {
      return NextResponse.json({ message: "Account already verified." }, { status: 200 });
    }

    // Allow resend if no code exists, or if the old code has expired (more than 30 min ago)
    const isExpired = user.verificationExpires && new Date() > user.verificationExpires;
    const hasCode = user.verificationCode && !isExpired;

    if (!hasCode) {
      // Generate new code
      const newCode = String(Math.floor(100000 + Math.random() * 900000));
      const newExpires = new Date(Date.now() + 30 * 60 * 1000);
      await db.user.update({
        where: { email },
        data: {
          verificationCode: newCode,
          verificationExpires: newExpires,
        },
      });
    }

    // Send new verification email (best-effort)
    const { sendVerificationEmail } = await import("@/lib/mailer");
    const sent = await sendVerificationEmail(
      email,
      "Your new Examina verification code",
      `Your new verification code is ${hasCode ? "the previous code" : String(Math.floor(100000 + Math.random() * 900000))}. It expires in 30 minutes.`
    );

    return NextResponse.json({ sent, message: hasCode ? "Code refreshed." : "New code sent." });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Resend code error:", message);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}