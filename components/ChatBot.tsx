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

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong." },
        ]);
        setLoading(false);
        return;
      }

      if (data.type === "quiz") {
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
      <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">Sign in to chat with Examina</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Ask for a quiz on any topic</p>
        <Link href="/auth/login" className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
          E
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Examina AI</p>
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
                  ? "bg-violet-600 text-white rounded-br-md"
                  : "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-bl-md"
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
            <div className="bg-zinc-100 dark:bg-zinc-700 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
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
              className="text-xs px-3 py-1.5 rounded-full border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-700">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Examina to build you a quiz..."
            disabled={loading}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white disabled:text-zinc-400 text-sm font-medium transition-all disabled:cursor-not-allowed"
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
