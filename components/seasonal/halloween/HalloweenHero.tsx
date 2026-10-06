"use client";

import Image from 'next/image';

/**
 * Halloween Hero - Art group with moon, pumpkins, candles, ghosts, bats
 * All assets: Microsoft Fluent Emoji (MIT), Openclipart (CC0), NASA (public domain)
 * Bat: hand-drawn filled SVG
 */
export default function HalloweenHero() {
  return (
    <div className="relative flex items-end justify-center w-full max-w-[340px] sm:max-w-[380px] mx-auto" style={{ minHeight: '380px', aspectRatio: 'auto' }}>
      {/* Moon - NASA teal-tinted with soft glow, no black rim */}
      <div 
        className="halloween-moon" 
        aria-hidden="true"
        style={{ 
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />
      
      {/* 3 Filled bats around upper moon - solid teal silhouettes */}
      <div className="absolute" style={{ top: '6%', left: '8%', zIndex: 2, transform: 'rotate(-12deg)' }}>
        <div style={{ width: '64px', height: '32px' }} className="max-[767px]:!w-[42px] max-[767px]:!h-[21px]">
          <Image
            src="/seasonal/halloween/bat-filled.svg"
            alt=""
            width={64}
            height={32}
            className="halloween-bat"
            aria-hidden="true"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      <div className="absolute" style={{ top: '4%', right: '12%', zIndex: 2, transform: 'rotate(15deg)' }}>
        <div style={{ width: '68px', height: '34px' }} className="max-[767px]:!w-[44px] max-[767px]:!h-[22px]">
          <Image
            src="/seasonal/halloween/bat-filled.svg"
            alt=""
            width={68}
            height={34}
            className="halloween-bat"
            aria-hidden="true"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      <div className="absolute" style={{ top: '10%', right: '6%', zIndex: 2, transform: 'rotate(-8deg) scaleX(-1)' }}>
        <div style={{ width: '72px', height: '36px' }} className="max-[767px]:!w-[46px] max-[767px]:!h-[23px]">
          <Image
            src="/seasonal/halloween/bat-filled.svg"
            alt=""
            width={72}
            height={36}
            className="halloween-bat"
            aria-hidden="true"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      
      {/* Left ghost at mid-height */}
      <div className="absolute" style={{ top: '42%', left: '3%', zIndex: 2 }}>
        <Image
          src="/seasonal/halloween/ghost.webp"
          alt=""
          width={72}
          height={72}
          className="halloween-ghost"
          aria-hidden="true"
        />
      </div>
      
      {/* Row of 5 pumpkins with 2 candles at LOWER THIRD (bottom 85-95% of moon) */}
      <div 
        className="halloween-pumpkin-row absolute" 
        style={{ 
          bottom: '8%', 
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          gap: '0.2rem',
          alignItems: 'flex-end',
          maxWidth: '92%'
        }}
      >
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={52} height={52} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/candle.webp" alt="" width={42} height={42} className="halloween-candle" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={68} height={68} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={88} height={88} className="halloween-pumpkin center" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={68} height={68} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/candle.webp" alt="" width={42} height={42} className="halloween-candle" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={52} height={52} className="halloween-pumpkin" aria-hidden="true" />
      </div>
      
      {/* Right ghost bottom-right */}
      <div className="absolute" style={{ bottom: '12%', right: '6%', zIndex: 2, transform: 'scaleX(-1)' }}>
        <Image
          src="/seasonal/halloween/ghost.webp"
          alt=""
          width={72}
          height={72}
          className="halloween-ghost"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
