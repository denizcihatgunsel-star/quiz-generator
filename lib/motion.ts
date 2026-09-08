/** Shared motion tokens for the blush/editorial motion-only pass. */
export const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

/** Unified section reveal: opacity + y 28→0, stagger children 0.08s, once, −80px. */
export const SECTION_VIEWPORT = { once: true, margin: "-80px" } as const;

export const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
} as const;

export const sectionStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
} as const;

export const childReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
} as const;

/** Hero/nav CTA arrow-chip idle pulse (~3s loop). Scale readable on blush UI. */
export const ctaIdlePulseAnimate = {
  scale: [1, 1.1, 1],
  boxShadow: [
    "0 0 0 0 rgba(59, 32, 39, 0)",
    "0 0 0 7px rgba(59, 32, 39, 0.16)",
    "0 0 0 0 rgba(59, 32, 39, 0)",
  ],
};

/** Soft light glow for blush chips sitting on dark CTA buttons. */
export const ctaIdlePulseAnimateOnDark = {
  scale: [1, 1.1, 1],
  boxShadow: [
    "0 0 0 0 rgba(246, 227, 232, 0)",
    "0 0 12px 3px rgba(246, 227, 232, 0.55)",
    "0 0 0 0 rgba(246, 227, 232, 0)",
  ],
};

/**
 * Soft rose glow for dark chips on light blush UI (e.g. nav Create Quiz).
 * Dark plum shadow disappears on light pills — use #B0607A instead.
 * Mutable (no `as const`) so Framer TargetAndTransition accepts boxShadow.
 */
export const ctaIdlePulseAnimateOnLight = {
  scale: [1, 1.1, 1],
  boxShadow: [
    "0 0 0 0 rgba(176, 96, 122, 0)",
    "0 0 12px 3px rgba(176, 96, 122, 0.45)",
    "0 0 0 0 rgba(176, 96, 122, 0)",
  ],
};

/** ~0.75s pulse + ~2.25s pause ≈ 3s loop. */
export const ctaIdlePulseTransition = {
  duration: 0.75,
  ease: "easeInOut" as const,
  repeat: Infinity,
  repeatDelay: 2.25,
};