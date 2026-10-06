"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { I18nProvider } from "@/lib/i18n";
import { ReactNode, useEffect } from "react";

/** Reveals the page once the client session is known (see data-auth-pending in app/layout.tsx). */
function AuthPendingGate() {
  const { status } = useSession();
  useEffect(() => {
    if (status !== "loading") document.documentElement.removeAttribute("data-auth-pending");
  }, [status]);
  return null;
}

export default function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthPendingGate />
      <I18nProvider>{children}</I18nProvider>
    </SessionProvider>
  );
}
