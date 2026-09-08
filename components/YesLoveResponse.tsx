"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { yesPath } from "@/data/loveMessages";
import { L, useLang, useLines } from "@/lib/language";
import { useNav } from "@/lib/nav";
import ParticleHeart from "./ParticleHeart";
import RosePetals from "./RosePetals";
import Sparkles from "./Sparkles";
import LineSequence from "./ui/LineSequence";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/** 5.7a – YES. Heart expands, petals bloom, warm light. */
export default function YesLoveResponse() {
  const { go } = useNav();
  const { t } = useLang();
  const lines = useLines();
  const [phase, setPhase] = useState<"lines" | "more">("lines");
  const [linesDone, setLinesDone] = useState(false);

  const items = lines(yesPath.lines, "en", (i) => ({ hold: i === yesPath.lines.length - 1 ? 2200 : 2800, className: "text-2xl sm:text-3xl text-warmwhite" }));
  const tellMore = t(yesPath.tellMore);
  const keepGoing = t(yesPath.keepGoing);

  return (
    <StageWrap
      mood="blush"
      ambient={
        <>
          <RosePetals count={16} slow={0.9} seed={14} />
          <Sparkles count={14} color="#FFB3C6" />
        </>
      }
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: [0.5, 1.25, 1], opacity: 1 }} transition={{ duration: 1.6, times: [0, 0.6, 1], ease: "easeOut" }}>
          <ParticleHeart size={phase === "lines" ? "medium" : "small"} density="low" intensity="normal" />
        </motion.div>

        {phase === "lines" ? (
          <>
            <LineSequence lines={items} startDelay={1400} onDone={() => setLinesDone(true)} className="min-h-[7rem]" />
            {linesDone && (
              <StageButton onClick={() => setPhase("more")} variant="gold" delay={0.3} urdu={tellMore.urdu}>
                {tellMore.text}
              </StageButton>
            )}
          </>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
              <L t={yesPath.more} as="p" reveal className="measure text-xl leading-[1.75] text-warmwhite sm:text-2xl" enClassName="text-left" urduClassName="text-right" />
            </motion.div>
            <StageButton onClick={() => go("deeperLove")} delay={2} urdu={keepGoing.urdu}>
              {keepGoing.text}
            </StageButton>
          </>
        )}
      </div>
    </StageWrap>
  );
}
