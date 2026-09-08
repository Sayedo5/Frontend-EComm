"use client";

import { useMemo } from "react";
import { range, seeded } from "@/lib/random";

type Props = {
  count?: number;
  /** speed multiplier – higher = slower fall */
  slow?: number;
  gold?: boolean;
  seed?: number;
};

/** Falling rose petals. Pure CSS keyframes, capped node count. */
export default function RosePetals({ count = 12, slow = 1, gold = false, seed = 3 }: Props) {
  const items = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      left: range(rand, 0, 100),
      w: range(rand, 9, 18),
      d: range(rand, 12, 22) * slow,
      delay: -range(rand, 0, 22),
      dx: range(rand, -80, 80),
      rot: range(rand, 260, 720),
      sway: range(rand, 14, 40),
      sd: range(rand, 2.4, 4.2),
      isGold: gold && rand() > 0.55,
      key: i,
    }));
  }, [count, slow, gold, seed]);

  return (
    <div className="ambient" aria-hidden>
      {items.map((p) => (
        <span
          key={p.key}
          className={`petal ${p.isGold ? "petal-gold" : ""}`}
          style={
            {
              left: `${p.left}%`,
              width: p.w,
              height: p.w * 1.25,
              "--d": `${p.d}s`,
              "--delay": `${p.delay}s`,
              "--dx": `${p.dx}px`,
              "--rot": `${p.rot}deg`,
              "--sway": `${p.sway}px`,
              "--sd": `${p.sd}s`,
            } as React.CSSProperties
          }
        >
          <span />
        </span>
      ))}
    </div>
  );
}
