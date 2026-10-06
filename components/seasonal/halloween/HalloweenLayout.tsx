"use client";

import { useEffect, useState } from "react";
import { isHalloweenActive } from "@/lib/seasonal";

/**
 * HalloweenLayout: seasonal reskin wrapper (root layout)
 *
 * - Sets data-season="halloween" on body when active (?halloween=1, cookie, or env)
 * - Injects the scoped /seasonal/halloween.css stylesheet
 * - Swaps the theme-color meta tag
 * - Renders a small pumpkin + bat cluster in the page header area
 */
export default function HalloweenLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isActive = isHalloweenActive(params);
    setActive(isActive);

    let metaTheme = document.querySelector('meta[name="theme-color"]');

    if (isActive) {
      document.body.setAttribute("data-season", "halloween");

      if (!metaTheme) {
        metaTheme = document.createElement("meta");
        metaTheme.setAttribute("name", "theme-color");
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute("content", "#0A1614");

      if (!document.getElementById("halloween-theme-css")) {
        const link = document.createElement("link");
        link.id = "halloween-theme-css";
        link.rel = "stylesheet";
        link.href = "/seasonal/halloween.css";
        document.head.appendChild(link);
      }
    } else {
      document.body.removeAttribute("data-season");
      if (metaTheme) metaTheme.setAttribute("content", "#FDE8EC");
      document.getElementById("halloween-theme-css")?.remove();
    }

    return () => {
      if (isActive) document.body.removeAttribute("data-season");
    };
  }, []);

  return (
    <>
      {active && (
        <div
          className="halloween-header-cluster fixed top-20 right-8 z-10 pointer-events-none hidden md:flex items-center gap-2"
          aria-hidden="true"
        >
          <img src="/seasonal/halloween/pumpkin-flat.svg" alt="" className="w-8 h-8 opacity-60" />
          <img src="/seasonal/halloween/bat-filled.svg" alt="" className="w-6 h-3 opacity-40" />
        </div>
      )}
      {children}
    </>
  );
}
