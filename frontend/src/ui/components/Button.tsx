import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };

export function Button({ className, variant = "primary", ...props }: Props) {
  const base = "px-4 py-2 rounded-md transition-all duration-180 ease-in-out outline-offset-2 focus:outline focus:outline-2";
  const variants = {
    primary: "bg-[var(--gold)] text-black hover:opacity-90 focus:outline-[var(--gold)]",
    ghost: "bg-transparent text-[var(--text)] border border-[var(--slate)] hover:bg-[var(--slate)]/40 focus:outline-[var(--slate)]",
  };

  return (
    <button
      className={twMerge(base, variants[variant], className)}
      {...props}
    />
  );
}