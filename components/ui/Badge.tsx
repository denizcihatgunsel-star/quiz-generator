import { type HTMLAttributes } from "react";

type Tone = "default" | "accent" | "success" | "warning" | "danger" | "outline";

const tones: Record<Tone, string> = {
  default: "bg-muted text-muted-foreground",
  accent: "bg-accent-soft text-accent",
  success: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  warning: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  danger: "bg-danger-soft text-danger",
  outline: "border border-border text-muted-foreground",
};

export function Badge({
  className = "",
  tone = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
      {...props}
    />
  );
}
