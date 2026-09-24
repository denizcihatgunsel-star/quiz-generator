"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QuizTheme } from "@/lib/themes";
import NotesPanel from "@/components/NotesPanel";

interface QuizNotebookProps {
  open: boolean;
  onToggle: () => void;
  theme: QuizTheme;
  quizId?: string | null;
  shareId?: string | null;
  topic?: string;
}

export default function QuizNotebook({
  open,
  onToggle,
  theme,
  quizId,
  shareId,
  topic,
}: QuizNotebookProps) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.aside
          key="notebook-open"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 34 }}
          role="dialog"
          aria-label="Quiz notebook"
          className={`fixed inset-y-0 right-0 z-50 flex w-[min(340px,92vw)] flex-col border-l bg-white/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6 ${theme.card.split(" ")[0]}`}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -12, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.soft}`}
              >
                <svg className={`h-4.5 w-4.5 ${theme.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </motion.div>
              <div>
                <h3 className={`font-serif text-lg italic ${theme.text}`}>Notebook</h3>
                <p className={`text-xs ${theme.muted}`}>
                  {topic ?? "Your notes, saved automatically"}
                </p>
              </div>
            </div>
            <motion.button
              onClick={onToggle}
              whileTap={{ scale: 0.85, rotate: 90 }}
              aria-label="Minimize notebook"
              title="Minimize"
              className="rounded-full border border-[#F3D5DC] bg-white/70 p-2 text-[#B4939F] transition-colors hover:bg-[#F6EBEE] hover:text-[#3B2027]"
            >
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M20 12H4" />
              </svg>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 240, damping: 24 }}
            className="min-h-0 flex-1 overflow-y-auto pb-2"
          >
            <NotesPanel theme={theme} quizId={quizId} shareId={shareId} topic={topic} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            className={`mt-3 border-t pt-3 text-[11px] leading-relaxed ${theme.muted} ${theme.card.split(" ")[0]}`}
          >
            Notes autosave as you type{quizId ? " and stay tied to this quiz" : ""} — find them
            later in your dashboard.
          </motion.p>
        </motion.aside>
      ) : (
        <motion.button
          key="notebook-closed"
          initial={{ x: 96, y: "-50%", opacity: 0 }}
          animate={{ x: 0, y: "-50%", opacity: 1 }}
          exit={{ x: 96, y: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          onClick={onToggle}
          aria-label="Open notebook"
          title="Open notebook"
          className={`fixed right-0 top-1/2 z-40 flex items-center gap-2 rounded-l-2xl py-3 pl-3 pr-2.5 text-[#F6E3E8] shadow-[0_14px_32px_-12px_rgba(59,32,39,0.55)] ${theme.accentSolid}`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 0 0 rgba(255,255,255,0.45)" }}
              animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,0.45)", "0 0 0 12px rgba(255,255,255,0)"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              aria-hidden="true"
            />
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span
              className={`absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#3B2027] shadow`}
              aria-hidden="true"
            >
              +
            </span>
          </span>
          <span className="hidden text-sm font-medium sm:inline">Notes</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}