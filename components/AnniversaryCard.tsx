"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useState, type ReactNode } from "react";
import { poems } from "@/data/poetry";
import { card, witnessLine } from "@/data/spiritual";
import { L, useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import Sparkles from "./Sparkles";
import Heart from "./ui/Heart";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

type Face = "front" | "inside" | "back";

/** A small geometric motif for the cover – an eight-pointed star in gold line. */
function Motif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <g fill="none" stroke="#F7C873" strokeWidth="1.4">
        <rect x="22" y="22" width="56" height="56" />
        <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
        <circle cx="50" cy="50" r="14" />
        <circle cx="50" cy="50" r="4" fill="#F7C873" stroke="none" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="50" y1="50" x2="50" y2="8" transform={`rotate(${a} 50 50)`} opacity="0.5" />
        ))}
      </g>
    </svg>
  );
}

/** Pointer tilt (desktop) + gentle idle float (everywhere) for the card faces. */
function TiltCard({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 16 });
  return (
    <motion.div
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div animate={reduce ? {} : { y: [0, -6, 0], rotateZ: [-0.6, 0.6, -0.6] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * The emerald-and-gold anniversary card: front cover → inside (shayari | message) → back cover.
 * Tap the card to turn it.
 */
export default function AnniversaryCard() {
  const { go } = useNav();
  const { t, mode } = useLang();
  const reduce = useReducedMotion();
  const [face, setFace] = useState<Face>("front");
  const next = t(card.next);
  const hint = card.openHint;
  const showRoman = mode !== "ur";

  const turn = () => setFace((f) => (f === "front" ? "inside" : f === "inside" ? "back" : "front"));

  return (
    <StageWrap mood="goldenHour" ambient={<Sparkles count={14} color="#F7C873" seed={101} />} contentClassName="!max-w-3xl">
      <div className="flex flex-col items-center gap-6">
        <div className="w-full" style={{ perspective: 1600 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={face}
              initial={{ rotateY: reduce ? 0 : -70, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: reduce ? 0 : 70, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="card-face mx-auto"
              style={{ transformStyle: "preserve-3d" }}
            >
              <TiltCard>
              {face === "front" && (
                <button type="button" onClick={turn} className="emerald gold-foil mx-auto flex aspect-[3/4] w-[min(88vw,380px)] flex-col items-center justify-between p-5 text-center shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]" aria-label="Open the card">
                  <div className="gold-foil-inner flex h-full w-full flex-col items-center justify-between rounded-sm px-4 py-8">
                    <p className="text-xs uppercase tracking-[0.4em] text-gold/80">4th anniversary</p>
                    <Motif className="h-36 w-36 drop-shadow-[0_0_14px_rgba(247,200,115,0.45)]" />
                    <div>
                      <p className="display text-2xl font-semibold gold-text sm:text-3xl">{card.names}</p>
                      <L t={card.frontTitle} as="p" className="mt-3 text-gold" enClassName="font-serif text-lg italic sm:text-xl" urduClassName="text-xl" />
                    </div>
                    <L t={hint} as="span" className="text-xs tracking-widest text-gold/60" />
                  </div>
                </button>
              )}

              {face === "inside" && (
                <button type="button" onClick={turn} className="mx-auto grid w-[min(92vw,760px)] gap-3 text-left sm:grid-cols-2 sm:gap-0" aria-label="Turn to the back of the card">
                  <div className="gold-foil bg-[#fff8ec] p-5 text-[#1d1a15] sm:rounded-l-sm">
                    <L t={card.insideLeftTitle} as="p" className="mb-3 text-center text-xs uppercase tracking-[0.4em] text-[#8a6a2a]" urduClassName="text-base normal-case tracking-normal" />
                    <div className="flex flex-col gap-4 text-right" dir="rtl" lang="ur">
                      {poems.map((poem, i) => (
                        <div key={i}>
                          {poem.lines.map((line, k) => (
                            <p key={k} className="font-urdu text-[1.05rem] leading-[2.2] text-[#2a2118] sm:text-lg">
                              {line.ur}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="gold-foil bg-[#fff8ec] p-5 text-[#1d1a15] sm:rounded-r-sm">
                    <L t={card.insideRightTitle} as="p" className="mb-3 text-center text-xs uppercase tracking-[0.4em] text-[#8a6a2a]" urduClassName="text-base normal-case tracking-normal" />
                    {mode !== "en" && (
                      <p className="font-urdu text-right text-[1.05rem] leading-[2.2] text-[#2a2118] sm:text-lg" dir="rtl" lang="ur">
                        {card.message.ur}
                      </p>
                    )}
                    {mode === "en" && <p className="font-serif text-base leading-relaxed text-[#2a2118] sm:text-lg">{card.message.en}</p>}
                    {showRoman && <p className="mt-3 font-serif text-sm italic leading-relaxed text-[#6b5433]">{card.message.roman}</p>}
                    <p className="mt-4 font-urdu text-right text-base leading-[2.2] text-[#4a3a22]" dir="rtl" lang="ur">
                      {card.extra.ur}
                    </p>
                  </div>
                </button>
              )}

              {face === "back" && (
                <button type="button" onClick={turn} className="emerald gold-foil mx-auto flex aspect-[3/4] w-[min(88vw,380px)] flex-col items-center justify-end p-5 text-center shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]" aria-label="Back to the front of the card">
                  <div className="gold-foil-inner flex h-full w-full flex-col items-center justify-between rounded-sm px-4 py-8">
                    <p className="font-urdu text-[1.05rem] leading-[2.2] text-gold/90" dir="rtl" lang="ur">
                      {witnessLine.ur}
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      <p className="font-urdu text-3xl leading-[2] gold-text sm:text-4xl" dir="rtl" lang="ur">
                        {card.backCalligraphy}
                      </p>
                      <L t={card.backSub} as="span" className="text-xs tracking-[0.3em] text-gold/70" />
                      <Heart className="mt-2 h-5 w-5 text-gold" />
                    </div>
                  </div>
                </button>
              )}
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2" aria-hidden>
          {(["front", "inside", "back"] as Face[]).map((f) => (
            <span key={f} className={`h-1.5 w-6 rounded-full ${face === f ? "bg-gold" : "bg-white/15"}`} />
          ))}
        </div>

        <StageButton onClick={() => go("finalMessage")} variant="soft" delay={1} urdu={next.urdu}>
          {next.text}
        </StageButton>
      </div>
    </StageWrap>
  );
}
