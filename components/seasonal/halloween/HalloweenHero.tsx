"use client";

import Image from 'next/image';

/**
 * Halloween Hero - Art group with moon, pumpkins, candles, ghosts, bats
 * All assets: Microsoft Fluent Emoji (MIT), Openclipart (CC0), NASA (public domain)
 */
export default function HalloweenHero() {
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: '500px' }}>
      {/* Moon - NASA teal-tinted with soft glow */}
      <div className="halloween-moon" aria-hidden="true" />
      
      {/* Bats above moon - Openclipart with teal glow */}
      <div className="absolute" style={{ top: '10%', left: '20%', zIndex: 2 }}>
        <Image
          src="/seasonal/halloween/bat.svg"
          alt=""
          width={48}
          height={48}
          className="halloween-bat"
          aria-hidden="true"
        />
      </div>
      <div className="absolute" style={{ top: '15%', right: '25%', zIndex: 2 }}>
        <Image
          src="/seasonal/halloween/bat.svg"
          alt=""
          width={48}
          height={48}
          className="halloween-bat"
          aria-hidden="true"
        />
      </div>
      
      {/* Left ghost at mid-height - Fluent 3D */}
      <div className="absolute" style={{ top: '40%', left: '5%', zIndex: 2 }}>
        <Image
          src="/seasonal/halloween/ghost.webp"
          alt=""
          width={80}
          height={80}
          className="halloween-ghost"
          aria-hidden="true"
        />
      </div>
      
      {/* Pumpkins in front of lower third of moon, extending wider - Fluent 3D */}
      <div className="halloween-pumpkin-row absolute" style={{ bottom: '20%', zIndex: 3 }}>
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={60} height={60} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/candle.webp" alt="" width={60} height={60} className="halloween-candle" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={80} height={80} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={110} height={110} className="halloween-pumpkin center" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={80} height={80} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/candle.webp" alt="" width={60} height={60} className="halloween-candle" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={60} height={60} className="halloween-pumpkin" aria-hidden="true" />
      </div>
      
      {/* Right ghost below pumpkins, mirrored - Fluent 3D */}
      <div className="absolute" style={{ bottom: '10%', right: '8%', zIndex: 2, transform: 'scaleX(-1)' }}>
        <Image
          src="/seasonal/halloween/ghost.webp"
          alt=""
          width={80}
          height={80}
          className="halloween-ghost"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
