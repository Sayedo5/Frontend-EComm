"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useNav } from "@/lib/nav";
import { useHeartBurst } from "./HeartBurst";

type Props = {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "ghost" | "gold" | "soft";
  className?: string;
  delay?: number;
  urdu?: boolean;
  ariaLabel?: string;
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-gradient-to-br from-rose via-rosered to-crimson text-warmwhite shadow-[0_10px_40px_-10px_rgba(255,77,109,0.7)] hover:shadow-[0_14px_48px_-8px_rgba(255,77,109,0.85)]",
  gold: "bg-gradient-to-br from-[#fbe2a8] via-gold to-[#d9a24d] text-maroon-deepest shadow-[0_10px_40px_-10px_rgba(247,200,115,0.7)]",
  ghost: "bg-white/5 text-warmwhite border border-blush/30 backdrop-blur-sm hover:bg-white/10",
  soft: "bg-blush/15 text-warmwhite border border-blush/25 backdrop-blur-sm hover:bg-blush/25",
};

/**
 * The site's button. Every press emits a small heart burst (HeartBurstButton behaviour),
 * and buttons lock while a stage transition is running so she can't double-tap past a beat.
 */
export default function StageButton({ children, onClick, variant = "primary", className = "", delay = 0, urdu, ariaLabel }: Props) {
  const { locked } = useNav();
  const reduce = useReducedMotion();
  const { fire, layer } = useHeartBurst();
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      disabled={locked}
      onClick={(e) => {
        if (locked) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = e.clientX ? e.clientX - r.left : r.width / 2;
        const y = e.clientY ? e.clientY - r.top : r.height / 2;
        fire(x, y);
        onClick();
      }}
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileTap={locked ? undefined : reduce ? { scale: 0.97, opacity: 0.85 } : { scale: 0.96 }}
      className={`btn-shimmer ${variant === "primary" ? "btn-glow" : ""} relative inline-flex min-h-[52px] min-w-[44px] items-center justify-center rounded-full px-8 py-3 text-lg font-semibold tracking-wide transition-[box-shadow,background-color] duration-300 disabled:cursor-wait disabled:opacity-70 ${
        urdu ? "font-urdu text-xl leading-[2]" : ""
      } ${variants[variant]} ${className}`}
      lang={urdu ? "ur" : undefined}
      dir={urdu ? "rtl" : undefined}
    >
      {children}
      {layer}
    </motion.button>
  );
}

/** Alias so the name from the brief exists too. */
export const HeartBurstButton = StageButton;
