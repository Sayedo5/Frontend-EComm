"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { moods, stageMood } from "@/lib/backgrounds";
import { useNav } from "@/lib/nav";
import Heart from "./ui/Heart";

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
          transition={{ duration: reduce ? 0.3 : 1.9, ease: [0.16, 1, 0.3, 1] }}
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
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35" aria-hidden>
          {[
            { left: "8%", top: "28%", size: "clamp(2.5rem, 7vw, 6rem)", color: "#ff4d6d", delay: 0 },
            { left: "82%", top: "20%", size: "clamp(2rem, 5vw, 4.5rem)", color: "#f7c873", delay: 1.8 },
            { left: "72%", top: "78%", size: "clamp(2.8rem, 8vw, 7rem)", color: "#ffb3c6", delay: 3.2 },
          ].map((heart, i) => (
            <motion.div
              key={`${mood}-${i}`}
              className="absolute heart-3d"
              style={{ left: heart.left, top: heart.top, width: heart.size, height: heart.size, color: heart.color }}
              animate={{ y: [0, -18, 0], x: [0, i % 2 ? 10 : -8, 0], rotate: [-8, 8, -8], scale: [0.88, 1.08, 0.88] }}
              transition={{ duration: 8 + i * 1.5, delay: heart.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-full w-full" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
