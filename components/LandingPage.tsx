"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;
const EASE_IN_OUT = [0.3, 0.7, 0.2, 0.8] as const;
const EASE_GENTLE = [0.3, 0.8, 0.2, 0.8] as const;

const fadeUpContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
};
const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE_IN_OUT } },
};
const viewportOnce = { once: true, margin: "-80px" } as const;

export default function LandingPage() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeOfDay, setTimeOfDay] = useState("day");

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      setTimeOfDay(hour >= 6 && hour < 18 ? "day" : "night");
    };

    window.addEventListener("mousemove", updateMousePosition);
    updateTimeOfDay();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const calculateMouseDistance = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const dx = mousePosition.x - (rect.left + rect.width / 2);
    const dy = mousePosition.y - (rect.top + rect.height / 2);
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background - Breathing effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-background to-indigo-50/50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20"
        animate={timeOfDay === "day" ? { scale: [1, 1.02, 1] } : { scale: [1, 0.98, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navigation - Enhanced with subtle shadow and smooth hover */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 cursor-pointer group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover:shadow-violet-500/25 transition-all">
                E
              </div>
              <span className="font-medium text-foreground tracking-tight">Examina</span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </motion.button>

            <div className="hidden sm:flex items-center gap-8">
              {[
                { id: "features", label: "landing.features" },
                { id: "how-it-works", label: "landing.howItWorks" },
                { id: "faq", label: "landing.faq" },
              ].map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 relative group"
                  whileHover={{ y: -2 }}
                >
                  {t(item.label)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Enhanced with human touch and interactive elements */}
      <motion.section
        className="pt-36 sm:pt-48 pb-32 relative"
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <div className="max-w-5xl mx-auto px-6 relative">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            variants={fadeUpContainer}
          >
            <motion.div
              variants={fadeUpItem}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 text-sm text-accent"
              whileHover={{ scale: 1.05, backgroundColor: "var(--accent-soft)" }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-success animate-pulse"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>{t("landing.aiPowered")}</span>
            </motion.div>

            <motion.h1
              variants={fadeUpItem}
              className="text-4xl sm:text-6xl lg:text-7xl font-medium text-foreground tracking-tight leading-[1.08] mb-8"
            >
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
            </motion.h1>

            <motion.p
              variants={fadeUpItem}
              className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              variants={fadeUpItem}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.a
                href="/auth/register"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-[calc(0.5rem-2px)] text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{t("hero.createAccount")}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: EASE_IN_OUT }}
                />
              </motion.a>

              <motion.a
                href="#features"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-[calc(0.5rem-2px)] text-sm font-medium border border-border/30 text-foreground hover:bg-muted/50 hover:border-border transition-all duration-200"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{t("hero.learnMore")}</span>
                <motion.div
                  className="absolute inset-0 bg-muted/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                />
              </motion.a>
            </motion.div>

            {/* Enhanced stats with micro-interactions */}
            <motion.div
              variants={fadeUpItem}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              {[
                { number: "29", label: "Languages", icon: "🌍" },
                { number: "4", label: "Question Types", icon: "📋" },
                { number: "<30s", label: "Generation Time", icon: "⚡" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                >
                  <motion.div
                    className="text-3xl mb-2 group-hover:rotate-12 transition-transform duration-300"
                    whileHover={{ scale: 1.2 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.p
                    className="text-2xl font-medium text-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-xs text-muted-foreground/70 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced floating elements - subtle and natural */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 rounded-full bg-violet-500/20 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-purple-500/10 blur-3xl"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.section>

      {/* Enhanced Features Section */}
      <motion.section
        id="features"
        className="py-32 bg-card relative overflow-hidden"
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <div className="max-w-5xl mx-auto px-6 relative">
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-full blur-3xl"
          />

          <motion.p
            variants={fadeUpItem}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70 mb-6"
          >
            {t("landing.howItWorks")}
          </motion.p>

          <motion.h2
            variants={fadeUpItem}
            className="text-3xl sm:text-4xl font-medium text-foreground leading-tight mb-20"
          >
            {t("landing.pasteGenerateStudy")}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-12 relative z-10"
            variants={fadeUpContainer}
          >
            {[
              { step: "01", title: "Add your content", desc: "Paste lesson notes, an article, or upload a PDF. Anything between 50 and 15,000 characters.", icon: "📝" },
              { step: "02", title: "AI builds the quiz", desc: "Examina reads your content and creates questions across difficulty levels and Bloom's Taxonomy.", icon: "🧠" },
              { step: "03", title: "Study and share", desc: "Take the quiz instantly. Track your score. Share it with a link or download as PDF.", icon: "📚" },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={scaleIn}
                className="group relative"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center text-2xl hover:bg-accent/20 transition-all shadow-lg group-hover:shadow-xl"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <span role="img" aria-label="step icon" className="block transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                </motion.div>

                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                >
                  {item.step}
                </motion.div>

                <h3 className="text-foreground font-medium mt-3 mb-2 text-lg group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
                  {item.desc}
                </p>

                {/* Subtle connecting line */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform translate-x-[-50%] w-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full group-hover:w-16 transition-all duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1, width: "4rem" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Numbers Section */}
      <section className="py-32 border-t border-border relative">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-12"
            variants={fadeUpContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {[
              { number: "29", label: "Languages supported", icon: "🌍", color: "text-violet-500" },
              { number: "4", label: "Question types", icon: "📋", color: "text-indigo-500" },
              { number: "<30s", label: "Generation time", icon: "⚡", color: "text-purple-500" },
              { number: "Free", label: "To get started", icon: "🎁", color: "text-pink-500" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                transition={{ delay: i * 0.1 }}
                className="text-center group cursor-pointer"
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl sm:text-5xl mb-4 group-hover:rotate-12 transition-transform duration-300"
                  whileHover={{ scale: 1.2 }}
                >
                  <span className={stat.color}>{stat.icon}</span>
                </motion.div>
                <motion.p
                  className="text-4xl sm:text-5xl font-medium text-foreground group-hover:text-accent transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-sm text-muted-foreground/70 mt-2 group-hover:text-muted-foreground transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}