interface SendResult {
  sent: boolean;
  reason?: "not-configured" | "send-failed";
}

async function sendViaSmtp(to: string, subject: string, html: string): Promise<boolean> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) return false;

  const nodemailer = (await import("nodemailer")).default;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });
  await transporter.sendMail({
    from: `Examina <${smtpUser}>`,
    to,
    subject,
    html,
  });
  return true;
}

async function sendViaResend(to: string, subject: string, html: string): Promise<boolean> {
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
      to: [to],
      subject,
      html,
    }),
  });
  return res.ok;
}

export async function sendEmail(to: string, subject: string, html: string): Promise<SendResult> {
  const configured =
    (process.env.SMTP_USER && process.env.SMTP_PASS) || process.env.RESEND_API_KEY;
  if (!configured) return { sent: false, reason: "not-configured" };

  try {
    const viaSmtp = await sendViaSmtp(to, subject, html);
    if (viaSmtp) return { sent: true };
  } catch (err) {
    console.error("SMTP send failed:", err instanceof Error ? err.message : err);
  }

  try {
    const viaResend = await sendViaResend(to, subject, html);
    if (viaResend) return { sent: true };
  } catch (err) {
    console.error("Resend send failed:", err instanceof Error ? err.message : err);
  }

  return { sent: false, reason: "send-failed" };
}

export function verificationCodeHtml(code: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #FBFBFA; color: #000;">
      <h1 style="font-size: 20px; margin: 0 0 12px;">Verify your email</h1>
      <p style="font-size: 15px; line-height: 1.6; color: #555;">
        Welcome to Examina! Enter this code to verify your account. It expires in 30 minutes.
      </p>
      <div style="margin: 24px 0; text-align: center;">
        <span style="display: inline-block; padding: 14px 32px; background: #3B2027; color: #F6E3E8; font-size: 32px; letter-spacing: 8px; font-weight: bold; border-radius: 12px;">${code}</span>
      </div>
      <p style="font-size: 13px; line-height: 1.6; color: #888;">
        If you didn't create an Examina account, you can safely ignore this email.
      </p>
    </div>
  `;
}