"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { noPath } from "@/data/loveMessages";
import { L, useLang, useLines } from "@/lib/language";
import { useNav } from "@/lib/nav";
import FloatingHearts from "./FloatingHearts";
import ParticleHeart from "./ParticleHeart";
import LineSequence from "./ui/LineSequence";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/**
 * 5.7b – NO. Gentle, never guilt-driven. Feelings, not obligation.
 * Ends at exactly the same place the YES path does.
 */
export default function NoLoveResponse() {
  const { go } = useNav();
  const { t, resolve } = useLang();
  const lines = useLines();
  const [phase, setPhase] = useState<"lines" | "letter">("lines");
  const urdu = resolve("en") === "ur";

  const items = lines(noPath.lines, "en", (i) => ({ hold: i === 0 ? 1800 : 3000, className: "text-2xl sm:text-3xl text-warmwhite/95" }));
  const button = t(noPath.button);

  return (
    <StageWrap mood="spotlight" ambient={<FloatingHearts count={6} slow={2.4} opacity={0.22} seed={41} />}>
      <div className="flex flex-col items-center gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }}>
          <ParticleHeart size={phase === "lines" ? "medium" : "small"} density="low" intensity="calm" opacity={0.85} />
        </motion.div>

        {phase === "lines" ? (
          <LineSequence lines={items} startDelay={1200} onDone={() => setPhase("letter")} className="min-h-[7rem]" />
        ) : (
          <>
            <div className={`measure flex flex-col gap-5 ${urdu ? "text-right" : "text-left"}`}>
              {noPath.paragraphs.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: i * 1.4 }}>
                  <L t={p} as="p" className="text-lg leading-[1.75] text-warmwhite/95 sm:text-xl" urduClassName="text-xl sm:text-2xl" />
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 4.6 }}>
              <L t={noPath.closing} as="p" className="display text-xl text-blush sm:text-2xl" enClassName="italic" />
            </motion.div>
            <StageButton onClick={() => go("deeperLove")} variant="soft" delay={5.4} urdu={button.urdu}>
              {button.text}
            </StageButton>
          </>
        )}
      </div>
    </StageWrap>
  );
}
