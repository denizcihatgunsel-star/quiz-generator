import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { detectNewContent, detectGaps } from "@/lib/notes-cleanup";

export const maxDuration = 30;

function getClient() {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
  });
}

const SYSTEM_PROMPT = `You are a notes cleanup assistant. Your job is to reorganize and rephrase user-provided notes to make them clearer and more structured.

STRICT RULES:
1. ONLY reorganize, rephrase, and fix grammar of what's already there
2. NEVER add facts, definitions, examples, numbers, or any new information
3. NEVER fill in gaps or infer missing information
4. Add structure: headings, bullet points, numbered lists where appropriate
5. Merge sentence fragments into complete sentences
6. Fix spelling and grammar errors
7. Make the text more readable and organized

If you notice gaps (undefined terms, missing steps, unclear references), DO NOT fill them in. The system will detect and report gaps separately.

Respond with ONLY the cleaned-up text. No commentary, no markdown code blocks, no explanations.`;

const USER_PROMPT_TEMPLATE = (notes: string) => `
Clean up and reorganize these notes. Remember: only rephrase and restructure what's already here. Do not add any new information.

NOTES:
---
${notes}
---

Provide the cleaned version:`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { notes } = body;

    if (!notes || typeof notes !== "string" || notes.trim().length < 20) {
      return NextResponse.json(
        { error: "Please provide at least 20 characters of notes to clean up." },
        { status: 400 }
      );
    }

    if (notes.length > 15000) {
      return NextResponse.json(
        { error: "Notes are too long. Please limit to 15,000 characters." },
        { status: 400 }
      );
    }

    const client = getClient();
    
    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 4096,
      temperature: 0.3, // Lower temperature for more conservative output
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_PROMPT_TEMPLATE(notes.trim()) },
      ],
    });

    const cleanedNotes = completion.choices[0]?.message?.content?.trim();

    if (!cleanedNotes) {
      return NextResponse.json(
        { error: "Failed to generate cleaned notes. Please try again." },
        { status: 500 }
      );
    }

    // Run post-check to detect if new content was added
    const contentCheck = detectNewContent(notes, cleanedNotes);
    
    // Detect gaps in the original notes
    const gaps = detectGaps(cleanedNotes);

    return NextResponse.json({
      original: notes,
      cleaned: cleanedNotes,
      contentCheck: {
        passed: contentCheck.passedCheck,
        suspiciousSentences: contentCheck.suspiciousSentences,
        suspiciousWords: contentCheck.suspiciousWords,
      },
      gaps,
    });

  } catch (err) {
    console.error("Cleanup error:", err);
    
    let errorMsg = "Cleanup failed. Please try again.";
    
    if (err instanceof OpenAI.AuthenticationError) {
      errorMsg = "Invalid API key.";
    } else if (err instanceof OpenAI.RateLimitError) {
      errorMsg = "Rate limit reached. Please wait a moment and try again.";
    } else if (err instanceof Error) {
      errorMsg = `Cleanup failed: ${err.message}`;
    }

    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
