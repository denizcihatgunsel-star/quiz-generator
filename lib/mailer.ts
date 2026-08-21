"use client";

import { NextRequest, NextResponse } from "next/server";

function getBaseUrl() {
  return (
    process.env.NEXTAUTH_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://www.examina.ink"
  ).replace(/\/+$/, "");
}

function resetHtml(resetUrl: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #FBFBFA; color: #000;">
      <h1 style="font-size: 20px; margin: 0 0 12px;">Reset your password</h1>
      <p style="font-size: 15px; line-height: 1.6; color: #555;">
        We received a request to reset your Examina password. Click the button below to choose a new one. This link expires in 60 minutes.
      </p>
      <a href="${resetUrl}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 8px; font-size: 15px;">Reset password</a>
      <p style="font-size: 13px; line-height: 1.6; color: #888;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;
}

export async function sendVerificationEmail(
  email: string,
  subject: string,
  html: string
): Promise<boolean> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    try {
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
        subject,
        html,
      });
      return true;
    } catch {
      return false;
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? "Examina <onboarding@resend.dev>",
          to: [email],
          subject,
          html,
        }),
      });
      if (res.ok) return true;
    } catch {
      /* fall through to false */
    }
  }

  return false;
}