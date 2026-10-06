"use client";

/**
 * Halloween Hero - Art group with moon, pumpkins, candles, ghosts, bats
 * Positioned on the right side of the hero
 * All placeholders: emoji glyphs styled with CSS
 */
export default function HalloweenHero() {
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: '500px' }}>
      {/* Moon #8FD9C8 with soft glow */}
      <div className="halloween-moon" aria-hidden="true" />
      
      {/* Art elements layered on moon */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Bats near top */}
        <div className="flex gap-12">
          <span className="halloween-bat" aria-hidden="true">🦇</span>
          <span className="halloween-bat" aria-hidden="true">🦇</span>
        </div>
        
        {/* Pumpkins and candles row across lower half of moon */}
        <div className="halloween-pumpkin-row mt-20">
          <span className="halloween-pumpkin" aria-hidden="true">🎃</span>
          <span className="halloween-candle" aria-hidden="true">🕯️</span>
          <span className="halloween-pumpkin" aria-hidden="true">🎃</span>
          <span className="halloween-pumpkin" aria-hidden="true">🎃</span>
          <span className="halloween-candle" aria-hidden="true">🕯️</span>
          <span className="halloween-pumpkin" aria-hidden="true">🎃</span>
        </div>
        
        {/* Floating ghosts */}
        <div className="absolute top-16 left-8">
          <span className="halloween-ghost" aria-hidden="true">👻</span>
        </div>
        <div className="absolute bottom-12 right-4">
          <span className="halloween-ghost" aria-hidden="true">👻</span>
        </div>
      </div>
    </div>
  );
}
