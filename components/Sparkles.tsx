"use client";

import { useMemo } from "react";
import { range, seeded } from "@/lib/random";

type Props = {
  count?: number;
  color?: string;
  /** spark = gold twinkles, dust = slow drifting field, bokeh = soft blurred light circles, star = tiny white stars */
  kind?: "spark" | "dust" | "bokeh" | "star";
  slow?: number;
  seed?: number;
  sizeRange?: [number, number];
};

/** Twinkling sparks, drifting dust, soft bokeh or tiny stars. CSS-only, capped node count. */
export default function Sparkles({ count = 18, color = "#F7C873", kind = "spark", slow = 1, seed = 11, sizeRange }: Props) {
  const items = useMemo(() => {
    const sizes: [number, number] = sizeRange ?? (kind === "bokeh" ? [24, 90] : kind === "star" ? [1.5, 3] : [3, 7]);
    const rand = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      left: range(rand, 0, 100),
      top: range(rand, 0, 100),
      size: range(rand, sizes[0], sizes[1]),
      d: range(rand, 14, 30) * slow,
      td: range(rand, 3, 8) * slow,
      delay: -range(rand, 0, 20),
      dx: range(rand, -50, 50),
      dy: range(rand, -80, 40),
      o: range(rand, 0.4, 1),
      key: i,
    }));
  }, [count, slow, seed, sizeRange, kind]);

  return (
    <div className="ambient" aria-hidden>
      {items.map((s) => (
        <span
          key={s.key}
          className={kind}
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              "--c": color,
              "--d": kind === "spark" || kind === "star" ? `${s.td}s` : `${s.d}s`,
              "--td": `${s.td}s`,
              "--delay": `${s.delay}s`,
              "--dx": `${s.dx}px`,
              "--dy": `${s.dy}px`,
              "--o": s.o,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Soft swinging light rays for the hero / counter. */
export function LightRays({ count = 5 }: { count?: number }) {
  const rays = useMemo(() => {
    const rand = seeded(5);
    return Array.from({ length: count }, (_, i) => ({
      left: range(rand, 20, 80),
      r: range(rand, -22, 22),
      d: range(rand, 12, 20),
      delay: -range(rand, 0, 10),
      key: i,
    }));
  }, [count]);
  return (
    <div className="ambient" aria-hidden>
      {rays.map((r) => (
        <span
          key={r.key}
          className="ray"
          style={{ left: `${r.left}%`, "--r": `${r.r}deg`, "--d": `${r.d}s`, "--delay": `${r.delay}s` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
