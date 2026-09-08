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
