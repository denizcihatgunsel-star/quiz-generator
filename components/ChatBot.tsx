"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { QuizData } from "@/types/quiz";

interface Message {
  role: "user" | "assistant";
  content: string;
  quiz?: QuizData;
}

interface ChatBotProps {
  onQuizGenerated: (quiz: QuizData) => void;
}

const SUGGESTIONS = [
  "Build me a quiz about solar energy",
  "Create a quiz on World War 2",
  "Make a quiz about photosynthesis",
  "Quiz me on the human digestive system",
];

export default function ChatBot({ onQuizGenerated }: ChatBotProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Examina. Tell me a topic and I'll build you a quiz. Try something like \"Build me a quiz about solar energy\".",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      // Non-streaming error responses (auth, validation, limit)
      if (!res.ok) {
        let data;
        try { data = await res.json(); } catch { data = { error: "Something went wrong." }; }
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong." },
        ]);
        setLoading(false);
        return;
      }

      // Read streamed response
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      // Check for error marker
      const errorMarker = "__EXAMINA_ERROR__:";
      if (fullText.includes(errorMarker)) {
        const errorMsg = fullText.split(errorMarker).pop()?.trim() || "Something went wrong.";
        setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
        setLoading(false);
        return;
      }

      // Parse JSON with truncation recovery
      let data;
      try {
        data = JSON.parse(fullText);
      } catch {
        // Strip markdown wrappers if present
        let fixed = fullText.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
        // Remove trailing incomplete key-value pairs and dangling commas
        fixed = fixed
          .replace(/,\s*"[^"]*"?\s*:?\s*"?[^"]*$/, "")
          .replace(/,\s*\{[^}]*$/, "")
          .replace(/,\s*$/, "");
        // Close any unterminated strings
        const quoteCount = (fixed.match(/(?<!\\)"/g) || []).length;
        if (quoteCount % 2 !== 0) fixed += '"';
        // Close open brackets/braces
        const openBrackets = (fixed.match(/\[/g) || []).length - (fixed.match(/\]/g) || []).length;
        const openBraces = (fixed.match(/\{/g) || []).length - (fixed.match(/\}/g) || []).length;
        for (let i = 0; i < openBrackets; i++) fixed += "]";
        for (let i = 0; i < openBraces; i++) fixed += "}";
        try {
          data = JSON.parse(fixed);
        } catch {
          setMessages((prev) => [...prev, { role: "assistant", content: "The response was too long. Please try a simpler topic." }]);
          setLoading(false);
          return;
        }
      }

      if (data.type === "quiz") {
        if (!Array.isArray(data.fillInTheBlank)) data.fillInTheBlank = [];
        if (!Array.isArray(data.trueFalse)) data.trueFalse = [];
        if (!Array.isArray(data.multipleChoice)) data.multipleChoice = [];
        if (!Array.isArray(data.flashcards)) data.flashcards = [];

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `I've created a quiz about **${data.topic}**! Click the button below to start.`,
            quiz: data,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.text || "I'm not sure how to respond to that." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!session) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-[#F3D5DC] p-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-[#F6DCE5] text-[#B0607A] flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-[#4A3038] mb-1">Sign in to chat with Examina</p>
        <p className="text-xs text-[#9A7280] mb-3">Ask for a quiz on any topic</p>
        <Link href="/auth/login" className="text-sm text-[#B0607A] font-medium hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-[#F3D5DC] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#F6E4EA] flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#3B2027] flex items-center justify-center text-[#F6E3E8] text-xs font-bold">
          E
        </div>
        <div>
          <p className="text-sm font-semibold text-[#4A3038]">Examina AI</p>
          <p className="text-[10px] text-emerald-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-[#3B2027] text-[#F6E3E8] rounded-br-md"
                  : "bg-[#FBEAEE] text-[#4A3038] rounded-bl-md"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.quiz && (
                <button
                  onClick={() => onQuizGenerated(msg.quiz!)}
                  className="mt-2 w-full py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors text-white border border-white/20"
                >
                  Start Quiz →
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#FBEAEE] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#B0607A] animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-[#F3D5DC] text-[#B0607A] hover:bg-[#FDE8EC] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-[#F6E4EA]">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Examina to build you a quiz..."
            disabled={loading}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#F3D5DC] bg-white/80 text-sm text-[#4A3038] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#B0607A]/40 focus:border-[#B0607A] transition disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-[#3B2027] hover:bg-[#52303B] disabled:bg-[#E9D3DA] disabled:text-[#B79AA6] text-[#F6E3E8] text-sm font-medium transition-all disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
