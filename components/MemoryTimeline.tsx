"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memories } from "@/data/memories";
import { timeline, ui } from "@/data/loveMessages";
import { L, useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import Sparkles from "./Sparkles";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/** 5.5 – Memory timeline. Dusk gradient (maroon → deep blue), gold connecting line, horizontal snap on mobile. */
export default function MemoryTimeline() {
  const { go } = useNav();
  const { t } = useLang();
  const reduce = useReducedMotion();
  const button = t(timeline.button);

  return (
    <StageWrap mood="dusk" className="!justify-start" ambient={<Sparkles kind="star" count={18} seed={9} slow={1.2} />} contentClassName="!max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <L t={timeline.heading} as="h2" reveal className="display mt-2 text-3xl font-semibold text-blush sm:text-4xl" />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
        <L t={timeline.sub} as="p" className="mt-2 text-lg text-warmwhite/80" enClassName="italic" />
      </motion.div>

      <div className="relative mt-8">
        <motion.div className="rule-gold absolute left-0 right-0 top-[3.1rem] z-0" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }} />
        <ol className="snap-row relative z-10 -mx-5 flex gap-4 overflow-x-auto px-5 pb-4 pt-9 sm:mx-0 sm:px-0" aria-label="Memories by year">
          {memories.map((m, i) => (
            <motion.li
              key={m.year}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 + i * 0.35 }}
              className="snap-item relative w-[78vw] max-w-[17rem] shrink-0 sm:w-[15rem]"
            >
              <span className="absolute -top-9 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-maroon-deepest shadow-[0_0_14px_rgba(247,200,115,0.8)]">
                <span className="h-2 w-2 rounded-full bg-gold" />
              </span>
              <article className="overflow-hidden rounded-3xl border border-gold/20 bg-white/[0.04] text-left">
                <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${m.tone}`}>
                  <motion.span
                    className="memory-glyph relative z-10 font-serif text-7xl text-blush/90"
                    animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-5, 5, -5], scale: [1, 1.08, 1] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {m.symbol}
                  </motion.span>
                  <span className="memory-orbit absolute h-28 w-28 rounded-full border border-gold/40" />
                  <span className="memory-orbit memory-orbit-delayed absolute h-40 w-40 rounded-full border border-blush/20" />
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.24),transparent_32%,rgba(12,3,10,0.28)_75%)]" />
                </div>
                <div className="p-4">
                  <div className="text-xs tracking-[0.35em] text-gold">{m.year}</div>
                  <L t={m.title} as="h3" className="display mt-1 text-xl font-semibold text-warmwhite" urduClassName="text-right" />
                  <L t={m.caption} as="p" className="mt-2 text-base leading-snug text-blush/90" enClassName="italic" urduClassName="text-right" />
                </div>
              </article>
            </motion.li>
          ))}
        </ol>
        <L t={ui.swipe} as="p" className="mt-1 text-xs tracking-widest text-blush/50 sm:hidden" />
      </div>

      <div className="mt-10 pb-6">
        <StageButton onClick={() => go("loveQuestion")} delay={3} urdu={button.urdu}>
          {button.text}
        </StageButton>
      </div>
    </StageWrap>
  );
}
