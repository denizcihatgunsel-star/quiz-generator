import { NextRequest, NextResponse } from "next/server";
import { db, ensureVerificationColumns } from "@/lib/db";
import { sendEmail, verificationCodeHtml } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    await ensureVerificationColumns();
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: "Account already verified." }, { status: 200 });
    }

    // Always issue a fresh code so the emailed code always matches the stored one
    const verificationCode = String(Math.floor(100000 + Math.random() * 900000));
    await db.user.update({
      where: { email },
      data: {
        verificationCode,
        verificationExpires: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    const mail = await sendEmail(
      email,
      "Your Examina verification code",
      verificationCodeHtml(verificationCode)
    );

    return NextResponse.json(
      { sent: mail.sent, message: mail.sent ? "New code sent." : "Could not send email right now." },
      { status: mail.sent ? 200 : 503 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Resend code error:", message);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}