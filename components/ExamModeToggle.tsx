"use client";

import { useState } from "react";

interface ExamModeToggleProps {
  quizId: string;
  initialEnabled: boolean;
  initialTimeLimit?: number | null;
  onUpdate?: () => void;
}

export default function ExamModeToggle({ 
  quizId, 
  initialEnabled, 
  initialTimeLimit,
  onUpdate 
}: ExamModeToggleProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [timeLimit, setTimeLimit] = useState<number | null>(initialTimeLimit ?? null);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/quiz/${quizId}/exam-mode`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          examModeEnabled: enabled,
          examTimeLimit: timeLimit && timeLimit > 0 ? timeLimit : null,
        }),
      });
      
      if (res.ok) {
        onUpdate?.();
      }
    } catch (err) {
      console.error("Failed to update exam mode:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50">
            <svg className="h-5 w-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Exam Mode</h3>
            <p className="text-xs text-neutral-500">
              {enabled ? `Enabled${timeLimit ? ` · ${Math.floor(timeLimit / 60)} min` : ''}` : 'Off'}
            </p>
          </div>
        </div>
        <svg 
          className={`h-5 w-5 text-neutral-400 transition-transform ${expanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-5 space-y-4 border-t border-neutral-100 pt-5">
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-violet-600 focus:ring-violet-500"
              />
              <span className="text-sm text-neutral-700">Enable exam mode for this quiz</span>
            </label>

            {enabled && (
              <div className="ml-7 space-y-3 rounded-lg bg-neutral-50 p-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-neutral-700">
                    Time Limit (optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="300"
                      value={timeLimit ?? ''}
                      onChange={(e) => setTimeLimit(e.target.value ? parseInt(e.target.value) * 60 : null)}
                      placeholder="Minutes"
                      className="w-24 rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                    <span className="text-sm text-neutral-500">minutes</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-600">
                  <p className="font-medium">Exam mode includes:</p>
                  <ul className="ml-4 space-y-1 list-disc">
                    <li>Shuffled question and answer order</li>
                    <li>Optional countdown timer</li>
                    <li>Tab switch tracking (shared with teacher)</li>
                    <li>Students see a notice before starting</li>
                  </ul>
                  <p className="text-xs text-neutral-500 italic">
                    No auto-penalties applied. Tab switches are recorded for your review only.
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Exam Mode Settings'}
          </button>
        </div>
      )}
    </div>
  );
}
