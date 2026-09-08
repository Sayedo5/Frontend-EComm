"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { letter } from "@/data/loveMessages";
import { L, useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";
import FloatingHearts from "./FloatingHearts";
import RosePetals from "./RosePetals";
import Sparkles from "./Sparkles";

/** 5.3 – The letter. Candlelight: warm amber pooling from one side, almost still. */
export default function LoveLetter() {
  const { go } = useNav();
  const { t, bt, resolve } = useLang();
  const [shown, setShown] = useState(1);
  const endRef = useRef<HTMLDivElement>(null);
  const total = letter.paragraphs.length;
  const complete = shown >= total;
  const urdu = resolve("en") === "ur";

  useEffect(() => {
    if (shown > 1) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [shown]);

  const keep = bt(letter.keepReading);
  const button = bt(letter.button);

  return (
    <StageWrap
      mood="candle"
      className="!justify-start"
      ambient={
        <>
        <FloatingHearts count={14} slow={1.3} opacity={0.38} color="#ff7a94" seed={14} />
        <RosePetals count={10} slow={1.7} seed={15} />
        <Sparkles kind="bokeh" count={12} seed={16} slow={1.4} />
        <div className="ambient">
          <div
            className="glow-orb h-[80vmin] w-[80vmin] !left-[85%] !top-[70%] bg-[radial-gradient(circle,rgba(255,170,90,0.22),transparent_62%)]"
            style={{ "--d": "9s" } as React.CSSProperties}
          />
        </div>
        </>
      }
      dir={urdu ? "rtl" : "ltr"}
    >
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
        <div className="mb-3 flex items-center justify-center gap-3 text-gold/80">
          <span className="letter-rule" />
          <span className="text-xl">♡</span>
          <span className="letter-rule" />
        </div>
        <L t={letter.heading} as="h2" reveal className="display mt-2 text-3xl font-semibold text-blush sm:text-5xl" urduClassName="text-4xl" />
        <p className="mt-2 text-center text-xs uppercase tracking-[0.45em] text-gold/70">Written with all my heart · ✉</p>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 38, rotateX: 9, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`letter-paper relative mx-auto mt-5 max-w-[38rem] px-6 pb-9 pt-12 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.95)] sm:px-12 sm:pb-12 sm:pt-14 ${urdu ? "text-right" : "text-left"}`}
        style={{ perspective: 1200 }}
      >
        <div className="letter-corner letter-corner-left" />
        <div className="letter-corner letter-corner-right" />
        <motion.div className="letter-seal" initial={{ scale: 0, rotate: -24 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 180, damping: 14, delay: 1.1 }} aria-hidden>
          ♥
        </motion.div>
        <div className="mb-8 flex items-center justify-between border-b border-[#9b4056]/25 pb-4 text-xs uppercase tracking-[0.28em] text-[#8d4350]/75">
          <span>For you, my love</span>
          <span>09 · 09 · 2026</span>
        </div>
        {letter.paragraphs.slice(0, shown).map((p, i) => {
          const last = i === total - 1;
          const first = i === 0;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 18, rotate: i % 2 ? 0.4 : -0.4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1.25, delay: i === 0 ? 0.25 : 0.12, ease: [0.22, 1, 0.36, 1] }}>
              <L
                t={p}
                as="p"
                reveal
                delay={0.18 + i * 0.05}
                className={`mb-5 text-[1.15rem] leading-[1.8] text-warmwhite/95 sm:text-[1.25rem] ${first ? "italic text-blush" : ""} ${last ? `mt-8 text-xl font-semibold text-blush sm:text-2xl ${urdu ? "text-left" : "text-right"}` : ""}`}
                urduClassName="text-[1.3rem] sm:text-[1.45rem] not-italic"
              />
            </motion.div>
          );
        })}
        <div ref={endRef} />
        <div className="mt-8 flex items-center gap-3 text-[#a14b5b]/65">
          <span className="letter-rule letter-rule-dark" />
          <span className="text-xl">❦</span>
          <span className="letter-rule letter-rule-dark" />
        </div>
      </motion.article>

      <div className="mt-8 flex justify-center pb-6">
        {complete ? (
          <StageButton onClick={() => go("youAre")} delay={0.6} urdu={button.urdu}>
            {button.text}
          </StageButton>
        ) : (
          <StageButton key={shown} onClick={() => setShown((s) => Math.min(total, s + (s === 1 ? 2 : 1)))} variant="soft" delay={0.4} urdu={keep.urdu}>
            {keep.text}
          </StageButton>
        )}
      </div>
    </StageWrap>
  );
}
