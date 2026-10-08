import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, ensureVerificationColumns } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

// Dummy hash for timing attack mitigation
const DUMMY_HASH = "$2a$12$dummyhashfordummyhashfordummyhashfordummyhashdummyha";

export async function POST(req: NextRequest) {
  try {
    await ensureVerificationColumns();
    const body = await req.json();
    const { email: rawEmail, password } = body;

    // Validate and normalize email
    if (typeof rawEmail !== "string" || !rawEmail) {
      return NextResponse.json({ needsVerification: false }, { status: 200 });
    }
    const email = rawEmail.toLowerCase().trim();

    if (!password) {
      return NextResponse.json({ needsVerification: false }, { status: 200 });
    }

    // Rate limit per IP and per email (10 requests per 15 minutes)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
               req.headers.get("x-real-ip") || 
               "unknown";
    const ipKey = `verif-status:ip:${ip}`;
    const emailKey = `verif-status:email:${email}`;

    if (!checkRateLimit(ipKey, 10, 15 * 60 * 1000)) {
      return NextResponse.json({ needsVerification: false }, { status: 429 });
    }

    if (!checkRateLimit(emailKey, 10, 15 * 60 * 1000)) {
      return NextResponse.json({ needsVerification: false }, { status: 429 });
    }

    const user = await db.user.findUnique({ where: { email } });
    
    // Timing attack mitigation: always run bcrypt even if user doesn't exist
    const hashToCompare = user?.password || DUMMY_HASH;
    const valid = await bcrypt.compare(password, hashToCompare);

    if (!user || !valid) {
      return NextResponse.json({ needsVerification: false }, { status: 200 });
    }

    if (!user.emailVerified) {
      return NextResponse.json({ needsVerification: true }, { status: 200 });
    }

    return NextResponse.json({ needsVerification: false }, { status: 200 });
  } catch (err) {
    console.error("Verification status error:", err);
    return NextResponse.json({ needsVerification: false }, { status: 200 });
  }
}
