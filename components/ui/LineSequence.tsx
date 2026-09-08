"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type SeqLine = {
  text: ReactNode;
  /** how long this line stays before the next one (ms) */
  hold?: number;
  className?: string;
  urdu?: boolean;
};

type Props = {
  lines: SeqLine[];
  /** replace = one line at a time; stack = lines accumulate */
  mode?: "replace" | "stack";
  /** default hold per line in ms */
  gap?: number;
  startDelay?: number;
  onDone?: () => void;
  /** keep the last line on screen after the sequence finishes (replace mode) */
  keepLast?: boolean;
  /** tap anywhere on the block to move to the next line sooner */
  tapToAdvance?: boolean;
  className?: string;
  lineClassName?: string;
  /** vertical rise distance in px */
  rise?: number;
  /** enter/exit durations in seconds */
  duration?: number;
};

/**
 * Shows lines one after another with a slow fade + rise. Drives most of the story pacing.
 */
export default function LineSequence({
  lines,
  mode = "replace",
  gap = 2400,
  startDelay = 500,
  onDone,
  keepLast = true,
  tapToAdvance = true,
  className = "",
  lineClassName = "",
  rise = 18,
  duration = 0.9,
}: Props) {
  const [i, setI] = useState(-1);
  const done = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setI(0), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (i < 0) return;
    if (i >= lines.length) {
      if (!done.current) {
        done.current = true;
        onDone?.();
      }
      return;
    }
    const hold = lines[i].hold ?? gap;
    const t = setTimeout(() => setI((v) => v + 1), hold);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, lines.length, gap]);

  const advance = useCallback(() => {
    if (!tapToAdvance) return;
    setI((v) => (v >= 0 && v < lines.length ? v + 1 : v));
  }, [tapToAdvance, lines.length]);

  const shownIndex = Math.min(i, lines.length - 1);
  const visible = mode === "replace" ? (i >= 0 && (i < lines.length || keepLast) ? [shownIndex] : []) : lines.map((_, k) => k).filter((k) => k <= shownIndex && i >= 0);

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center gap-4 ${className}`}
      onClick={advance}
      role={tapToAdvance ? "presentation" : undefined}
    >
      {mode === "replace" ? (
        <AnimatePresence mode="wait">
          {visible.map((k) => (
            <motion.p
              key={k}
              className={`display ${lines[k].urdu ? "font-urdu leading-[2.1]" : ""} ${lineClassName} ${lines[k].className ?? ""}`}
              lang={lines[k].urdu ? "ur" : undefined}
              dir={lines[k].urdu ? "rtl" : undefined}
              initial={{ opacity: 0, y: reduce ? 0 : rise, filter: reduce ? "none" : "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: reduce ? 0 : -rise * 0.6, filter: reduce ? "none" : "blur(4px)", transition: { duration: duration * 0.6 } }}
              transition={{ duration, ease: "easeOut" }}
            >
              {lines[k].text}
            </motion.p>
          ))}
        </AnimatePresence>
      ) : (
        visible.map((k) => (
          <motion.p
            key={k}
            className={`display ${lines[k].urdu ? "font-urdu leading-[2.1]" : ""} ${lineClassName} ${lines[k].className ?? ""}`}
            lang={lines[k].urdu ? "ur" : undefined}
            dir={lines[k].urdu ? "rtl" : undefined}
            initial={{ opacity: 0, y: reduce ? 0 : rise }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, ease: "easeOut" }}
          >
            {lines[k].text}
          </motion.p>
        ))
      )}
    </div>
  );
}
