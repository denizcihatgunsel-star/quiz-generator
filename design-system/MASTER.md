# Examina Design System — Derived from Codebase

## Fonts
- **Sans:** Geist Sans (`--font-geist-sans`)
- **Mono:** Geist Mono (`--font-geist-mono`) — used for step numbers, counters

## Color Palette

### Backgrounds
- `#f5f5f0` — page background (warm off-white)
- `white` / `bg-white` — card/section backgrounds
- `neutral-900` — dark CTA section, primary buttons
- `neutral-50` — input fields, subtle backgrounds

### Text
- `neutral-900` — headings, primary text
- `neutral-700` — labels, secondary headings
- `neutral-600` — body copy in long-form sections
- `neutral-500` — descriptions, subtitles
- `neutral-400` — section labels, captions, placeholders
- `neutral-300` — step numbers, decorative text, dividers

### Accent
- `violet-600` — primary accent (links, active states)
- `violet-500` — hover accent
- `violet-50` / `violet-100` — accent backgrounds
- `violet-500/20` — ring/focus states
- Gradient: `from-violet-600 to-indigo-600` — primary CTA buttons

### Status
- `emerald-400/500` — success, high scores (>=80%)
- `amber-400/500` — warning, mid scores (60-79%)
- `red-400/500` — error, low scores (<60%)

### Borders
- `border-black/5` — section dividers
- `border-neutral-200` — card borders, input borders
- `border-neutral-100` — subtle inner borders

## Typography Scale

| Usage | Classes |
|---|---|
| Page H1 | `text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.08]` |
| Section H2 | `text-3xl sm:text-4xl font-medium leading-tight` |
| Card H3 | `text-neutral-900 font-medium` (default size) |
| Section label | `text-xs uppercase tracking-[0.2em] text-neutral-400` |
| Body copy | `text-sm text-neutral-500 leading-relaxed` |
| Long-form body | `text-neutral-600 leading-relaxed` (default size) |
| Hero subtitle | `text-lg text-neutral-500 leading-relaxed` |
| Stats number | `text-4xl sm:text-5xl font-medium text-neutral-900` |
| Stats label | `text-sm text-neutral-400` |
| Step numbers | `text-xs text-neutral-300 font-mono` |
| Nav links | `text-sm text-neutral-500 hover:text-neutral-900` |
| Buttons | `text-sm font-medium` |
| CTA heading | `text-3xl sm:text-5xl font-medium text-white` |

## Spacing

| Usage | Value |
|---|---|
| Section padding | `py-32` |
| Container max-width | `max-w-5xl` (wide), `max-w-3xl` (narrow/text) |
| Container padding | `px-6` |
| Grid gap (features) | `gap-12` |
| Grid gap (2-col) | `gap-20` |
| Section label → H2 | `mb-6` |
| H2 → content | `mb-16` or `mb-20` |
| H2 → body copy | `mb-8` |
| Hero top padding | `pt-36 sm:pt-48` |

## Component Patterns

### Section Label
```
<p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">Label</p>
```

### Section Dividers
- Alternating: `border-t border-black/5` (beige bg) vs `bg-white` (white bg)
- No two adjacent white sections

### Buttons
- Primary: `bg-neutral-900 text-white hover:bg-neutral-700`
- CTA gradient: `bg-gradient-to-r from-violet-600 to-indigo-600`
- Ghost: `border border-white text-white hover:bg-white hover:text-black`
- No border-radius on primary buttons (sharp corners)
- Rounded buttons: `rounded-xl` (forms only)

### Cards
- `rounded-2xl border border-neutral-200 bg-white shadow-sm`

### Animations
- Transitions: `transition-colors duration-200`
- Flashcard flip: `0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- Loading dots: `animate-bounce` with staggered delays
- FAQ expand: `transition-all duration-200`
- No scroll animations, no entrance animations, no parallax

## Anti-Patterns (Do NOT use)
- No `rounded-lg` or `rounded-md` on section-level elements
- No shadows heavier than `shadow-sm` (except `shadow-lg shadow-violet-500/20` on CTA buttons)
- No `zinc-*` colors anywhere (legacy dark theme — removed)
- No emoji in headings or labels
- No gradients on text
- No background images or patterns
- No decorative SVG illustrations
