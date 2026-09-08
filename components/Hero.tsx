"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { hero } from "@/data/loveMessages";
import { L, useLang, useLines } from "@/lib/language";
import { useNav } from "@/lib/nav";
import FloatingHearts from "./FloatingHearts";
import ParticleHeart from "./ParticleHeart";
import { LightRays } from "./Sparkles";
import LineSequence from "./ui/LineSequence";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/** 5.1 – Date reveal. One line replaces the last; a faint particle heart breathes behind. */
export default function Hero() {
  const { go } = useNav();
  const { bt } = useLang();
  const lines = useLines();
  const [done, setDone] = useState(false);

  const items = lines(hero.lines, "en", (i, urdu) => ({
    hold: i === hero.lines.length - 1 ? 2000 : i === 0 || i === 3 ? 2600 : 2300,
    className:
      i === 0 || i === 3
        ? `text-2xl sm:text-3xl ${urdu ? "" : "tracking-[0.25em] uppercase"} text-gold/90 font-medium`
        : i === hero.lines.length - 1
          ? "text-4xl sm:text-6xl gold-text font-semibold"
          : "text-3xl sm:text-5xl text-warmwhite",
  }));
  const button = bt(hero.button);

  return (
    <StageWrap
      mood="night"
      ambient={
        <>
          <div className="ambient flex items-center justify-center">
            <ParticleHeart size="large" density="low" intensity="calm" opacity={0.35} className="!h-[70vmin] !w-[70vmin]" />
          </div>
          <LightRays />
          <FloatingHearts count={10} slow={1.3} opacity={0.35} />
        </>
      }
    >
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-10">
        <LineSequence lines={items} onDone={() => setDone(true)} className="min-h-[9rem] soft-shadow" />
        {done && (
          <>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
              <L t={hero.subtitle} as="p" className="measure text-lg leading-relaxed text-blush sm:text-xl" enClassName="italic" urduClassName="text-xl sm:text-2xl" />
            </motion.div>
            <StageButton onClick={() => go("anniversaryCount")} delay={1.2} urdu={button.urdu}>
              {button.text}
            </StageButton>
          </>
        )}
      </div>
    </StageWrap>
  );
}
