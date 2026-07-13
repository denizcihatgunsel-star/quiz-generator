import { type HTMLAttributes } from "react";
import Link from "next/link";

export function Container({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`} {...props} />;
}

export function ContainerNarrow({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-3xl px-4 sm:px-6 ${className}`} {...props} />;
}

export function Wordmark({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 ${className}`}>
      <img src="/logo.png" alt="" className="h-7 w-7 rounded-lg object-cover" />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">Examina</span>
    </Link>
  );
}
