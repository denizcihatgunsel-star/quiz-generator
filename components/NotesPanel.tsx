"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { QuizTheme } from "@/lib/themes";

const LS_KEY = "examina-notes";

interface Note {
  id: string;
  content: string;
  topic?: string;
  shareId?: string | null;
  createdAt: string;
  updatedAt: string;
}

type StoredNote = Note & { quizId?: string | null };

interface NotesPanelProps {
  theme: QuizTheme;
  quizId?: string | null;
  shareId?: string | null;
  topic?: string;
  showTopic?: boolean;
}

export default function NotesPanel({
  theme,
  quizId,
  shareId,
  topic,
  showTopic = false,
}: NotesPanelProps) {
  const { data: session } = useSession();
  const loggedIn = !!session?.user;
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const notesRef = useRef<Note[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const loggedInRef = useRef(loggedIn);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);
  useEffect(() => {
    loggedInRef.current = loggedIn;
  }, [loggedIn]);

  const loadLocal = useCallback(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const all: StoredNote[] = JSON.parse(raw);
      const mine = quizId ? all.filter((n) => n.quizId === quizId) : all;
      setNotes(
        mine.map((n) => ({
          id: n.id,
          content: n.content,
          topic: n.topic,
          shareId: n.shareId ?? null,
          createdAt: n.createdAt,
          updatedAt: n.updatedAt,
        }))
      );
    } catch {
      // ignore
    }
  }, [quizId]);

  useEffect(() => {
    if (!loggedIn) {
      const t = setTimeout(() => {
        loadLocal();
        setLoaded(true);
      }, 0);
      return () => clearTimeout(t);
    }
    fetch(`/api/notes${quizId ? `?quizId=${encodeURIComponent(quizId)}` : ""}`)
      .then((r) => r.json())
      .then((d) => {
        const rows: Note[] = (d.notes ?? []).map((n: Note) => ({
          id: n.id,
          content: n.content,
          topic: n.topic,
          shareId: n.shareId ?? null,
          createdAt: n.createdAt,
          updatedAt: n.updatedAt,
        }));
        setNotes(rows);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [loggedIn, quizId, loadLocal]);

  const persistLocal = useCallback(
    (next: Note[]) => {
      try {
        const raw = localStorage.getItem(LS_KEY);
        const all: StoredNote[] = raw ? JSON.parse(raw) : [];
        const others = all.filter((n) => !next.some((x) => x.id === n.id));
        localStorage.setItem(
          LS_KEY,
          JSON.stringify([
            ...others,
            ...next.map((n) => ({ ...n, quizId: quizId ?? null })),
          ])
        );
      } catch {
        // ignore
      }
    },
    [quizId]
  );

  const newLocalId = () => `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const isServerNote = (id: string) => !id.startsWith("tmp-") && !id.startsWith("local-") && !id.startsWith("q:");

  const createNote = useCallback(
    (content: string) => {
      const now = new Date().toISOString();
      if (!loggedInRef.current) {
        const note: Note = {
          id: newLocalId(),
          content,
          topic: quizId ? topic : "",
          shareId: shareId ?? null,
          createdAt: now,
          updatedAt: now,
        };
        const next = [...notesRef.current.filter((n) => n.id !== note.id), note];
        setNotes(next);
        persistLocal(next);
        return Promise.resolve(note);
      }
      return fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          topic: topic ?? "",
          quizId: quizId ?? null,
          shareId: shareId ?? null,
        }),
      })
        .then((r) => r.json())
        .then((d) => {
          const note: Note = d.note
            ? {
                id: d.note.id,
                content: d.note.content,
                topic: d.note.topic,
                shareId: d.note.shareId,
                createdAt: d.note.createdAt,
                updatedAt: d.note.updatedAt,
              }
            : { id: newLocalId(), content, topic: topic ?? "", shareId: shareId ?? null, createdAt: now, updatedAt: now };
          return note;
        })
        .catch(() => ({ id: newLocalId(), content, topic: topic ?? "", shareId: shareId ?? null, createdAt: now, updatedAt: now }));
    },
    [quizId, shareId, topic, persistLocal]
  );

  const updateNote = useCallback(
    async (id: string, content: string) => {
      const current = notesRef.current.find((n) => n.id === id);
      if (!current) return;
      if (!loggedInRef.current) {
        const next = notesRef.current.map((n) =>
          n.id === id ? { ...n, content, updatedAt: new Date().toISOString() } : n
        );
        setNotes(next);
        persistLocal(next);
        return;
      }
      if (current.id.startsWith("tmp-")) {
        const created = await createNote(content);
        setNotes((prev) =>
          prev.map((n) =>
            n.id === id
              ? { ...n, id: created.id, content, updatedAt: created.updatedAt }
              : n
          )
        );
        return;
      }
      await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      }).catch(() => {});
      setNotes((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, content, updatedAt: new Date().toISOString() } : n
        )
      );
    },
    [createNote, persistLocal]
  );

  const handleChange = useCallback(
    (id: string, value: string) => {
      setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, content: value } : n)));
      setSaving((prev) => ({ ...prev, [id]: true }));
      clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => {
        updateNote(id, value);
        setSaving((prev) => ({ ...prev, [id]: false }));
      }, 800);
    },
    [updateNote]
  );

  const addNote = useCallback(() => {
    const now = new Date().toISOString();
    const tmp: Note = {
      id: `tmp-${Date.now()}`,
      content: "",
      topic: quizId ? topic : "",
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [tmp, ...prev]);
  }, [quizId, topic]);

  const deleteNote = useCallback(
    (id: string) => {
      if (loggedInRef.current && isServerNote(id)) {
        fetch(`/api/notes/${id}`, { method: "DELETE" }).catch(() => {});
      }
      const next = notesRef.current.filter((n) => n.id !== id);
      setNotes(next);
      if (!loggedInRef.current) persistLocal(next);
      setConfirmDelete(null);
    },
    [persistLocal]
  );

  const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-serif text-sm italic text-[#9A7280]">
          {quizId ? "Quiz notebook" : "All notes"}
        </p>
        {!loggedIn && (
          <span className="rounded-full bg-[#FDE8EC]/70 px-2.5 py-0.5 text-[10px] font-medium text-[#9A4F68]">
            Saved on this device
          </span>
        )}
      </div>

      {!loaded ? (
        <div className="py-10 text-center text-sm text-[#9A7280]">Loading notes…</div>
      ) : notes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E9B8C4] bg-white/40 px-4 py-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]">
            <svg className="h-5 w-5 text-[#B0607A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[#3B2027]">No notes yet</p>
          <p className="mt-1 text-xs text-[#9A7280]">
            Write down steps, operations, formulas, or anything you want to remember.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-3.5 shadow-[0_10px_30px_-22px_rgba(176,96,122,0.5)] backdrop-blur-xl"
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                {showTopic && (note.topic?.replace(/^q:/, "") || topic) && (
                  <p className={`truncate text-xs font-medium ${theme.muted}`}>
                    {note.topic || topic}
                  </p>
                )}
                {showTopic && note.shareId && (
                  <a
                    href={`/quiz/${note.shareId}`}
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-opacity hover:opacity-75 ${theme.soft} ${theme.accent}`}
                  >
                    Open quiz
                  </a>
                )}
              </div>
              <textarea
                value={note.content}
                onChange={(e) => handleChange(note.id, e.target.value)}
                placeholder="Write steps, operations, formulas…"
                rows={Math.min(6, Math.max(2, note.content.split("\n").length))}
                className={`w-full resize-y rounded-xl border ${theme.card.split(" ")[0]} bg-white/80 px-3 py-2.5 text-sm leading-relaxed text-[#3B2027] placeholder:text-[#9A7280]/70 focus:border-[#B0607A] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30`}
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-[10px] text-[#B4939F]">
                  {saving[note.id]
                    ? "Saving…"
                    : wordCount(note.content) > 0
                    ? `${wordCount(note.content)} words · ${new Date(note.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                    : "Empty note"}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    saving[note.id]
                      ? "bg-[#FDE8EC] text-[#9A4F68]"
                      : isServerNote(note.id)
                      ? "bg-[#E9F5EC] text-[#2F7D46]"
                      : "bg-[#F3EDEC] text-[#8A7A75]"
                  }`}>
                    {saving[note.id] ? "Saving…" : isServerNote(note.id) ? "Saved" : loggedIn ? "Draft" : "On device"}
                  </span>
                  {confirmDelete === note.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="rounded-full bg-[#3B2027] px-2.5 py-1 text-[10px] font-medium text-[#F6E3E8] hover:bg-[#52303B]"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="rounded-full border border-[#F3D5DC] px-2.5 py-1 text-[10px] text-[#9A7280] hover:text-[#3B2027]"
                      >
                        Keep
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(note.id)}
                      title="Delete note"
                      className="rounded-full p-1.5 text-[#B4939F] transition-colors hover:bg-[#FDE8EC] hover:text-[#C25B5B]"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={addNote}
        className={`mt-4 w-full rounded-full border border-dashed px-4 py-2.5 text-sm font-medium transition-colors ${theme.card.split(" ")[0]} ${
          theme.muted
        } hover:opacity-80`}
      >
        + New note
      </button>
    </div>
  );
}