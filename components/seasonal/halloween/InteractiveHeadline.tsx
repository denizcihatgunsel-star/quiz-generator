"use client";

import type { CSSProperties, ReactNode } from 'react';

/**
 * Halloween interactive hero headline.
 *
 * Same structure/box as the approved static headline: an h1.halloween-headline
 * with three block lines, the O's replaced by the flat pumpkin, the last line
 * fading white -> #7FE3D3 (per-letter gradient slices). Each visible letter is an inline-block span so it can lift /
 * tilt on hover and stagger in on load; all of that uses the CSS `translate`,
 * `rotate` and `scale` properties (see halloween.css), so nothing reflows.
 * Screen readers get the plain sentence once.
 */

const LINES: { text: string; teal?: boolean }[] = [
  { text: 'AI QUIZ GENERAT{O}R' },
  { text: 'THAT TURNS N{O}TES' },
  { text: 'INT{O} QUIZZES', teal: true },
];

const SR_TEXT = 'AI Quiz Generator that turns notes into quizzes';

const PUMPKIN_STYLE: CSSProperties = {
  display: 'inline-block',
  height: '0.74em',
  width: '0.74em',
  verticalAlign: '-0.04em',
  margin: '0 0.02em',
};

function mixTeal(t: number): string {
  // #FFFFFF -> #7FE3D3
  const r = Math.round(255 + (127 - 255) * t);
  const g = Math.round(255 + (227 - 255) * t);
  const b = Math.round(255 + (211 - 255) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function InteractiveHeadline() {
  let delayIndex = 0;

  const renderLine = (line: { text: string; teal?: boolean }, lineIdx: number) => {
    const tokens = line.text.split(/(\{O\})/).filter(Boolean);
    // count visible glyph slots for the teal colour ramp
    const glyphCount = tokens.reduce((n, tok) => n + (tok === '{O}' ? 1 : tok.length), 0);
    let glyph = 0;
    const out: ReactNode[] = [];

    tokens.forEach((tok, tokIdx) => {
      if (tok === '{O}') {
        glyph++;
        out.push(
          <span key={`p${tokIdx}`} className="pumpkin-o">
            <img src="/seasonal/halloween/pumpkin-flat.svg" alt="" aria-hidden="true" style={PUMPKIN_STYLE} />
          </span>
        );
        return;
      }
      tok.split('').forEach((ch, chIdx) => {
        const t = glyphCount > 1 ? glyph / (glyphCount - 1) : 0;
        glyph++;
        if (ch === ' ') {
          out.push(' ');
          return;
        }
        const style: CSSProperties = { animationDelay: `${delayIndex++ * 25}ms` };
        if (line.teal) {
          // Each letter carries its own slice of the line's white -> #7FE3D3
          // fade (start..end of its glyph slot), clipped to the glyph, so the
          // slices join into one continuous fade across the letter spans.
          const t1 = glyphCount > 1 ? Math.min(1, (glyph) / (glyphCount - 1)) : 1;
          style.backgroundImage = `linear-gradient(to right, ${mixTeal(t)}, ${mixTeal(t1)})`;
          style.WebkitBackgroundClip = 'text';
          style.backgroundClip = 'text';
          style.WebkitTextFillColor = 'transparent';
        }
        out.push(
          <span key={`${tokIdx}-${chIdx}`} className="halloween-letter" style={style}>
            {ch}
          </span>
        );
      });
    });

    return (
      <span key={lineIdx} className={line.teal ? 'block halloween-headline-teal-letters' : 'block'} aria-hidden="true">
        {out}
      </span>
    );
  };

  return (
    <h1
      className="halloween-headline uppercase"
      style={{ fontSize: 'clamp(32px, 8vw, 76px)', lineHeight: '1.1', textTransform: 'uppercase' }}
    >
      <span className="sr-only">{SR_TEXT}</span>
      {LINES.map(renderLine)}
    </h1>
  );
}
