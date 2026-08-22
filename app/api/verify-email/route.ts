import { NextRequest, NextResponse } from "next/server";
import { db, ensureVerificationColumns } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await ensureVerificationColumns();
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required." }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Already verified
    if (user.emailVerified) {
      return NextResponse.json({ message: "Account already verified." }, { status: 200 });
    }

    // Check code and expiry
    if (user.verificationCode !== code) {
      return NextResponse.json({ error: "Invalid or expired code." }, { status: 400 });
    }

    if (user.verificationExpires && new Date() > user.verificationExpires) {
      return NextResponse.json({ error: "Verification code has expired." }, { status: 400 });
    }

    // Mark as verified and clear codes
    await db.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        verificationCode: null,
        verificationExpires: null,
      },
    });

    return NextResponse.json({ message: "Email verified successfully." }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Verify email error:", message);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}