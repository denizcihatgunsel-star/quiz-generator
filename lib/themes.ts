export type QuizThemeId = "rose" | "lavender" | "ocean" | "sage" | "sunset" | "midnight";

export interface QuizTheme {
  id: QuizThemeId;
  label: string;
  swatch: string; // picker swatch (from color)
  to: string; // gradient endpoint
  page: string; // page background
  card: string; // card background + border + shadow
  accent: string; // accent text / chips / active
  accentSolid: string; // filled accent (buttons, badges)
  soft: string; // soft chip background
  text: string; // primary text
  muted: string; // secondary text
  eyebrow: string; // shared-quiz eyebrow chip
}

export const QUIZ_THEMES: QuizTheme[] = [
  {
    id: "rose",
    label: "Rose",
    swatch: "#B0607A",
    to: "#E9A8B8",
    page: "bg-background",
    card: "border-[#F3D5DC] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(176,96,122,0.45)]",
    accent: "text-[#B0607A]",
    accentSolid: "bg-[#B0607A]",
    soft: "bg-[#FDE8EC]",
    text: "text-[#3B2027]",
    muted: "text-[#9A7280]",
    eyebrow: "bg-[#FDE8EC] text-[#9A4F68]",
  },
  {
    id: "lavender",
    label: "Lavender",
    swatch: "#8B7BD8",
    to: "#C3B5F0",
    page: "bg-[#F6F4FD]",
    card: "border-[#E4DFF8] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(139,123,216,0.45)]",
    accent: "text-[#7B6BC9]",
    accentSolid: "bg-[#7B6BC9]",
    soft: "bg-[#EEEAFB]",
    text: "text-[#332C56]",
    muted: "text-[#8E86AE]",
    eyebrow: "bg-[#EEEAFB] text-[#6C5CB9]",
  },
  {
    id: "ocean",
    label: "Ocean",
    swatch: "#4A90B8",
    to: "#9CC8DE",
    page: "bg-[#F1F7FB]",
    card: "border-[#D8E8F2] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(74,144,184,0.45)]",
    accent: "text-[#3E80A6]",
    accentSolid: "bg-[#3E80A6]",
    soft: "bg-[#E7F1F8]",
    text: "text-[#243E4F]",
    muted: "text-[#7C9AAE]",
    eyebrow: "bg-[#E7F1F8] text-[#3E80A6]",
  },
  {
    id: "sage",
    label: "Sage",
    swatch: "#6FA384",
    to: "#B5D4C0",
    page: "bg-[#F3F8F4]",
    card: "border-[#D9EADF] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(111,163,132,0.45)]",
    accent: "text-[#5B916F]",
    accentSolid: "bg-[#5B916F]",
    soft: "bg-[#E8F3EC]",
    text: "text-[#2A4233]",
    muted: "text-[#7FA08B]",
    eyebrow: "bg-[#E8F3EC] text-[#5B916F]",
  },
  {
    id: "sunset",
    label: "Sunset",
    swatch: "#D97B5C",
    to: "#F0B49A",
    page: "bg-[#FBF4F0]",
    card: "border-[#F2DCCE] bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(217,123,92,0.45)]",
    accent: "text-[#C4684A]",
    accentSolid: "bg-[#C4684A]",
    soft: "bg-[#F9E9E0]",
    text: "text-[#4C2E22]",
    muted: "text-[#B08C7C]",
    eyebrow: "bg-[#F9E9E0] text-[#B45A3E]",
  },
  {
    id: "midnight",
    label: "Midnight",
    swatch: "#4A4A63",
    to: "#7C7CA8",
    page: "bg-[#26263A]",
    card: "border-[#45455E] bg-[#2E2E45]/80 backdrop-blur-xl shadow-[0_16px_50px_-28px_rgba(0,0,0,0.6)]",
    accent: "text-[#A9A9D8]",
    accentSolid: "bg-[#6E6E9E]",
    soft: "bg-[#3A3A55]",
    text: "text-[#ECECF5]",
    muted: "text-[#9A9AB5]",
    eyebrow: "bg-[#3A3A55] text-[#C9C9E8]",
  },
];

export function getQuizTheme(id?: string | null): QuizTheme {
  return QUIZ_THEMES.find((t) => t.id === id) ?? QUIZ_THEMES[0];
}
