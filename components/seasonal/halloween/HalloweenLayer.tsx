"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isHalloweenActive } from "@/lib/seasonal";

/**
 * HalloweenLayer: Conditional loader for Halloween seasonal components
 * 
 * Only loads when:
 * - isHalloweenActive() returns true
 * - Uses dynamic import with ssr:false to avoid extra JS when inactive
 * 
 * Mount points:
 * - HeroPumpkins: overlay on hero section
 * - PotionCauldron: after ChatBot / Sign in block, before #seo-ssr-faq
 * - ButtonGlow: wraps #generate and Sign in link
 */

const HeroPumpkins = dynamic(() => import("./HeroPumpkins"), { ssr: false });
const PotionCauldron = dynamic(() => import("./PotionCauldron"), { ssr: false });

export function HalloweenHeroOverlay() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActive(isHalloweenActive(params));
  }, []);

  if (!active) return null;

  return <HeroPumpkins />;
}

export function HalloweenCauldronSection() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActive(isHalloweenActive(params));
  }, []);

  if (!active) return null;

  return <PotionCauldron />;
}
