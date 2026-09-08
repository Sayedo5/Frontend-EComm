"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A gold band with one small gem, drawn as pure SVG.
 * `RingShape` is an embeddable <g> so the same ring can live inside the hand SVG;
 * `RingAnimation` is the standalone, softly glowing version.
 */
export function RingShape({ glow = 1, id = "ring" }: { glow?: number; id?: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbe7b8" />
          <stop offset="0.45" stopColor="#F7C873" />
          <stop offset="1" stopColor="#c58a2f" />
        </linearGradient>
        <radialGradient id={`${id}-gem`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#ffd3dd" />
          <stop offset="1" stopColor="#ff4d6d" />
        </radialGradient>
      </defs>
      {/* glow halo */}
      <ellipse cx="50" cy="56" rx="40" ry="26" fill="#F7C873" opacity={0.18 * glow} />
      {/* back of band */}
      <ellipse cx="50" cy="56" rx="32" ry="19" fill="none" stroke={`url(#${id}-band)`} strokeWidth="7" opacity="0.9" />
      {/* inner shading for a bit of depth */}
      <ellipse cx="50" cy="56" rx="32" ry="19" fill="none" stroke="#7a4a12" strokeWidth="1.5" opacity="0.35" />
      {/* prongs + gem */}
      <path d="M43 38 L50 26 L57 38 Z" fill="#c58a2f" opacity="0.9" />
      <polygon points="50,15 60,26 50,40 40,26" fill={`url(#${id}-gem)`} stroke="#fff5f7" strokeWidth="1" />
      <polygon points="50,15 60,26 40,26" fill="#ffffff" opacity="0.55" />
      <circle cx="47" cy="22" r="2" fill="#fff" opacity="0.9" />
    </g>
  );
}

export default function RingAnimation({ size = 120, glow = 1, className = "", float = true }: { size?: number; glow?: number; className?: string; float?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={float && !reduce ? { y: [0, -8, 0], rotate: [-3, 3, -3] } : { y: 0 }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <div
        className="glow-orb"
        style={{
          width: size * 2,
          height: size * 2,
          background: `radial-gradient(circle, rgba(247,200,115,${0.4 * glow}) 0%, rgba(247,200,115,${0.12 * glow}) 40%, transparent 70%)`,
          "--d": "4s",
        } as React.CSSProperties}
      />
      <svg viewBox="0 0 100 100" className="relative h-full w-full" style={{ filter: "drop-shadow(0 0 10px rgba(247,200,115,0.55))" }}>
        <RingShape glow={glow} id="ring-standalone" />
      </svg>
    </motion.div>
  );
}
