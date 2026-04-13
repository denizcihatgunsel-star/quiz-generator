"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ReferralData {
  referralCode: string;
  bonusQuizzes: number;
  referralCount: number;
  referralLink: string;
}

export default function ReferralPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/referral")
        .then((r) => r.json())
        .then(setData)
        .finally(() => setLoading(false));
    }
  }, [session]);

  const copyLink = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <header className="border-b border-neutral-200 bg-[#f5f5f0]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-neutral-900 text-lg">Examina</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Dashboard</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Invite Friends</h1>
          <p className="text-neutral-500 mt-1">You both get 5 bonus quizzes when they sign up</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm text-center">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Friends Invited</p>
            <p className="text-3xl font-bold text-neutral-900">{data.referralCount}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm text-center">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Bonus Quizzes</p>
            <p className="text-3xl font-bold text-violet-600">{data.bonusQuizzes}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm text-center">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Per Referral</p>
            <p className="text-3xl font-bold text-emerald-500">+5</p>
          </div>
        </div>

        {/* Referral link */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm mb-8">
          <p className="text-sm font-medium text-neutral-900 mb-3">Your referral link</p>
          <div className="flex gap-2">
            <input
              readOnly
              value={data.referralLink}
              className="flex-1 px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-700 focus:outline-none"
            />
            <button
              onClick={copyLink}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors shrink-0"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-neutral-400 mt-3">
            Your code: <span className="font-mono font-medium text-neutral-600">{data.referralCode}</span>
          </p>
        </div>

        {/* How it works */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
          <p className="text-sm font-medium text-neutral-900 mb-4">How it works</p>
          <div className="space-y-4">
            {[
              { step: "1", text: "Share your link with a friend" },
              { step: "2", text: "They sign up using your link" },
              { step: "3", text: "You both get 5 bonus quizzes instantly" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-violet-50 border border-violet-200 text-violet-600 text-xs font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <p className="text-sm text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
