"use client";

import { forwardRef } from "react";
import { RingShape } from "./RingAnimation";

/*
 * Original fine-line hand illustrations (gold on the dark stage). No stock imagery.
 * Coordinate system for a single hand: viewBox 0 0 200 300, fingers pointing up,
 * thumb on the left. The girl's hand uses this as-is; the boy's hand is mirrored.
 */

export const HAND_VIEWBOX = "0 0 200 300";
/** Where a ring sits on the ring finger, in hand coordinates. */
export const RING_ANCHOR = { x: 135, y: 118 };
/** Direction of the ring finger (a second point further up the finger). */
export const RING_ANCHOR_UP = { x: 135, y: 60 };
/** Half of the ring-finger width, in hand coordinates. */
export const FINGER_HALF_WIDTH = 16;

const HAND_PATH =
  "M62 300 L52 232 C40 210 14 180 8 158 C2 144 14 132 26 140 C38 148 48 168 50 178 L46 150 L44 62 C44 44 74 44 74 62 L78 148 L82 148 L82 36 C82 18 114 18 114 36 L116 148 L120 148 L120 46 C120 28 150 28 150 46 L152 152 L156 152 L158 82 C158 64 184 64 184 82 L180 170 C190 215 178 260 168 300 Z";

const CREASES = [
  "M48 104 q 12 -4 24 0",
  "M86 84 q 13 -4 26 0",
  "M124 94 q 13 -4 26 0",
  "M160 124 q 11 -4 22 0",
  "M52 148 q 12 -5 24 0",
  "M85 128 q 13 -5 26 0",
  "M123 138 q 13 -5 26 0",
  "M14 152 q 8 -6 16 -2",
  "M70 205 q 35 -28 85 -18",
  "M66 238 q 42 -22 98 -6",
];

type HandProps = {
  mirror?: boolean;
  className?: string;
  /** show a ring on the ring finger (used once the ring "slides on") */
  ring?: boolean;
  ringScale?: number;
  tone?: "gold" | "blush";
  id: string;
};

export const HandSvg = forwardRef<SVGSVGElement, HandProps>(function HandSvg({ mirror, className = "", ring, ringScale = 1, tone = "gold", id }, ref) {
  const stroke = tone === "gold" ? "#F7C873" : "#FFB3C6";
  return (
    <svg ref={ref} viewBox={HAND_VIEWBOX} className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf8" stopOpacity="0.98" />
          <stop offset="0.52" stopColor="#f6d8d5" stopOpacity="0.98" />
          <stop offset="1" stopColor="#c9898d" stopOpacity="0.98" />
        </linearGradient>
      </defs>
      <g transform={mirror ? "translate(200 0) scale(-1 1)" : undefined}>
        <path d={HAND_PATH} fill={`url(#${id}-fill)`} stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        {CREASES.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
        ))}
        {/* invisible anchors used to measure where the ring finger is on screen */}
        <circle data-anchor="ring" cx={RING_ANCHOR.x} cy={RING_ANCHOR.y} r="1" fill="none" />
        <circle data-anchor="up" cx={RING_ANCHOR_UP.x} cy={RING_ANCHOR_UP.y} r="1" fill="none" />
        <circle data-anchor="edge" cx={RING_ANCHOR.x + FINGER_HALF_WIDTH} cy={RING_ANCHOR.y} r="1" fill="none" />
        {ring && (
          <g transform={`translate(${RING_ANCHOR.x} ${RING_ANCHOR.y}) scale(${(FINGER_HALF_WIDTH / 32) * 1.12 * ringScale}) translate(-50 -56)`}>
            <RingShape id={`${id}-ring`} glow={1.2} />
          </g>
        )}
      </g>
    </svg>
  );
});

/* ---------------- Final pose: her hand resting in his, ring on her finger ---------------- */

type HeldProps = { className?: string; id?: string; ring?: boolean };

/** The two hands composed together (his from the left, hers resting on top from the right). */
export function HandsHeld({ className = "", id = "held", ring = true }: HeldProps) {
  return (
    <div className={`relative aspect-[5/4] w-full ${className}`} aria-hidden>
      <div className="absolute bottom-0 left-[2%] w-1/2" style={{ transform: "translate(22%, 0) rotate(30deg)", transformOrigin: "bottom center" }}>
        <HandSvg id={`${id}-boy`} mirror tone="gold" />
      </div>
      <div className="absolute bottom-0 right-[2%] w-1/2" style={{ transform: "translate(-22%, 4%) rotate(-25deg)", transformOrigin: "bottom center" }}>
        <HandSvg id={`${id}-girl`} tone="blush" ring={ring} />
      </div>
    </div>
  );
}

/** A small stylised rose for the bloom moment. viewBox 0 0 80 80. */
export function Rose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      {/* leaves */}
      <path d="M26 62 C10 60 6 48 14 44 C24 40 30 50 26 62 Z" fill="#2f6b3a" />
      <path d="M54 64 C70 62 74 50 66 46 C56 42 50 52 54 64 Z" fill="#3c7a48" />
      <path d="M14 46 L26 60" stroke="#1f4a28" strokeWidth="1" />
      <path d="M66 48 L54 62" stroke="#1f4a28" strokeWidth="1" />
      {/* outer petals */}
      <path d="M40 66 C18 66 8 48 14 34 C20 20 34 16 40 26 C46 16 60 20 66 34 C72 48 62 66 40 66 Z" fill="#a3123a" />
      <path d="M40 62 C22 62 14 48 19 36 C24 26 34 24 40 32 C46 24 56 26 61 36 C66 48 58 62 40 62 Z" fill="#C9184A" />
      {/* spiral heart of the rose */}
      <path
        d="M40 42 a2 2 0 1 1 3 1 a4 4 0 1 1 -6 -2 a7 7 0 1 1 11 4 a10 10 0 1 1 -17 -6 a14 14 0 1 1 23 8"
        fill="none"
        stroke="#FFB3C6"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path d="M22 44 C22 30 34 22 46 28" fill="none" stroke="#ff7a94" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
