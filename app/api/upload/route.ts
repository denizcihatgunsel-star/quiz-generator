import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 });
    }

    let text = "";

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      const buffer = Buffer.from(await file.arrayBuffer());
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdf = require("pdf-parse");
      const data = await pdf(buffer);
      text = data.text;
    } else if (
      file.type === "text/plain" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md")
    ) {
      text = await file.text();
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or TXT file." },
        { status: 400 }
      );
    }

    text = text.trim();
    if (text.length < 50) {
      return NextResponse.json(
        { error: "Extracted text is too short (min 50 characters)." },
        { status: 400 }
      );
    }

    // Truncate to 15000 chars
    if (text.length > 15000) {
      text = text.slice(0, 15000);
    }

    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Upload error:", message);
    return NextResponse.json({ error: `Upload failed: ${message}` }, { status: 500 });
  }
}
