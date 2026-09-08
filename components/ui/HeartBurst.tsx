"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState, type ReactNode } from "react";
import Heart from "./Heart";

const COLORS = ["#FF4D6D", "#FFB3C6", "#FF4D6D", "#F7C873", "#FF4D6D", "#FFB3C6"];

type Burst = { id: number; x: number; y: number; hearts: { dx: number; rise: number; size: number; color: string; delay: number; rot: number }[] };

/**
 * Wrap any clickable element; on press it emits 6–10 small hearts that drift up and fade.
 * Cheap: a handful of absolutely positioned motion.divs, removed when done.
 */
export function useHeartBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const counter = useRef(0);
  const reduce = useReducedMotion();

  const fire = useCallback(
    (x: number, y: number) => {
      if (reduce) return;
      const id = ++counter.current;
      const n = 6 + Math.floor(Math.random() * 5);
      const hearts = Array.from({ length: n }, (_, i) => ({
        dx: (Math.random() - 0.5) * 60,
        rise: 60 + Math.random() * 60,
        size: 10 + Math.random() * 10,
        color: COLORS[(i + Math.floor(Math.random() * 3)) % COLORS.length],
        delay: i * 0.03,
        rot: (Math.random() - 0.5) * 40,
      }));
      setBursts((b) => [...b, { id, x, y, hearts }]);
      setTimeout(() => setBursts((b) => b.filter((k) => k.id !== id)), 1500);
    },
    [reduce],
  );

  const layer = (
    <span className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      <AnimatePresence>
        {bursts.map((b) =>
          b.hearts.map((h, i) => (
            <motion.span
              key={`${b.id}-${i}`}
              className="absolute block"
              style={{ left: b.x, top: b.y, width: h.size, height: h.size, color: h.color, marginLeft: -h.size / 2, marginTop: -h.size / 2 }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
              animate={{ opacity: [1, 1, 0], x: h.dx, y: -h.rise, scale: [0.4, 1.2, 0.8], rotate: h.rot }}
              transition={{ duration: 0.85 + Math.random() * 0.35, delay: h.delay, ease: "easeOut" }}
            >
              <Heart className="h-full w-full" />
            </motion.span>
          )),
        )}
      </AnimatePresence>
    </span>
  );

  return { fire, layer };
}

/** Standalone wrapper for non-button elements. */
export default function HeartBurst({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { fire, layer } = useHeartBurst();
  return (
    <span
      className={`relative inline-block ${className}`}
      onPointerDown={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        fire(e.clientX - r.left, e.clientY - r.top);
      }}
    >
      {children}
      {layer}
    </span>
  );
}
