"use client";

import Image from 'next/image';

/**
 * Halloween Hero - Art group with moon, pumpkins, candles, ghosts, bats
 * All assets: Microsoft Fluent Emoji (MIT), Openclipart (CC0), NASA (public domain)
 */
export default function HalloweenHero() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[460px] mx-auto" style={{ minHeight: '320px', aspectRatio: '1' }}>
      {/* Moon - NASA teal-tinted with soft glow */}
      <div 
        className="halloween-moon" 
        aria-hidden="true"
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Bats above moon - larger, teal with glow */}
      <div className="absolute" style={{ top: '8%', left: '12%', zIndex: 2 }}>
        <Image
          src="/seasonal/halloween/bat.svg"
          alt=""
          width={68}
          height={68}
          className="halloween-bat"
          aria-hidden="true"
        />
      </div>
      <div className="absolute" style={{ top: '5%', right: '15%', zIndex: 2 }}>
        <Image
          src="/seasonal/halloween/bat.svg"
          alt=""
          width={68}
          height={68}
          className="halloween-bat"
          aria-hidden="true"
        />
      </div>
      
      {/* Left ghost at mid-height */}
      <div className="absolute" style={{ top: '40%', left: '1%', zIndex: 2 }}>
        <Image
          src="/seasonal/halloween/ghost.webp"
          alt=""
          width={80}
          height={80}
          className="halloween-ghost"
          aria-hidden="true"
        />
      </div>
      
      {/* Tight row of 5 pumpkins with 2 candles in front of LOWER THIRD of moon (bottom 15-25%) */}
      <div 
        className="halloween-pumpkin-row absolute" 
        style={{ 
          bottom: '17%', 
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          gap: '0.25rem',
          alignItems: 'flex-end'
        }}
      >
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={70} height={70} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/candle.webp" alt="" width={55} height={55} className="halloween-candle" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={90} height={90} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={110} height={110} className="halloween-pumpkin center" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={90} height={90} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/candle.webp" alt="" width={55} height={55} className="halloween-candle" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={70} height={70} className="halloween-pumpkin" aria-hidden="true" />
      </div>
      
      {/* Right ghost bottom-right */}
      <div className="absolute" style={{ bottom: '10%', right: '3%', zIndex: 2, transform: 'scaleX(-1)' }}>
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
