import type { CSSProperties } from "react";

export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="ambient-blob -left-40 -top-40 h-[34rem] w-[34rem]"
        style={{ "--dur": "26s" } as CSSProperties}
      />
      <div
        className="ambient-blob -right-48 top-1/3 h-[30rem] w-[30rem]"
        style={{ "--dur": "34s", animationDelay: "-9s" } as CSSProperties}
      />
      <div
        className="ambient-blob -bottom-52 left-1/3 h-[36rem] w-[36rem]"
        style={{ "--dur": "40s", animationDelay: "-17s" } as CSSProperties}
      />
      <div className="ambient-dotgrid absolute inset-0" />
    </div>
  );
}
