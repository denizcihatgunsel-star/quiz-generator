import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, ensureVerificationColumns } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

// Dummy hash for timing attack mitigation (60 chars, cost factor 12, same as registration)
// Generated with: bcryptjs.hashSync("examina-dummy-not-a-password", 12)
const DUMMY_HASH = "$2b$12$Kttv1dVF2gpMJbj/t07Ze.Jm4NhqrQD8ZrJ5bcwvDfkCpE5dzsmp.";
if (DUMMY_HASH.length !== 60) throw new Error("DUMMY_HASH must be 60 characters");

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

    // Validate password type
    if (typeof password !== "string" || !password) {
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
