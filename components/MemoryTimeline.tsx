"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  const touchHandled = useRef(false);
  const activeCardRef = useRef<HTMLLIElement>(null);
  const button = bt(timeline.button);
  const openMemory = (index: number) => setSelected((current) => (current === index ? null : index));

  useEffect(() => {
    if (selected === null) return;
    const frame = window.requestAnimationFrame(() => {
      activeCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selected]);

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
              <motion.li ref={isActive ? activeCardRef : undefined} key={m.year} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, rotateY: -18 }} animate={{ opacity: 1, y: 0, rotateY: isActive ? 0 : i % 2 ? 2 : -2 }} transition={{ duration: 0.8, delay: 0.5 + i * 0.16 }} className="scroll-mt-24">
                <motion.button
                  type="button"
                  aria-expanded={isActive}
                  onPointerUp={(event) => {
                    if (event.pointerType === "touch") {
                      touchHandled.current = true;
                      openMemory(i);
                      window.setTimeout(() => { touchHandled.current = false; }, 500);
                    }
                  }}
                  onClick={() => {
                    if (!touchHandled.current) openMemory(i);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openMemory(i);
                    }
                  }}
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
                {isActive && (
                  <motion.section
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative mt-3 overflow-hidden rounded-[1.5rem] border border-gold/35 bg-gradient-to-br ${m.tone} p-5 text-center shadow-[0_22px_55px_-28px_rgba(255,77,109,0.5)]`}
                  >
                    <motion.div animate={reduce ? undefined : { y: [0, -6, 0], scale: [1, 1.1, 1], rotate: [-5, 5, -5] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} className="text-4xl text-blush">{m.symbol}</motion.div>
                    <div className="mt-2 text-[0.65rem] tracking-[0.32em] text-gold">{m.year} · A PIECE OF US</div>
                    <L t={m.caption} as="p" className="mt-3 text-base leading-relaxed text-blush" enClassName="italic" urduClassName="text-right" />
                  </motion.section>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>

      <L t={ui.swipe} as="p" className="mt-4 text-xs tracking-widest text-blush/50 sm:hidden" />
      <div className="mt-8 pb-6">
        <StageButton onClick={() => go("loveQuestion")} delay={0.4}>{button.text}</StageButton>
      </div>
    </StageWrap>
  );
}
