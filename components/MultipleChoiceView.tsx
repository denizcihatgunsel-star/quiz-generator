"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { MultipleChoiceQuestion, Flashcard } from "@/types/quiz";
import VideoExplanationLink from "./VideoExplanationLink";

const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

const STOP_WORDS = new Set([
  "the", "and", "with", "that", "this", "from", "what", "which", "when",
  "your", "have", "been", "were", "their", "about", "into", "than", "then",
  "them", "they", "these", "those", "does", "also", "because", "while",
  "during", "between", "after", "before", "under", "over", "most", "more",
]);

function contentWords(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w));
}

function findRescueCard(
  q: MultipleChoiceQuestion,
  cards?: Flashcard[]
): Flashcard | null {
  if (!cards || cards.length === 0) return null;
  const correct = q.options[q.correctIndex] ?? "";
  const queryWords = new Set([...contentWords(q.question), ...contentWords(correct)]);
  let best: Flashcard | null = null;
  let bestScore = 0;
  for (const card of cards) {
    let score = 0;
    for (const w of [...contentWords(card.front), ...contentWords(card.back)]) {
      if (queryWords.has(w)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = card;
    }
  }
  return bestScore >= 2 ? best : null;
}

interface Props {
  questions: MultipleChoiceQuestion[];
  onComplete?: (correct: number, total: number) => void;
  topic?: string;
  flashcards?: Flashcard[];
  quizId?: string;
}

export default function MultipleChoiceView({
  questions,
  onComplete,
  topic,
  flashcards,
  quizId,
}: Props) {
  const { data: session } = useSession();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(3);
  const completedRef = useRef(false);

  // Recall mode: type what you remember before seeing the choices
  const [recallOn, setRecallOn] = useState(false);
  const [recallText, setRecallText] = useState<Record<string, string>>({});
  const [recallRevealed, setRecallRevealed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (window.localStorage.getItem("examina-recall-mode") === "1") {
          setRecallOn(true);
        }
      } catch {
        /* storage unavailable */
      }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const toggleRecall = () => {
    setRecallOn((v) => {
      const next = !v;
      try {
        window.localStorage.setItem("examina-recall-mode", next ? "1" : "0");
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  };

  const visible = questions.slice(0, visibleCount);
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  // Pre-compute rescue cards so matching runs once per question
  const rescueCards = useMemo(() => {
    const map: Record<string, Flashcard | null> = {};
    for (const q of questions) map[q.id] = findRescueCard(q, flashcards);
    return map;
  }, [questions, flashcards]);

  useEffect(() => {
    if (allAnswered && !completedRef.current) {
      completedRef.current = true;
      const correct = questions.filter(
        (q) => answers[q.id] === q.correctIndex
      ).length;
      onComplete?.(correct, questions.length);

      // Smart Review: schedule missed questions back into the Daily Challenge
      if (session?.user && topic) {
        const missed = questions.filter((q) => answers[q.id] !== q.correctIndex);
        if (missed.length > 0) {
          fetch("/api/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              quizId: quizId ?? "",
              topic,
              items: missed.map((q) => ({
                refId: `${quizId || "adhoc"}:${q.id}`,
                question: {
                  question: q.question,
                  options: q.options,
                  correctIndex: q.correctIndex,
                  explanation: q.explanation ?? "",
                },
              })),
            }),
          }).catch(() => {
            /* fire-and-forget */
          });
        }
      }
    }
  }, [allAnswered, questions, answers, onComplete, session, topic, quizId]);

  const pick = (qId: string, optIndex: number) => {
    if (revealed[qId]) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    setRevealed((prev) => ({ ...prev, [qId]: true }));
  };

  const revealChoices = (qId: string) => {
    setRecallRevealed((prev) => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          />
        </div>
        <motion.span
          key={answeredCount}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0"
        >
          {answeredCount}/{questions.length}
        </motion.span>
      </div>

      {/* Recall mode toggle */}
      <div className="flex justify-end">
        <button
          onClick={toggleRecall}
          aria-pressed={recallOn}
          className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            recallOn
              ? "bg-violet-600 text-white shadow-[0_6px_16px_-8px_rgba(124,58,237,0.7)]"
              : "border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-violet-300 hover:text-violet-600"
          }`}
          title="Hide the options until you've typed the answer you remember — the strongest way to study."
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${recallOn ? "bg-white" : "bg-zinc-300"}`}
          />
          Recall mode {recallOn ? "on" : "off"}
        </button>
      </div>

      {visible.map((q, qi) => {
        const chosen = answers[q.id];
        const isRevealed = revealed[q.id];
        const isCorrect = chosen === q.correctIndex;
        const needsRecallStep =
          recallOn && !isRevealed && !recallRevealed[q.id];
        const rescueCard = isRevealed && !isCorrect ? rescueCards[q.id] : null;

        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: Math.min(qi * 0.07, 0.5) }}
            className={`rounded-2xl border p-5 transition-colors duration-300 ${
              isRevealed
                ? isCorrect
                  ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30"
                  : "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/30"
                : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50"
            }`}
          >
            {/* Difficulty + Bloom's tags */}
            {q.difficulty && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                  {q.difficulty}
                </span>
                {q.bloomLevel && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400">
                    {q.bloomLevel}
                  </span>
                )}
              </div>
            )}

            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
              <span className="text-violet-500 dark:text-violet-400 mr-1.5">{qi + 1}.</span>
              {q.question}
            </p>

            {/* Recall step: type first, then reveal */}
            {needsRecallStep ? (
              <div className="rounded-xl border border-dashed border-violet-200 dark:border-violet-800 bg-violet-50/40 dark:bg-violet-950/20 p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-violet-500 dark:text-violet-400">
                  Recall it — no options yet
                </p>
                <input
                  value={recallText[q.id] ?? ""}
                  onChange={(e) =>
                    setRecallText((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") revealChoices(q.id);
                  }}
                  placeholder="Type the answer you remember…"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                />
                <button
                  onClick={() => revealChoices(q.id)}
                  className="mt-2 w-full rounded-xl bg-violet-600 py-2 text-sm font-medium text-white transition-all hover:bg-violet-700 active:scale-[0.99]"
                >
                  Show choices
                </button>
              </div>
            ) : (
              <>
                {recallOn && recallText[q.id]?.trim() && (
                  <p className="mb-2 text-xs italic text-zinc-400 dark:text-zinc-500">
                    You recalled: &ldquo;{recallText[q.id].trim()}&rdquo;
                  </p>
                )}
                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, oi) => {
                    const isChosen = chosen === oi;
                    const isAnswer = q.correctIndex === oi;

                    let style =
                      "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/30 cursor-pointer";

                    if (isRevealed) {
                      if (isAnswer) {
                        style =
                          "border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-300 dark:ring-emerald-700";
                      } else if (isChosen && !isAnswer) {
                        style =
                          "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 line-through";
                      } else {
                        style =
                          "border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-default";
                      }
                    }

                    return (
                      <motion.button
                        key={oi}
                        onClick={() => pick(q.id, oi)}
                        disabled={isRevealed}
                        whileHover={!isRevealed ? { scale: 1.02 } : undefined}
                        whileTap={!isRevealed ? { scale: 0.97 } : undefined}
                        animate={
                          isRevealed && isAnswer
                            ? { scale: [1, 1.05, 1], transition: { duration: 0.45, ease: "easeOut" } }
                            : isRevealed && isChosen && !isAnswer
                              ? { x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } }
                              : undefined
                        }
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-colors duration-300 ${style}`}
                      >
                        <span className="font-semibold mr-2 opacity-50">
                          {String.fromCharCode(65 + oi)}.
                        </span>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              </>
            )}

            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.1 }}
                className="mt-3 flex items-start gap-2 text-xs leading-relaxed"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className={isCorrect ? "text-emerald-500" : "text-red-500"}
                >
                  {isCorrect ? "✓" : "✗"}
                </motion.span>
                <p className="text-zinc-600 dark:text-zinc-400">{q.explanation}</p>
              </motion.div>
            )}

            {/* Wrong-answer rescue: matching flashcard + video explanation */}
            {rescueCard && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.25 }}
                className="mt-3 rounded-xl border border-violet-200 dark:border-violet-800 bg-white dark:bg-zinc-800/70 p-4"
              >
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-500 dark:text-violet-400">
                  Rescue — let&apos;s fix this one
                </p>
                <div className="rounded-lg bg-violet-50 dark:bg-violet-950/40 p-3">
                  <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                    {rescueCard.front}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {rescueCard.back}
                  </p>
                </div>
                {topic && (
                  <div className="mt-3">
                    <VideoExplanationLink
                      topic={topic}
                      className="!py-1.5 !text-xs"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {visibleCount < questions.length && (
        <motion.button
          onClick={() => setVisibleCount((c) => Math.min(c + 3, questions.length))}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-xl border border-dashed border-violet-200 dark:border-violet-800 transition-colors"
        >
          Show more questions ({questions.length - visibleCount} remaining)
        </motion.button>
      )}

      {/* Final score */}
      {allAnswered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mt-6 p-5 rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 text-center"
        >
          <motion.p
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.15 }}
            className="text-lg font-bold text-zinc-900 dark:text-zinc-100"
          >
            {questions.filter((q) => answers[q.id] === q.correctIndex).length} / {questions.length} correct
          </motion.p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {Math.round(
              (questions.filter((q) => answers[q.id] === q.correctIndex).length /
                questions.length) *
                100
            )}
            % accuracy
          </p>
        </motion.div>
      )}
    </div>
  );
}