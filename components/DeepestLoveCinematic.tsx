"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { deepestLove } from "@/data/loveMessages";
import { L, useLines } from "@/lib/language";
import { useNav } from "@/lib/nav";
import ParticleHeart from "./ParticleHeart";
import Sparkles from "./Sparkles";
import LineSequence from "./ui/LineSequence";
import StageWrap from "./ui/StageWrap";

/** 5.9 – The deepest love message. Almost black, a faint particle heart behind the words, no buttons. */
export default function DeepestLoveCinematic() {
  const { go } = useNav();
  const lines = useLines();
  const [finale, setFinale] = useState(false);

  const items = lines(deepestLove.lines, "en", (i) => ({
    hold: i === 0 || i === 1 ? 2600 : i >= 9 ? 2800 : 2300,
    className: i >= 9 ? "text-2xl sm:text-4xl text-blush" : "text-2xl sm:text-4xl text-warmwhite/90",
  }));

  return (
    <StageWrap
      mood="silence"
      ambient={
        <>
          <div className="ambient flex items-center justify-center">
            <ParticleHeart size="large" density="low" intensity="calm" opacity={0.18} className="!h-[80vmin] !w-[80vmin]" />
          </div>
          <Sparkles kind="dust" count={16} color="rgba(255,179,198,0.5)" slow={1.6} sizeRange={[2, 5]} />
        </>
      }
    >
      <div className="flex min-h-[60dvh] flex-col items-center justify-center">
        {!finale ? (
          <LineSequence lines={items} startDelay={1500} onDone={() => setFinale(true)} keepLast={false} duration={1.3} rise={14} className="min-h-[8rem]" />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            onAnimationComplete={() => setTimeout(() => go("urduLove"), 2600)}
          >
            <L t={deepestLove.finale} as="h2" className="display font-semibold gold-text" enClassName="text-6xl sm:text-8xl tracking-[0.12em]" urduClassName="text-5xl sm:text-7xl" />
          </motion.div>
        )}
      </div>
    </StageWrap>
  );
}
