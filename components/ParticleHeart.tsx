"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/*
 * ParticleHeart – canvas recreation of the reference video:
 * a dense field of glowing red/magenta/violet particles packed into a heart,
 * breathing slowly (scale 1 → 1.03 → 1), with glitter shimmer inside and
 * a few soft sparks drifting off the outer edge. No DOM particles.
 */

export type ParticleHeartProps = {
  size?: "fullscreen" | "large" | "medium" | "small";
  density?: "high" | "medium" | "low";
  intensity?: "normal" | "calm" | "burst";
  /** overall opacity of the layer */
  opacity?: number;
  className?: string;
};

type P = {
  bx: number; // base position (heart space, unit scale)
  by: number;
  r: number;
  color: string;
  phase: number;
  speed: number;
  edge: boolean; // eligible to spark off
  // spark state
  sparking: boolean;
  st: number; // spark progress 0..1
  sdx: number;
  sdy: number;
  sdur: number;
};

const PALETTE: { c: string; w: number }[] = [
  { c: "#FF2D55", w: 0.3 },
  { c: "#FF1B4C", w: 0.25 },
  { c: "#C9184A", w: 0.17 },
  { c: "#8B1E3F", w: 0.13 },
  { c: "#7B3FE4", w: 0.09 },
  { c: "#5A2FA8", w: 0.06 },
];

function pickColor(rand: () => number) {
  let x = rand();
  for (const p of PALETTE) {
    if (x < p.w) return p.c;
    x -= p.w;
  }
  return PALETTE[0].c;
}

/** Heart curve in a ~[-16,16] x [-17,13] box (y down). */
function heart(t: number) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
  };
}

const SIZE_PX: Record<NonNullable<ParticleHeartProps["size"]>, number | null> = { fullscreen: null, large: 360, medium: 240, small: 150 };
const DENSITY_N: Record<NonNullable<ParticleHeartProps["density"]>, [number, number]> = { high: [520, 780], medium: [300, 460], low: [150, 240] };

/** Pre-render one soft glowing dot as a sprite so each frame is cheap. */
function makeSprite(color: string, r: number) {
  const s = Math.ceil(r * 6);
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.18, color);
  g.addColorStop(0.5, color + "88");
  g.addColorStop(1, color + "00");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return c;
}

