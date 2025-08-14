import { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={twMerge("rounded-xl border border-[color:var(--slate)]/60 bg-black/40 backdrop-blur-sm shadow-lg p-6", className)}>
      {children}
    </div>
  );
}