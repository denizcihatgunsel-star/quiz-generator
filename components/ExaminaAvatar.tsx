"use client";

import { useEffect, useState } from "react";
import { isHalloweenActive } from "@/lib/seasonal";
import styles from "./ExaminaAvatar.module.css";

interface ExaminaAvatarProps {
  /** Box size in px (the avatar never grows past this box; ring/glow/badges are absolutely positioned). */
  size?: number;
  /** True while Examina is generating a reply: ring speeds up and the avatar bounces gently. */
  typing?: boolean;
  /** Show the small "online" status dot on the corner. */
  online?: boolean;
  className?: string;
}

/**
 * Examina's assistant avatar: the real brand mark (/logo.png) in a round dark
 * tile with a slowly rotating conic ring, a breathing glow and an online dot.
 * Halloween theme: teal→orange ring + a tiny pumpkin badge. Motion is
 * transform/opacity only and switches off under prefers-reduced-motion.
 */
export default function ExaminaAvatar({ size = 28, typing = false, online = true, className = "" }: ExaminaAvatarProps) {
  const [halloween, setHalloween] = useState(false);

  useEffect(() => {
    setHalloween(isHalloweenActive(new URLSearchParams(window.location.search)));
  }, []);

  return (
    <span
      className={`${styles.avatar} ${className}`}
      style={{ width: size, height: size }}
      data-typing={typing ? "true" : undefined}
    >
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.tile}>
        <img src="/logo.png?v=3" alt="Examina" width={size} height={size} className={styles.logo} />
      </span>
      {online && <span className={styles.dot} aria-hidden="true" />}
      {halloween && (
        <img src="/seasonal/halloween/pumpkin-flat.svg" alt="" aria-hidden="true" className={styles.pumpkin} />
      )}
    </span>
  );
}
