import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, ensureVerificationColumns } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await ensureVerificationColumns();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ needsVerification: false }, { status: 200 });
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ needsVerification: false }, { status: 200 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
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
