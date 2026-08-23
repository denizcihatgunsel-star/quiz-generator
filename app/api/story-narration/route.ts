import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

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

export async function POST(req: NextRequest) {
  try {
    const { lines, language } = await req.json();

    if (!Array.isArray(lines) || lines.length === 0 || lines.length > 14) {
      return NextResponse.json({ error: "Invalid narration lines." }, { status: 400 });
    }
    const clean = lines
      .filter((l): l is string => typeof l === "string")
      .map((l) => l.trim().slice(0, 500))
      .filter(Boolean);
    if (clean.length === 0) {
      return NextResponse.json({ error: "Nothing to narrate." }, { status: 400 });
    }

    const lang2 = typeof language === "string" ? language.slice(0, 2).toLowerCase() : "en";
    const voice = VOICES[lang2] ?? DEFAULT_VOICE;

    // Synthesize in parallel; failed lines come back null and are skipped.
    const results = await Promise.all(clean.map((line) => synthesizeOne(line, voice)));
    const audio = results.map((r) => r ?? "");

    return NextResponse.json({ voice, audio });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Story narration error:", message);
    return NextResponse.json({ error: "Narration generation failed." }, { status: 500 });
  }
}