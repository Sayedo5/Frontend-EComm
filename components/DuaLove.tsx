"use client";

import { motion } from "framer-motion";
import { duaLove } from "@/data/spiritual";
import { useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import ParticleHeart from "./ParticleHeart";
import RosePetals from "./RosePetals";
import Sparkles from "./Sparkles";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/**
 * Love, the way a prayer is made – shown in Urdu on every language setting.
 * In English-only mode a small English gloss appears under each line.
 */
export default function DuaLove() {
  const { go } = useNav();
  const { mode } = useLang();
  const gloss = mode === "en";

  return (
    <StageWrap
      mood="roseGold"
      ambient={
        <>
          <Sparkles kind="bokeh" count={10} seed={31} slow={1.8} />
          <RosePetals count={6} slow={2.2} gold seed={32} />
        </>
      }
      dir="rtl"
      lang="ur"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }} className="mb-2 flex justify-center">
        <ParticleHeart size="small" density="low" intensity="calm" opacity={0.9} />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6 }} className="font-urdu mb-1 text-3xl font-semibold leading-[2.2] gold-text sm:text-4xl">
        {duaLove.heading.ur}
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.4 }} className="font-urdu mb-6 text-lg leading-[2] text-blush/85">
        {duaLove.sub.ur}
      </motion.p>

      <div className="flex flex-col gap-5">
        {duaLove.expressions.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2 + i * 2.4 }}
            className="rounded-2xl border border-gold/25 bg-white/[0.04] px-5 py-4 text-right shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] sm:px-7"
          >
            <p className="font-urdu text-[1.3rem] leading-[2.3] text-warmwhite sm:text-2xl">{e.ur}</p>
            {gloss && (
              <p dir="ltr" lang="en" className="mt-2 text-left font-serif text-sm italic leading-relaxed text-blush/75 sm:text-base">
                {e.en}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-10" dir="ltr">
        <StageButton onClick={() => go("nikahEnding")} variant="gold" delay={2 + duaLove.expressions.length * 2.4} urdu>
          {duaLove.button.ur}
        </StageButton>
      </div>
    </StageWrap>
  );
}
