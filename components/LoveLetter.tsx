"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { letter } from "@/data/loveMessages";
import { L, useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

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
        <div className="ambient">
          <div
            className="glow-orb h-[80vmin] w-[80vmin] !left-[85%] !top-[70%] bg-[radial-gradient(circle,rgba(255,170,90,0.22),transparent_62%)]"
            style={{ "--d": "9s" } as React.CSSProperties}
          />
        </div>
      }
      dir={urdu ? "rtl" : "ltr"}
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <L t={letter.heading} as="h2" reveal className="display mb-8 mt-2 text-3xl font-semibold text-blush sm:text-4xl" urduClassName="text-4xl" />
      </motion.div>

      <article className={`mx-auto max-w-[36rem] rounded-3xl border border-blush/15 bg-[#fff0f3]/[0.04] px-6 py-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-[2px] sm:px-10 sm:py-10 ${urdu ? "text-right" : "text-left"}`}>
        {letter.paragraphs.slice(0, shown).map((p, i) => {
          const last = i === total - 1;
          const first = i === 0;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: "easeOut" }}>
              <L
                t={p}
                as="p"
                className={`mb-5 text-[1.15rem] leading-[1.8] text-warmwhite/95 sm:text-[1.25rem] ${first ? "italic text-blush" : ""} ${last ? `mt-8 text-xl font-semibold text-blush sm:text-2xl ${urdu ? "text-left" : "text-right"}` : ""}`}
                urduClassName="text-[1.3rem] sm:text-[1.45rem] not-italic"
              />
            </motion.div>
          );
        })}
        <div ref={endRef} />
      </article>

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
