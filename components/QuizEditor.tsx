"use client";

import { useState } from "react";
import { QuizData } from "@/types/quiz";
import { QUIZ_THEMES, type QuizThemeId } from "@/lib/themes";

interface QuizEditorProps {
  quiz: QuizData;
  quizId: string;
  onSave: (updatedQuiz: QuizData) => void;
  onCancel: () => void;
}

export default function QuizEditor({ quiz, quizId, onSave, onCancel }: QuizEditorProps) {
  const [editedQuiz, setEditedQuiz] = useState<QuizData>(JSON.parse(JSON.stringify(quiz)));
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<"mcq" | "flashcards" | "fillblank" | "truefalse">("mcq");

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/quiz/${quizId}/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: editedQuiz, topic: editedQuiz.topic }),
      });
      if (res.ok) {
        onSave(editedQuiz);
      }
    } catch {
      // silently fail
    }
    setSaving(false);
  };

  const updateMCQ = (index: number, field: string, value: string | number | string[]) => {
    const updated = { ...editedQuiz };
    const q = { ...updated.multipleChoice[index] };
    (q as Record<string, unknown>)[field] = value;
    updated.multipleChoice[index] = q;
    setEditedQuiz(updated);
  };

  const updateFlashcard = (index: number, field: string, value: string) => {
    const updated = { ...editedQuiz };
    const card = { ...updated.flashcards[index] };
    (card as Record<string, unknown>)[field] = value;
    updated.flashcards[index] = card;
    setEditedQuiz(updated);
  };

  const updateFITB = (index: number, field: string, value: string) => {
    const updated = { ...editedQuiz };
    const q = { ...updated.fillInTheBlank[index] };
    (q as Record<string, unknown>)[field] = value;
    updated.fillInTheBlank[index] = q;
    setEditedQuiz(updated);
  };

  const updateTF = (index: number, field: string, value: string | boolean) => {
    const updated = { ...editedQuiz };
    const q = { ...updated.trueFalse[index] };
    (q as Record<string, unknown>)[field] = value;
    updated.trueFalse[index] = q;
    setEditedQuiz(updated);
  };

  const deleteMCQ = (index: number) => {
    const updated = { ...editedQuiz };
    updated.multipleChoice = updated.multipleChoice.filter((_, i) => i !== index);
    setEditedQuiz(updated);
  };

  const deleteFlashcard = (index: number) => {
    const updated = { ...editedQuiz };
    updated.flashcards = updated.flashcards.filter((_, i) => i !== index);
    setEditedQuiz(updated);
  };

  const deleteFITB = (index: number) => {
    const updated = { ...editedQuiz };
    updated.fillInTheBlank = updated.fillInTheBlank.filter((_, i) => i !== index);
    setEditedQuiz(updated);
  };

  const deleteTF = (index: number) => {
    const updated = { ...editedQuiz };
    updated.trueFalse = updated.trueFalse.filter((_, i) => i !== index);
    setEditedQuiz(updated);
  };

  const sections = [
    { id: "mcq" as const, label: "Multiple Choice", count: editedQuiz.multipleChoice.length },
    { id: "flashcards" as const, label: "Flashcards", count: editedQuiz.flashcards.length },
    { id: "fillblank" as const, label: "Fill in Blank", count: editedQuiz.fillInTheBlank.length },
    { id: "truefalse" as const, label: "True/False", count: editedQuiz.trueFalse.length },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-900">Edit Quiz</h3>
          <p className="text-xs text-neutral-400">Edit questions, options, and answers</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 disabled:opacity-60 transition-colors">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Topic */}
      <div>
        <label className="block text-xs text-neutral-400 uppercase tracking-widest mb-1">Topic</label>
        <input
          value={editedQuiz.topic}
          onChange={(e) => setEditedQuiz({ ...editedQuiz, topic: e.target.value })}
          className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
        />
      </div>

      {/* Theme */}
      <div>
        <label className="block text-xs text-neutral-400 uppercase tracking-widest mb-2">Theme</label>
        <div className="flex flex-wrap gap-2">
          {QUIZ_THEMES.map((t) => {
            const active = (editedQuiz.theme ?? "rose") === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setEditedQuiz({ ...editedQuiz, theme: t.id as QuizThemeId })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                  active
                    ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                }`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${t.swatch}, ${t.to})` }}
                />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 p-1 bg-neutral-100 border border-neutral-200 rounded-lg">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeSection === s.id ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {s.label} ({s.count})
          </button>
        ))}
      </div>

      {/* MCQ Editor */}
      {activeSection === "mcq" && (
        <div className="space-y-4">
          {editedQuiz.multipleChoice.map((q, qi) => (
            <div key={q.id} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs text-violet-500 font-bold mt-1">Q{qi + 1}</span>
                <input
                  value={q.question}
                  onChange={(e) => updateMCQ(qi, "question", e.target.value)}
                  className="flex-1 px-2 py-1 rounded-lg border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
                <button onClick={() => deleteMCQ(qi)} className="text-xs text-red-400 hover:text-red-600 shrink-0">Delete</button>
              </div>
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2 pl-6">
                  <button
                    onClick={() => updateMCQ(qi, "correctIndex", oi)}
                    className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all ${
                      q.correctIndex === oi ? "border-emerald-500 bg-emerald-500" : "border-neutral-300 hover:border-emerald-400"
                    }`}
                  />
                  <input
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...q.options];
                      newOpts[oi] = e.target.value;
                      updateMCQ(qi, "options", newOpts);
                    }}
                    className="flex-1 px-2 py-1 rounded-lg border border-neutral-100 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  />
                </div>
              ))}
              <div className="pl-6">
                <input
                  value={q.explanation}
                  onChange={(e) => updateMCQ(qi, "explanation", e.target.value)}
                  placeholder="Explanation..."
                  className="w-full px-2 py-1 rounded-lg border border-neutral-100 text-xs text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flashcard Editor */}
      {activeSection === "flashcards" && (
        <div className="space-y-3">
          {editedQuiz.flashcards.map((card, i) => (
            <div key={card.id} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-violet-500 font-bold">Card {i + 1}</span>
                <button onClick={() => deleteFlashcard(i)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
              </div>
              <input
                value={card.front}
                onChange={(e) => updateFlashcard(i, "front", e.target.value)}
                placeholder="Front (question)"
                className="w-full px-2 py-1 rounded-lg border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
              <input
                value={card.back}
                onChange={(e) => updateFlashcard(i, "back", e.target.value)}
                placeholder="Back (answer)"
                className="w-full px-2 py-1 rounded-lg border border-neutral-100 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
            </div>
          ))}
        </div>
      )}

      {/* Fill in the Blank Editor */}
      {activeSection === "fillblank" && (
        <div className="space-y-3">
          {editedQuiz.fillInTheBlank.map((q, i) => (
            <div key={q.id} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-violet-500 font-bold">Q{i + 1}</span>
                <button onClick={() => deleteFITB(i)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
              </div>
              <input
                value={q.sentence}
                onChange={(e) => updateFITB(i, "sentence", e.target.value)}
                placeholder='Sentence with "___" for blank'
                className="w-full px-2 py-1 rounded-lg border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
              <input
                value={q.answer}
                onChange={(e) => updateFITB(i, "answer", e.target.value)}
                placeholder="Correct answer"
                className="w-full px-2 py-1 rounded-lg border border-neutral-100 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
            </div>
          ))}
        </div>
      )}

      {/* True/False Editor */}
      {activeSection === "truefalse" && (
        <div className="space-y-3">
          {editedQuiz.trueFalse.map((q, i) => (
            <div key={q.id} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-violet-500 font-bold">Q{i + 1}</span>
                <button onClick={() => deleteTF(i)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
              </div>
              <input
                value={q.statement}
                onChange={(e) => updateTF(i, "statement", e.target.value)}
                className="w-full px-2 py-1 rounded-lg border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => updateTF(i, "correct", true)}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    q.correct ? "bg-emerald-50 border border-emerald-300 text-emerald-700" : "border border-neutral-200 text-neutral-500"
                  }`}
                >
                  True
                </button>
                <button
                  onClick={() => updateTF(i, "correct", false)}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    !q.correct ? "bg-red-50 border border-red-300 text-red-700" : "border border-neutral-200 text-neutral-500"
                  }`}
                >
                  False
                </button>
              </div>
              <input
                value={q.explanation}
                onChange={(e) => updateTF(i, "explanation", e.target.value)}
                placeholder="Explanation..."
                className="w-full px-2 py-1 rounded-lg border border-neutral-100 text-xs text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
