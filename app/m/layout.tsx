"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ReferralAttribution from "@/components/ReferralAttribution";

const HOME = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
  </svg>
);

const EXPLORE = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const STUDY = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const DAILY = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const USER = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const TABS = [
  { href: "/m", label: "Home", icon: HOME },
  { href: "/m/explore", label: "Explore", icon: EXPLORE },
  { href: "/m/study", label: "Study", icon: STUDY },
  { href: "/m/daily-challenge", label: "Daily", icon: DAILY },
  { href: "/m/dashboard", label: "Profile", icon: USER },
];

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDE8EC] via-[#FBF1EE] to-[#FDE8EC]">
      <header className="sticky top-0 z-40 border-b border-[#F3D5DC] bg-[#FBF1EE]/85 backdrop-blur-xl">
        <div className="flex items-center justify-between px-5 py-3.5">
          <Link href="/m" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-xl object-cover shadow-[0_6px_18px_-8px_rgba(176,96,122,0.8)]" />
            <span className="font-serif text-2xl italic tracking-tight text-[#3B2027]">Examina</span>
          </Link>
          {session?.user ? (
            <Link
              href="/m/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#B0607A] to-[#E9A8B8] text-sm font-semibold text-white shadow-[0_6px_16px_-6px_rgba(176,96,122,0.8)]"
            >
              {(session.user.name ?? "?").charAt(0).toUpperCase()}
            </Link>
          ) : (
            <Link
              href="/m/auth/login"
              className="rounded-full bg-[#3B2027] px-4 py-2 text-sm font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]"
            >
              Sign in
            </Link>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg px-4 pb-28 pt-6">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#F3D5DC] bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-stretch justify-around px-2">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors ${
                  active ? "text-[#B0607A]" : "text-[#9A7280] hover:text-[#3B2027]"
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                  active ? "bg-[#FDE8EC]" : ""
                }`}>
                  {tab.icon}
                </span>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <ReferralAttribution />
    </div>
  );
}
