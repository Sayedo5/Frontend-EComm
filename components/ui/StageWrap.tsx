"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { moods, type Mood } from "@/lib/backgrounds";

type Props = {
  children: ReactNode;
  /**
   * Named background mood (see lib/backgrounds.ts). The global MoodLayer paints the stage's
   * mood and crossfades between screens; pass `mood` here only to override it for this screen.
   */
  mood?: Mood;
  paintOwnBackground?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Ambient layers rendered behind the content */
  ambient?: ReactNode;
  contentClassName?: string;
  dir?: "ltr" | "rtl";
  lang?: string;
};

/**
 * Full-screen stage container. Cinematic enter/exit (fade + rise + soft blur),
 * safe-area padding and the ambient layer. Background comes from <MoodLayer />.
 */
export default function StageWrap({ children, mood, paintOwnBackground = false, className = "", style, ambient, contentClassName = "", dir, lang }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      className={`stage stage-smooth ${className}`}
      style={{ background: paintOwnBackground && mood ? moods[mood] : "transparent", ...style }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={reduce ? { opacity: 0, transition: { duration: 0.2 } } : { opacity: 0, y: -22, scale: 0.99, filter: "blur(5px)", transition: { duration: 0.55, ease: "easeInOut" } }}
      transition={{ duration: reduce ? 0.2 : 1.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {ambient}
      <div className={`stage-content ${contentClassName}`} dir={dir} lang={lang}>
        {children}
      </div>
    </motion.section>
  );
}
