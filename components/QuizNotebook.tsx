"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QuizTheme } from "@/lib/themes";
import NotesPanel from "@/components/NotesPanel";

interface QuizNotebookProps {
  open: boolean;
  onClose: () => void;
  theme: QuizTheme;
  quizId?: string | null;
  shareId?: string | null;
  topic?: string;
}

export default function QuizNotebook({
  open,
  onClose,
  theme,
  quizId,
  shareId,
  topic,
}: QuizNotebookProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#3B2027]/20 backdrop-blur-[2px]"
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            role="dialog"
            aria-label="Quiz notebook"
            className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l bg-white/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6 ${theme.card.split(" ")[0]}`}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.soft}`}>
                  <svg className={`h-4.5 w-4.5 ${theme.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-serif text-lg italic ${theme.text}`}>Notebook</h3>
                  <p className={`text-xs ${theme.muted}`}>
                    {topic ?? "Your notes, saved automatically"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close notebook"
                className="rounded-full p-2 text-[#9A7280] transition-colors hover:bg-[#F6EBEE] hover:text-[#3B2027]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pb-2">
              <NotesPanel theme={theme} quizId={quizId} shareId={shareId} topic={topic} />
            </div>

            <p className={`mt-3 border-t pt-3 text-[11px] leading-relaxed ${theme.muted} ${theme.card.split(" ")[0]}`}>
              Notes autosave as you type{quizId ? " and stay tied to this quiz" : ""} — find them
              later in your dashboard.
            </p>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}