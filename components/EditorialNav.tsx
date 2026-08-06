"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

export default function EditorialNav() {
  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <div className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-[#EFEFED] bg-white/85 px-4 py-2.5 shadow-sm backdrop-blur-md sm:px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
            <span className="font-serif text-sm leading-none">E</span>
          </span>
          <span className="text-sm font-medium text-black">Examina</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <a href="#features" className="text-sm text-neutral-500 transition-colors duration-200 hover:text-black">
            Features
          </a>
          <Link href="/pricing" className="text-sm text-neutral-500 transition-colors duration-200 hover:text-black">
            Pricing
          </Link>
          <a href="#about" className="text-sm text-neutral-500 transition-colors duration-200 hover:text-black">
            About
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden text-sm text-neutral-500 transition-colors duration-200 hover:text-black sm:block"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="group flex items-center gap-2.5 rounded-full bg-[#EFEFED] py-1 pl-4 pr-1 transition-colors duration-200 hover:bg-[#E6E6E3]"
          >
            <span className="text-sm font-medium text-black">Create Quiz</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 group-hover:translate-x-0.5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
