"use client";

import { useMemo } from "react";
import Heart from "./ui/Heart";
import { range, seeded } from "@/lib/random";

type Props = {
  count?: number;
  /** speed multiplier – higher = slower */
  slow?: number;
  color?: string;
  opacity?: number;
  seed?: number;
};

/** CSS-only drifting hearts. Kept to a handful of DOM nodes, transform/opacity only. */
export default function FloatingHearts({ count = 14, slow = 1, color = "#FF4D6D", opacity = 0.5, seed = 7 }: Props) {
  const items = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      left: range(rand, 2, 96),
      size: range(rand, 10, 26),
      d: range(rand, 11, 22) * slow,
      delay: -range(rand, 0, 20),
      dx: range(rand, -60, 60),
      o: range(rand, 0.25, 1) * opacity,
      s: range(rand, 0.7, 1.2),
      key: i,
    }));
  }, [count, slow, opacity, seed]);

  return (
    <div className="ambient" aria-hidden>
      {items.map((h) => (
        <span
          key={h.key}
          className="heart-float"
          style={
            {
              left: `${h.left}%`,
              width: h.size,
              height: h.size,
              color,
              "--d": `${h.d}s`,
              "--delay": `${h.delay}s`,
              "--dx": `${h.dx}px`,
              "--o": h.o,
              "--s": h.s,
            } as React.CSSProperties
          }
        >
          <Heart className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}
