"use client";

// Google sign-in redirects drop query params, so referral codes are stashed
// in sessionStorage before OAuth and applied here once a session exists.

import { useEffect } from "react";
import { useSession } from "next-auth/react";

const STORAGE_KEY = "examina_pending_ref";

export function storePendingRef(code: string | null | undefined) {
  if (code) {
    try {
      sessionStorage.setItem(STORAGE_KEY, code);
    } catch {
      // storage unavailable — ignore
    }
  }
}

export default function ReferralAttribution() {
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    let code: string | null = null;
    try {
      code = sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (!code) return;

    fetch("/api/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referralCode: code }),
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        // Only retry on network/server failures; drop on any app-level answer
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        if (data.success) {
          window.dispatchEvent(new Event("referral-applied"));
        }
      })
      .catch(() => {
        // keep the code for the next page load
      });
  }, [status]);

  return null;
}
