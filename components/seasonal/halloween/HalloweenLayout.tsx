"use client";

import { useEffect, useState } from "react";
import { isHalloweenActive } from "@/lib/seasonal";

/**
 * HalloweenLayout: Full seasonal reskin wrapper
 * 
 * Sets data-season="halloween" on body when active
 * Injects halloween.css scoped stylesheet
 * Swaps theme-color meta tag
 */

export default function HalloweenLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isActive = isHalloweenActive(params);
    setActive(isActive);

    if (isActive) {
      document.body.setAttribute('data-season', 'halloween');
      
      // Swap theme-color meta tag
      let metaTheme = document.querySelector('meta[name="theme-color"]');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.setAttribute('name', 'theme-color');
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute('content', '#C2410C');
      
      // Inject CSS if not already present
      if (!document.getElementById('halloween-theme-css')) {
        const link = document.createElement('link');
        link.id = 'halloween-theme-css';
        link.rel = 'stylesheet';
        link.href = '/seasonal/halloween.css';
        document.head.appendChild(link);
      }
    } else {
      document.body.removeAttribute('data-season');
      
      // Restore original theme color
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute('content', '#FDE8EC');
      }
      
      // Remove Halloween CSS
      const link = document.getElementById('halloween-theme-css');
      if (link) {
        link.remove();
      }
    }

    return () => {
      if (isActive) {
        document.body.removeAttribute('data-season');
      }
    };
  }, []);

  return <>{children}</>;
}
