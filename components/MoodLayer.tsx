"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { moods, stageMood } from "@/lib/backgrounds";
import { useNav } from "@/lib/nav";

/**
 * A fixed background layer behind every screen. When the stage changes, the new mood
 * crossfades over the old one, so the theme shifts with the story instead of cutting.
 */
export default function MoodLayer() {
  const { stage } = useNav();
  const reduce = useReducedMotion();
  const mood = stageMood[stage];
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <AnimatePresence initial={false}>
        <motion.div
          key={mood}
          className="absolute inset-0"
          style={{ background: moods[mood] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.3 : 1.6, ease: "easeInOut" }}
        />
      </AnimatePresence>
      {/* a slow drifting light so even a still screen breathes */}
      {!reduce && (
        <motion.div
          className="absolute -inset-[20%] opacity-60"
          style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(255,179,198,0.09), transparent 45%)" }}
          animate={{ x: ["0%", "12%", "-6%", "0%"], y: ["0%", "8%", "-4%", "0%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
