"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { youAre } from "@/data/loveMessages";
import { youAreClosing, youAreWords } from "@/data/thingsILove";
import { L, useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import FloatingHearts from "./FloatingHearts";
import RosePetals from "./RosePetals";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

const tilt = [-4, 3, -2, 5, -5, 2, -3, 4, -1, 3];

/** 5.4 – "You are..." Blush-rose, playful staggered word pop-ins, floating petals. */
export default function CuteGirlSection() {
  const { go } = useNav();
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [closing, setClosing] = useState(0);
  const total = youAreWords.length;

  useEffect(() => {
    if (shown < total) {
      const tm = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 900 : 620);
      return () => clearTimeout(tm);
    }
    const t1 = setTimeout(() => setClosing(1), 1400);
    const t2 = setTimeout(() => setClosing(2), 3600);
    const t3 = setTimeout(() => setClosing(3), 5200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [shown, total]);

  const button = t(youAre.button);

  return (
    <StageWrap
      mood="blush"
      ambient={
        <>
          <RosePetals count={12} slow={1.1} seed={21} />
          <FloatingHearts count={12} slow={0.9} color="#FFB3C6" opacity={0.55} seed={22} />
        </>
      }
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <L t={youAre.heading} as="h2" reveal className="display mb-8 text-3xl text-blush sm:text-4xl" enClassName="italic" />
      </motion.div>

      <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4" aria-live="polite">
        {youAreWords.slice(0, shown).map((w, i) => {
          const big = i >= 6;
          const word = t(w.word);
          return (
            <motion.li
              key={i}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 30, rotate: tilt[i % tilt.length] * 3 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: tilt[i % tilt.length] }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className={`display rounded-2xl border px-4 py-2 ${word.urdu ? "font-urdu leading-[1.9]" : ""} ${
                big ? "border-gold/40 bg-gold/10 text-2xl font-semibold text-gold sm:text-3xl" : "border-blush/30 bg-white/[0.06] text-xl text-warmwhite sm:text-2xl"
              }`}
              lang={word.lang}
              dir={word.urdu ? "rtl" : "ltr"}
            >
              {word.text}
              {w.emoji ? <span className={word.urdu ? "mr-2" : "ml-2"}>{w.emoji}</span> : null}
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-10 flex min-h-[8rem] flex-col items-center gap-3">
        {closing >= 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <L t={youAreClosing.question} as="p" className="display text-2xl text-warmwhite sm:text-3xl" />
          </motion.div>
        )}
        {closing >= 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <L t={youAreClosing.answer} as="p" className="measure text-xl text-blush sm:text-2xl" enClassName="italic" />
          </motion.div>
        )}
        {closing >= 3 && (
          <StageButton onClick={() => go("memories")} variant="ghost" className="mt-4" urdu={button.urdu}>
            {button.text}
          </StageButton>
        )}
      </div>
    </StageWrap>
  );
}
