"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { finalMessage } from "@/data/loveMessages";
import { L, useLang, useLines } from "@/lib/language";
import { useNav } from "@/lib/nav";
import FloatingHearts from "./FloatingHearts";
import ParticleHeart from "./ParticleHeart";
import RosePetals from "./RosePetals";
import Sparkles from "./Sparkles";
import LineSequence from "./ui/LineSequence";
import StageWrap from "./ui/StageWrap";

/** Section 9 – Final message. Returns to the opening palette; ends on the largest text on the site. */
export default function FinalMessage() {
  const { go } = useNav();
  const { t } = useLang();
  const lines = useLines();
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  const english = lines(finalMessage.lines, "en", () => ({ hold: 2600, className: "text-3xl sm:text-5xl text-warmwhite" }));
  const urdu = lines(finalMessage.urdu, "ur", (i, isUrdu) => ({
    hold: i >= 4 ? 3000 : 2400,
    className: `${isUrdu ? "" : "display"} text-2xl sm:text-3xl ${i >= 4 ? "text-gold" : "text-warmwhite/95"}`,
  }));
  const replay = t(finalMessage.replay);

  return (
    <StageWrap
      mood="fullCircle"
      ambient={
        <>
          <div className="ambient flex items-center justify-center">
            <ParticleHeart size="large" density="medium" intensity="calm" opacity={0.3} className="!h-[75vmin] !w-[75vmin]" />
          </div>
          <FloatingHearts count={12} slow={1.2} opacity={0.45} seed={101} />
          <RosePetals count={8} slow={1.6} gold seed={102} />
          <Sparkles count={12} color="#F7C873" />
        </>
      }
    >
      <div className="flex min-h-[64dvh] flex-col items-center justify-center gap-6">
        {phase === 0 && <LineSequence lines={english} startDelay={1200} onDone={() => setPhase(1)} keepLast={false} className="min-h-[8rem]" />}
        {phase === 1 && <LineSequence lines={urdu} mode="stack" startDelay={400} gap={2400} onDone={() => setPhase(2)} className="min-h-[8rem] !gap-0" lineClassName="leading-[2]" />}
        {phase === 2 && (
          <>
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.4, ease: "easeOut" }}>
              <L t={finalMessage.finale} as="h1" reveal delay={0.4} className="display font-semibold gold-text" enClassName="text-[3.4rem] leading-[1.05] sm:text-[6.5rem]" urduClassName="text-5xl sm:text-7xl" />
            </motion.div>
            <motion.button
              type="button"
              onClick={() => go("hero")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1.5, delay: 4 }}
              className={`mt-10 min-h-[44px] text-sm tracking-widest text-blush underline-offset-4 hover:underline ${replay.urdu ? "font-urdu text-base" : ""}`}
              lang={replay.lang}
              dir={replay.urdu ? "rtl" : "ltr"}
            >
              {replay.text}
            </motion.button>
          </>
        )}
      </div>
    </StageWrap>
  );
}
