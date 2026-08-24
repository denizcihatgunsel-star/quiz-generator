import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { storyTimeline, storyNarration } from "@/lib/storyRenderer";

export const maxDuration = 60;

const DEFAULT_VOICE = "en-US-AndrewNeural";

const VOICES: Record<string, string> = {
  en: "en-US-AndrewNeural",
  tr: "tr-TR-AhmetNeural",
  es: "es-ES-AlvaroNeural",
  fr: "fr-FR-HenriNeural",
  de: "de-DE-ConradNeural",
  it: "it-IT-DiegoNeural",
  pt: "pt-BR-AntonioNeural",
  ru: "ru-RU-DmitryNeural",
  zh: "zh-CN-YunxiNeural",
  ja: "ja-JP-KeitaNeural",
  ko: "ko-KR-InJoonNeural",
  ar: "ar-SA-HamedNeural",
  hi: "hi-IN-MadhurNeural",
  nl: "nl-NL-MaartenNeural",
  pl: "pl-PL-MarekNeural",
  sv: "sv-SE-MattiasNeural",
  no: "nb-NO-FinnNeural",
  da: "da-DK-JeppeNeural",
  fi: "fi-FI-HarriNeural",
  el: "el-GR-NestorasNeural",
  cs: "cs-CZ-AntoninNeural",
  ro: "ro-RO-AlfanNeural",
  hu: "hu-HU-TamasNeural",
  vi: "vi-VN-NamMinhNeural",
  th: "th-TH-NiwatNeural",
  id: "id-ID-ArdiNeural",
  ms: "ms-MY-OsmanNeural",
  uk: "uk-UA-OstapNeural",
  he: "he-IL-AvriNeural",
};

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English", tr: "Turkish", es: "Spanish", fr: "French", de: "German",
  it: "Italian", pt: "Portuguese", ru: "Russian", zh: "Chinese", ja: "Japanese",
  ko: "Korean", ar: "Arabic", hi: "Hindi", nl: "Dutch", pl: "Polish",
  sv: "Swedish", no: "Norwegian", da: "Danish", fi: "Finnish", el: "Greek",
  cs: "Czech", ro: "Romanian", hu: "Hungarian", vi: "Vietnamese", th: "Thai",
  id: "Indonesian", ms: "Malay", uk: "Ukrainian", he: "Hebrew",
};

interface NarrationQuiz {
  topic?: string;
  multipleChoice?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (c: Buffer) => chunks.push(c));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

async function synthesizeOne(text: string, voice: string): Promise<string | null> {
  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(text);
    const buf = await streamToBuffer(audioStream);
    return buf.length > 0 ? buf.toString("base64") : null;
  } catch (err) {
    console.error("TTS line failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

async function aiScript(
  quiz: NarrationQuiz,
  fallbackLines: string[],
  languageName: string
): Promise<string[] | null> {
  if (!process.env.DEEPSEEK_API_KEY) return null;
  try {
    const client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com",
    });

    const qa = (quiz.multipleChoice ?? [])
      .map(
        (q, i) =>
          `${i + 1}. ${q.question}\n   Correct: ${q.options[q.correctIndex] ?? "?"}`
      )
      .join("\n");

    const res = await client.chat.completions.create({
      model: "deepseek-chat",
      temperature: 0.9,
      max_tokens: 900,
      messages: [
        {
          role: "system",
          content:
            "You write voiceover scripts for short quiz teaser videos. You sound like a fun, energetic teacher: playful, encouraging, sometimes teasing. Every script must feel unique to THIS quiz - reference the actual subject matter, react to specific questions (e.g. warn about tricky ones, hype interesting ones), never use filler that could apply to any quiz. Write spoken lines in " +
            languageName +
            ". Rules: return ONLY a JSON array of strings; EXACTLY the same number of lines as the template; keep each line under 28 words; keep each line's role identical to the template line at that position (intro stays intro, question stays that same question, answer reveal stays an answer reveal for the same answer, outro stays outro); never mention letters like 'option B'.",
        },
        {
          role: "user",
          content: `Quiz topic: ${quiz.topic}\n\nQuestions:\n${qa}\n\nTemplate script (${fallbackLines.length} lines, keep roles):\n${fallbackLines
            .map((l, i) => `${i}: ${l}`)
            .join("\n")}`,
        },
      ],
    });

    const raw = res.choices[0]?.message?.content?.trim() ?? "";
    const jsonText = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    const parsed: unknown = JSON.parse(jsonText);
    if (
      Array.isArray(parsed) &&
      parsed.length === fallbackLines.length &&
      parsed.every((l) => typeof l === "string" && l.trim().length > 0)
    ) {
      return parsed.map((l) => String(l).trim().slice(0, 500));
    }
    return null;
  } catch (err) {
    console.error("AI script failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { quiz, language } = await req.json();

    const mq = Array.isArray(quiz?.multipleChoice) ? quiz.multipleChoice.slice(0, 8) : [];
    if (!quiz?.topic || typeof quiz.topic !== "string" || mq.length === 0) {
      return NextResponse.json({ error: "Invalid quiz payload." }, { status: 400 });
    }

    // Timeline-aware fallback script (also defines the line count/roles)
    const timelineQuiz = {
      ...quiz,
      multipleChoice: mq,
      flashcards: [],
      fillInTheBlank: [],
      trueFalse: [],
    };
    const fallbackLines = storyNarration(timelineQuiz).sort((a, b) => a.t - b.t).map((c) => c.text);

    const lang2 = typeof language === "string" ? language.slice(0, 2).toLowerCase() : "en";
    const languageName = LANGUAGE_NAMES[lang2] ?? "English";
    const voice = VOICES[lang2] ?? DEFAULT_VOICE;

    const ai = await aiScript({ topic: quiz.topic, multipleChoice: mq }, fallbackLines, languageName);
    const lines = ai ?? fallbackLines;

    const results = await Promise.all(lines.map((line) => synthesizeOne(line, voice)));
    const audio = results.map((r) => r ?? "");

    return NextResponse.json({ voice, audio, scripted: Boolean(ai) });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Story narration error:", message);
    return NextResponse.json({ error: "Narration generation failed." }, { status: 500 });
  }
}