"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface EssayResponse {
  title: string;
  content: string;
  keyPoints: string[];
  essay?: string;
}

export default function EssayGenerator() {
  const { data: session } = useSession();
  const router = useRouter();
  const [essays, setEssays] = useState<EssayResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    prompt: "",
    instructions: "",
    length: "medium",
    tone: "academic",
    language: "en"
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate/essay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        let data;
        try { data = await res.json(); } catch { data = { error: "Failed to generate essay" }; }
        setError(data.error ?? "Failed to generate essay.");
        return;
      }

      const data = await res.json();
      setEssays([data.essay, ...essays]);

      setFormData({ topic: "", prompt: "", instructions: "", length: "medium", tone: "academic", language: "en" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 text-center">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Sign in to generate essays</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Create high-quality essays on any topic</p>
        <button
          onClick={() => router.push("/auth/login")}
          className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:underline"
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#B0607A] flex items-center justify-center text-white text-xs font-bold">E</span>
          Essay Generator
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="e.g., The Impact of Climate Change"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#B0607A]/40 focus:border-[#B0607A] transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Length</label>
              <select
                value={formData.length}
                onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B0607A]/40 focus:border-[#B0607A] transition"
              >
                <option value="short">Short (500-800 words)</option>
                <option value="medium">Medium (800-1200 words)</option>
                <option value="long">Long (1200-1800 words)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Tone</label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B0607A]/40 focus:border-[#B0607A] transition"
              >
                <option value="academic">Academic</option>
                <option value="professional">Professional</option>
                <option value="creative">Creative</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#B0607A]/40 focus:border-[#B0607A] transition"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Prompt (optional)</label>
            <textarea
              value={formData.prompt}
              onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
              placeholder="Provide additional context, key terms to include, or specific requirements..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Instructions (optional)</label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="e.g., Include citations, structure with intro/body/conclusion, use specific frameworks..."
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !formData.topic.trim()}
            className="w-full py-3 rounded-xl bg-[#3B2027] hover:bg-[#52303B] disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white disabled:text-zinc-400 text-sm font-medium transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              "Generating Essay..."
            ) : (
              "Generate Essay"
            )}
          </button>

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
          )}
        </form>
      </div>

      {essays.length > 0 && (
        <div className="space-y-4">
          {essays.map((essay, index) => (
            <div key={index} className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{essay.title}</h4>
                <button
                  onClick={() => navigator.clipboard.writeText(essay.content)}
                  className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  title="Copy content"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-4">
                <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {essay.content}
                </p>
              </div>

              {essay.keyPoints.length > 0 && (
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-700">
                  <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Key Points:</h5>
                  <ul className="space-y-1">
                    {essay.keyPoints.map((point, idx) => (
                      <li key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B0607A] mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-700">
                <button
                  onClick={() => router.push(`/essay?generated=${encodeURIComponent(essay.content)}&title=${encodeURIComponent(essay.title)}`)}
                  className="px-4 py-2 rounded-lg bg-[#FDE8EC] dark:bg-[#B0607A]/20 text-[#9A4F68] dark:text-[#EE97AE] text-sm font-medium hover:bg-[#F6D5DD] dark:hover:bg-[#B0607A]/30 transition-colors"
                >
                  View Full Essay
                </button>
                <button
                  onClick={() => {
                    const element = document.createElement("a");
                    const file = new Blob([`Title: ${essay.title}\n\n${essay.content}`], { type: "text/plain" });
                    element.href = URL.createObjectURL(file);
                    element.download = `${essay.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
