"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { memories } from "@/data/memories";
import { timeline, ui } from "@/data/loveMessages";
import { L, useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import Sparkles from "./Sparkles";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/** Interactive 3D memory constellation. No photos: each year reveals its own feeling. */
export default function MemoryTimeline() {
  const { go } = useNav();
  const { bt } = useLang();
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const button = bt(timeline.button);
  const active = selected === null ? null : memories[selected];

  return (
    <StageWrap mood="dusk" className="!justify-start" ambient={<Sparkles kind="star" count={24} seed={9} slow={1.2} />} contentClassName="!max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <L t={timeline.heading} as="h2" reveal className="display mt-2 text-3xl font-semibold text-blush sm:text-5xl" />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
        <L t={timeline.sub} as="p" className="mt-2 text-lg text-warmwhite/80 sm:text-xl" enClassName="italic" />
      </motion.div>

      <div className="relative mt-10 w-full [perspective:1400px]">
        <p className="mb-4 text-sm font-semibold tracking-wide text-gold/85 sm:text-base">Tap a year to open its feeling ✦</p>
        <motion.div className="rule-gold absolute left-4 right-4 top-1/2 z-0 hidden sm:block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.6, delay: 0.5 }} />
        <ol className="relative z-10 grid gap-5 sm:grid-cols-5" aria-label="Interactive memories by year">
          {memories.map((m, i) => {
            const isActive = selected === i;
            return (
              <motion.li key={m.year} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, rotateY: -18 }} animate={{ opacity: 1, y: 0, rotateY: isActive ? 0 : i % 2 ? 2 : -2 }} transition={{ duration: 0.8, delay: 0.5 + i * 0.16 }}>
                <motion.button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setSelected(isActive ? null : i)}
                  whileHover={reduce ? undefined : { y: -10, rotateX: 5, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`${isActive ? "Close" : "Open"} ${m.year} memory`}
                  className={`group relative w-full cursor-pointer touch-manipulation overflow-hidden rounded-[1.75rem] border text-left shadow-[0_25px_60px_-28px_rgba(0,0,0,0.95)] transition-colors ${isActive ? "border-gold/80 bg-white/[0.12]" : "border-gold/20 bg-white/[0.045] hover:border-blush/60"}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${m.tone}`}>
                    <motion.span className="memory-glyph relative z-10 font-serif text-7xl text-blush/95" animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-6, 6, -6], scale: [1, 1.1, 1] }} transition={{ duration: 3.5 + i * 0.45, repeat: Infinity, ease: "easeInOut" }}>{m.symbol}</motion.span>
                    <span className="memory-orbit absolute h-24 w-24 rounded-full border border-gold/45" />
                    <span className="memory-orbit memory-orbit-delayed absolute h-36 w-36 rounded-full border border-blush/25" />
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.24),transparent_30%,rgba(12,3,10,0.35)_78%)]" />
                    <span className="absolute bottom-3 left-4 rounded-full border border-gold/35 bg-maroon-deepest/60 px-3 py-1 text-xs tracking-[0.3em] text-gold">{m.year}</span>
                    <span className="absolute right-3 top-3 rounded-full border border-blush/35 bg-maroon-deepest/55 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-blush">{isActive ? "Tap to close" : "Tap to open"}</span>
                  </div>
                  <div className="p-4">
                    <L t={m.title} as="h3" className="display text-xl font-semibold text-warmwhite" urduClassName="text-right" />
                    <L t={m.caption} as="p" className="mt-2 line-clamp-2 text-base leading-snug text-blush/90" enClassName="italic" urduClassName="text-right" />
                  </div>
                </motion.button>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.section key={active.year} initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.55 }} className={`relative mt-7 w-full overflow-hidden rounded-[2rem] border border-gold/35 bg-gradient-to-br ${active.tone} p-6 text-center shadow-[0_28px_80px_-30px_rgba(255,77,109,0.55)] sm:p-8`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_45%)]" />
            <div className="relative">
              <motion.div className="text-5xl text-blush drop-shadow-[0_0_18px_rgba(255,77,109,0.8)]" animate={reduce ? undefined : { y: [0, -8, 0], scale: [1, 1.12, 1], rotate: [-5, 5, -5] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>{active.symbol}</motion.div>
              <div className="mt-2 text-xs tracking-[0.4em] text-gold">{active.year} · A PIECE OF US</div>
              <L t={active.title} as="h3" className="display mt-3 text-2xl font-semibold text-warmwhite sm:text-3xl" urduClassName="text-right" />
              <L t={active.caption} as="p" className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-blush sm:text-xl" enClassName="italic" urduClassName="text-right" />
              <p className="mt-4 text-sm tracking-wide text-warmwhite/60">Tap another year to open its feeling.</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <L t={ui.swipe} as="p" className="mt-4 text-xs tracking-widest text-blush/50 sm:hidden" />
      <div className="mt-8 pb-6">
        <StageButton onClick={() => go("loveQuestion")} delay={0.4}>{button.text}</StageButton>
      </div>
    </StageWrap>
  );
}
