"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { loveQuestion } from "@/data/loveMessages";
import { L, useLang, useLines } from "@/lib/language";
import { useNav } from "@/lib/nav";
import ParticleHeart from "./ParticleHeart";
import LineSequence from "./ui/LineSequence";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/** 5.6 – "Do you love me?" Near-black, one spotlight, the particle heart is the only visual. */
export default function LoveQuestion() {
  const { go } = useNav();
  const { bt } = useLang();
  const lines = useLines();
  const [asked, setAsked] = useState(false);

  const items = lines(loveQuestion.lines, "en", (i) => ({ hold: i === loveQuestion.lines.length - 1 ? 2600 : 2200, className: "text-2xl sm:text-4xl text-warmwhite/90" }));
  const yes = bt(loveQuestion.yes);
  const no = bt(loveQuestion.no);

  return (
    <StageWrap mood="spotlight">
      <div className="flex flex-col items-center gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: asked ? 1.1 : 1 }} transition={{ duration: 1.6, ease: "easeOut" }}>
          <ParticleHeart size="medium" density="low" intensity="calm" />
        </motion.div>

        {!asked ? (
          <LineSequence lines={items} startDelay={1200} onDone={() => setAsked(true)} className="min-h-[6rem]" />
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1 }}>
              <L t={loveQuestion.question} as="h2" reveal className="display text-4xl font-semibold text-warmwhite sm:text-6xl" urduClassName="text-4xl sm:text-5xl" />
            </motion.div>
            <div className="mt-2 flex w-full max-w-sm flex-col gap-4 sm:flex-row sm:justify-center">
              <StageButton onClick={() => go("yesResponse")} delay={0.9} className="w-full text-xl sm:w-auto sm:min-w-[11rem]" urdu={yes.urdu}>
                {yes.text}
              </StageButton>
              <StageButton onClick={() => go("noResponse")} variant="ghost" delay={1.1} className="w-full text-xl sm:w-auto sm:min-w-[11rem]" urdu={no.urdu}>
                {no.text}
              </StageButton>
            </div>
          </>
        )}
      </div>
    </StageWrap>
  );
}
