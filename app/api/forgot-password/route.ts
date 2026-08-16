import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

function getBaseUrl() {
  const base =
    process.env.NEXTAUTH_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://www.examina.ink";
  return base.replace(/\/+$/, "");
}

function resetHtml(resetUrl: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #FBFBFA; color: #000;">
      <h1 style="font-size: 20px; margin: 0 0 12px;">Reset your password</h1>
      <p style="font-size: 15px; line-height: 1.6; color: #555;">
        We received a request to reset your Examina password. Click the button below to choose a new one.
        This link expires in 60 minutes.
      </p>
      <a href="${resetUrl}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 8px; font-size: 15px;">Reset password</a>
      <p style="font-size: 13px; line-height: 1.6; color: #888;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>
  `;
}

async function sendResetEmail(email: string, resetUrl: string) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.sendMail({
      from: `Examina <${smtpUser}>`,
      to: email,
      subject: "Reset your Examina password",
      html: resetHtml(resetUrl),
    });
    return true;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Examina <onboarding@resend.dev>",
      to: [email],
      subject: "Reset your Examina password",
      html: resetHtml(resetUrl),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed (${res.status}): ${body}`);
  }
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { email } });
    if (user) {
      await db.passwordResetToken.deleteMany({ where: { email } });
      const token = crypto.randomBytes(32).toString("hex");
      await db.passwordResetToken.create({
        data: {
          token,
          email,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        },
      });

      const resetUrl = `${getBaseUrl()}/auth/reset-password?token=${token}`;
      const sent = await sendResetEmail(email, resetUrl);

      if (!sent) {
        if (process.env.NODE_ENV !== "production") {
          console.log("Forgot password link:", resetUrl);
          return NextResponse.json({
            ok: true,
            devResetLink: resetUrl,
          });
        }
        throw new Error(
          "Password reset emails are unavailable: no mailer configured. Set SMTP_USER/SMTP_PASS or RESEND_API_KEY."
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Forgot password error:", message);
    return NextResponse.json(
      { error: `Something went wrong: ${message}` },
      { status: 500 }
    );
  }
}
