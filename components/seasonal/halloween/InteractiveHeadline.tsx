"use client";

import { useEffect, useRef, useState } from 'react';

interface InteractiveHeadlineProps {
  text: string;
  className?: string;
}

/**
 * Halloween interactive headline with per-letter hover effects
 * Letters lift, tilt, stretch on hover; load-in stagger animation
 */
export default function InteractiveHeadline({ text, className = '' }: InteractiveHeadlineProps) {
  const [mounted, setMounted] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Split text into words and letters, preserving spaces
  const renderLetters = () => {
    const words = text.split(' ');
    let letterIndex = 0;

    return words.map((word, wordIdx) => (
      <span key={wordIdx} className="inline-block" style={{ whiteSpace: 'nowrap' }}>
        {word.split('').map((char, charIdx) => {
          const delay = letterIndex * 25;
          letterIndex++;
          return (
            <span
              key={charIdx}
              className="halloween-letter"
              style={{ 
                animationDelay: `${delay}ms`,
                display: 'inline-block'
              }}
              aria-hidden="true"
            >
              {char}
            </span>
          );
        })}
        {wordIdx < words.length - 1 && <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>}
      </span>
    ));
  };

  return (
    <h1 
      ref={h1Ref}
      className={`halloween-headline ${className}`}
      aria-label={text}
    >
      {mounted && renderLetters()}
      <span className="sr-only">{text}</span>
    </h1>
  );
}
