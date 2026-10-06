"use client";

import { useEffect, useState } from 'react';

/**
 * Halloween Layout wrapper for signed-in pages
 * Applies data-season="halloween" and adds themed styling
 */
export default function HalloweenLayout({ children }: { children: React.ReactNode }) {
  const [halloweenActive, setHalloweenActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { isHalloweenActive } = require("@/lib/seasonal");
      const params = new URLSearchParams(window.location.search);
      const cookies = document.cookie;
      
      // Check if Halloween is active (query param or cookie)
      const active = isHalloweenActive(params) || cookies.includes('seasonal=halloween');
      setHalloweenActive(active);
      
      if (active) {
        document.body.setAttribute('data-season', 'halloween');
      } else {
        document.body.removeAttribute('data-season');
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.removeAttribute('data-season');
      }
    };
  }, []);

  return (
    <>
      {halloweenActive && (
        <>
          {/* Small pumpkin+bat cluster in header */}
          <div 
            className="fixed top-20 right-8 z-10 pointer-events-none hidden md:flex items-center gap-2"
            aria-hidden="true"
          >
            <img 
              src="/seasonal/halloween/pumpkin-flat.svg" 
              alt="" 
              className="w-8 h-8 opacity-60"
            />
            <img 
              src="/seasonal/halloween/bat-filled.svg" 
              alt="" 
              className="w-6 h-3 opacity-40"
            />
          </div>
        </>
      )}
      {children}
    </>
  );
}