export default function ParticleHeart({ size = "medium", density = "medium", intensity = "normal", opacity = 1, className = "" }: ParticleHeartProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: P[] = [];
    let sprites = new Map<string, HTMLCanvasElement>();
    let halo: HTMLCanvasElement | null = null;
    let scale = 1;
    let cx = 0;
    let cy = 0;
    // Keep the cinematic particle heart crisp without doubling the canvas cost on mobile.
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.5);
    let seed = 12345;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const calm = intensity === "calm";
    const breathPeriod = calm ? 3.4 : 2.7;
    const sparkRate = intensity === "burst" ? 0.5 : calm ? 0.05 : 0.14; // sparks per frame probability

    const build = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const isMobile = window.innerWidth < 700;
      const [nm, nd] = DENSITY_N[density];
      const n = isMobile ? nm : nd;
      // fit the ~33-unit-wide heart into the box with a margin for the halo
      scale = (Math.min(w, h) * 0.72) / 34;
      cx = w / 2;
      cy = h / 2 + scale * 1.5;

      particles = [];
      for (let i = 0; i < n; i++) {
        const t = rand() * Math.PI * 2;
        // denser toward the core: bias radius to 1 (outline) for ~40%, else fill
        const u = rand();
        const rr = u < 0.3 ? 0.84 + rand() * 0.2 : Math.pow(rand(), 0.6) * 0.92;
        const p = heart(t);
        const jitter = 1.1;
        const bx = p.x * rr + (rand() - 0.5) * jitter;
        const by = p.y * rr + (rand() - 0.5) * jitter;
        const edge = rr > 0.9;
        const r = Math.max(1.2, (1.1 + rand() * 2.2) * (scale / 7.5));
        const color = pickColor(rand);
        particles.push({ bx, by, r, color, phase: rand() * Math.PI * 2, speed: 2 + rand() * 4, edge, sparking: false, st: 0, sdx: 0, sdy: 0, sdur: 1 });
      }
      sprites = new Map();
      for (const p of particles) {
        const key = p.color + "|" + Math.round(p.r * 2);
        if (!sprites.has(key)) sprites.set(key, makeSprite(p.color, Math.round(p.r * 2) / 2));
      }
      // halo: a large blurred heart in the same family
      halo = document.createElement("canvas");
      halo.width = Math.max(1, w * dpr);
      halo.height = Math.max(1, h * dpr);
      const hc = halo.getContext("2d")!;
      hc.setTransform(dpr, 0, 0, dpr, 0, 0);
      hc.filter = `blur(${Math.max(12, scale * 1.6)}px)`;
      hc.beginPath();
      for (let t = 0; t <= Math.PI * 2 + 0.01; t += 0.05) {
        const p = heart(t);
        const x = cx + p.x * scale * 1.12;
        const y = cy + p.y * scale * 1.12;
        if (t === 0) hc.moveTo(x, y);
        else hc.lineTo(x, y);
      }
      hc.closePath();
      hc.fillStyle = "rgba(255, 45, 85, 0.9)";
      hc.fill();
      hc.filter = "none";
    };

    const drawFrame = (time: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const t = time / 1000;
      const breath = reduce ? 1 : 1 + 0.015 + 0.015 * Math.sin((t / breathPeriod) * Math.PI * 2);
      const glowBoost = reduce ? 0.4 : 0.34 + 0.16 * ((breath - 1) / 0.03);

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = opacity;
      // halo behind everything
      if (halo) {
        ctx.save();
        ctx.globalAlpha = opacity * glowBoost;
        ctx.translate(cx, cy);
        ctx.scale(breath, breath);
        ctx.translate(-cx, -cy);
        ctx.drawImage(halo, 0, 0, w, h);
        ctx.restore();
      }

      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        // occasional spark-off from the edge
        if (!reduce && p.edge && !p.sparking && Math.random() < sparkRate / particles.length) {
          p.sparking = true;
          p.st = 0;
          const ang = Math.atan2(p.by, p.bx) + (Math.random() - 0.5) * 0.8;
          const dist = 6 + Math.random() * 16;
          p.sdx = Math.cos(ang) * dist;
          p.sdy = Math.sin(ang) * dist - 6 - Math.random() * 8;
          p.sdur = 1.6 + Math.random() * 1.4;
        }
        let x = cx + p.bx * scale * breath;
        let y = cy + p.by * scale * breath;
        let a = 0.55 + 0.45 * Math.sin(t * p.speed + p.phase); // micro shimmer
        if (p.sparking) {
          p.st += 1 / (60 * p.sdur);
          const e = Math.min(1, p.st);
          x += p.sdx * e;
          y += p.sdy * e;
          a *= 1 - e;
          if (p.st >= 1) {
            p.sparking = false;
            // respawn at a fresh edge position
            const tt = Math.random() * Math.PI * 2;
            const hp = heart(tt);
            const rr = 0.88 + Math.random() * 0.16;
            p.bx = hp.x * rr + (Math.random() - 0.5) * 0.9;
            p.by = hp.y * rr + (Math.random() - 0.5) * 0.9;
          }
        }
        if (reduce) a = 0.85;
        const sprite = sprites.get(p.color + "|" + Math.round(p.r * 2));
        if (!sprite) continue;
        const s = sprite.width;
        ctx.globalAlpha = opacity * Math.min(1, a);
        ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      drawFrame(now);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduce) {
      drawFrame(0);
    } else {
      raf = requestAnimationFrame(loop);
    }
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) drawFrame(0);
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, intensity, opacity, reduce]);

  const px = SIZE_PX[size];
  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none block ${size === "fullscreen" ? "h-full w-full" : ""} ${className}`}
      style={px ? { width: px, height: px } : undefined}
    />
  );
}
