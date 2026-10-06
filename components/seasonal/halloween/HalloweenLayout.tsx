"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { isHalloweenActive } from "@/lib/seasonal";

const HalloweenContext = createContext(false);

/** True when the Halloween theme is active. Starts from the server's decision
 *  (so SSR and hydration render the themed markup), then follows the client
 *  check (?halloween=1/0, cookie, cutoff). */
export function useHalloweenActive(): boolean {
  return useContext(HalloweenContext);
}

/**
 * HalloweenLayout: seasonal reskin wrapper (root layout)
 *
 * - The server already renders body[data-season] + /seasonal/halloween.css when
 *   the theme is on (env + date); inline scripts in app/layout.tsx handle the
 *   ?halloween=1 / cookie preview path and ?halloween=0 before first paint.
 * - After hydration this keeps body[data-season], the stylesheet and the
 *   theme-color meta in sync with the client decision. It never removes the
 *   server-rendered stylesheet node (React owns it); it disables it instead.
 * - Renders a small pumpkin + bat cluster in the page header area.
 */
export default function HalloweenLayout({
  children,
  serverActive = false,
}: {
  children: React.ReactNode;
  serverActive?: boolean;
}) {
  const [active, setActive] = useState(serverActive);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isActive = isHalloweenActive(params);
    setActive(isActive);

    let metaTheme = document.querySelector('meta[name="theme-color"]');
    const link = document.getElementById("halloween-theme-css") as HTMLLinkElement | null;

    if (isActive) {
      document.body.setAttribute("data-season", "halloween");

      if (!metaTheme) {
        metaTheme = document.createElement("meta");
        metaTheme.setAttribute("name", "theme-color");
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute("content", "#0A1614");

      if (!link) {
        const el = document.createElement("link");
        el.id = "halloween-theme-css";
        el.rel = "stylesheet";
        el.href = "/seasonal/halloween.css";
        document.head.appendChild(el);
      } else if (link.disabled) {
        link.disabled = false;
      }
    } else {
      document.body.removeAttribute("data-season");
      if (metaTheme) metaTheme.setAttribute("content", "#FDE8EC");
      if (link) link.disabled = true;
    }
  }, []);

  return (
    <HalloweenContext.Provider value={active}>
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
    </HalloweenContext.Provider>
  );
}
