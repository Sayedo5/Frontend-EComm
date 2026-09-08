"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/*
 * Real photographic hands for the Qabool sequence (CC0 photos in /public/images/hands,
 * see CREDITS.md there – swap in your own, keep the file names).
 * Four stages cross-fade; a soft "ring glint" travels between the ring's position in
 * each photo so the ring feels like one object moving from his hand to her finger.
 */

export type HandStage = "a" | "b" | "inserting" | "held";

type PhotoDef = { src: string; ratio: number; ring: { x: number; y: number }; alt: string; position?: string; filter?: string };

export const HAND_PHOTOS: Record<HandStage, PhotoDef> = {
  a: { src: "/images/hands/stage-a.jpg", ratio: 960 / 640, ring: { x: 0.49, y: 0.52 }, alt: "Two hands reaching toward each other", position: "55% 50%" },
  b: { src: "/images/hands/stage-b.jpg", ratio: 682 / 1024, ring: { x: 0.56, y: 0.61 }, alt: "His hand holding hers, the ring catching the light" },
  inserting: { src: "/images/hands/stage-c-inserting.jpg", ratio: 1024 / 683, ring: { x: 0.53, y: 0.29 }, alt: "The ring being placed on her finger", position: "50% 35%" },
  held: { src: "/images/hands/stage-c-held.jpg", ratio: 683 / 1024, ring: { x: 0.545, y: 0.535 }, alt: "Two hands held together, fingers interlaced, ring on her finger", filter: "sepia(0.6) saturate(0.75) contrast(1.05)" },
};

type Props = {
  stage: HandStage;
  className?: string;
  /** show the travelling ring glint */
  glint?: boolean;
  /** stronger, pulsing glint (once the ring is on) */
  settled?: boolean;
  onError?: () => void;
  /** container aspect ratio, e.g. "4 / 5" */
  aspect?: string;
};

/** Where a fractional point of a cover-fitted image lands inside the container. */
function coverPoint(W: number, H: number, ratio: number, fx: number, fy: number, position = "50% 50%") {
  const [px, py] = position.split(" ").map((v) => parseFloat(v) / 100);
  let w: number, h: number;
  if (ratio > W / H) {
    h = H;
    w = H * ratio;
  } else {
    w = W;
    h = W / ratio;
  }
  const ox = (W - w) * (isNaN(px) ? 0.5 : px);
  const oy = (H - h) * (isNaN(py) ? 0.5 : py);
  return { x: ox + fx * w, y: oy + fy * h };
}

export default function HandPhotos({ stage, className = "", glint = true, settled = false, onError, aspect = "4 / 5" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const def = HAND_PHOTOS[stage];
  const pt = size.w ? coverPoint(size.w, size.h, def.ratio, def.ring.x, def.ring.y, def.position) : null;
  const glintSize = Math.max(36, size.w * 0.16);

  return (
    <div ref={ref} className={`photo-grade relative overflow-hidden rounded-[2rem] ${className}`} style={{ aspectRatio: aspect }}>
      <AnimatePresence mode="sync">
        <motion.img
          key={stage}
          src={def.src}
          alt={def.alt}
          onError={onError}
          className="ken-burns absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: def.position ?? "50% 50%", filter: def.filter ?? "sepia(0.35) saturate(0.85) contrast(1.05)" }}
          initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduce ? 1 : 1.02, transition: { duration: 1.2 } }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* travelling ring glint – one element that moves between ring positions */}
      {glint && pt && (
        <motion.div
          className="pointer-events-none absolute z-[3]"
          style={{ width: glintSize, height: glintSize, marginLeft: -glintSize / 2, marginTop: -glintSize / 2 }}
          animate={{ left: pt.x, top: pt.y }}
          transition={reduce ? { duration: 0.2 } : { type: "spring", stiffness: 40, damping: 14, mass: 1.4 }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(247,200,115,0.55) 22%, rgba(247,200,115,0.12) 50%, transparent 70%)" }}
            animate={reduce ? {} : settled ? { scale: [0.7, 1.25, 0.7], opacity: [0.5, 1, 0.5] } : { scale: [0.8, 1, 0.8], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: settled ? 2 : 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {settled && (
            <motion.span
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.9)]"
              animate={{ opacity: [0, 1, 0], scale: [0.4, 2, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.4 }}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
