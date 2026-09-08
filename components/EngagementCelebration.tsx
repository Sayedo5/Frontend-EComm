"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { celebration } from "@/data/loveMessages";
import { useLang, useLines } from "@/lib/language";
import { useNav } from "@/lib/nav";
import FloatingHearts from "./FloatingHearts";
import { HandsHeld } from "./HandsIllustration";
import ParticleHeart from "./ParticleHeart";
import RosePetals from "./RosePetals";
import Sparkles from "./Sparkles";
import LineSequence from "./ui/LineSequence";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/** Section 7 – Engagement celebration. Golden, slightly brighter; the particle heart bursts, then settles. */
export default function EngagementCelebration() {
  const { go } = useNav();
  const { t } = useLang();
  const lines = useLines();
  const [done, setDone] = useState(false);
  const [burst, setBurst] = useState(true);

  useEffect(() => {
    const tm = setTimeout(() => setBurst(false), 3800);
    return () => clearTimeout(tm);
  }, []);

  const items = lines(celebration.lines, "en", (i) => ({
    hold: 2600,
    className: i === 0 ? "text-4xl sm:text-6xl gold-text font-semibold" : "text-2xl sm:text-4xl text-warmwhite",
  }));
  const button = t(celebration.button);

  return (
    <StageWrap
      mood="goldenBright"
      ambient={
        <>
          <RosePetals count={14} slow={1.5} gold seed={81} />
          <FloatingHearts count={10} slow={1.4} color="#FFB3C6" opacity={0.45} seed={82} />
          <Sparkles count={18} color="#F7C873" sizeRange={[3, 9]} />
          <div className="ambient">
            {[
              { l: "18%", t: "22%", d: 0 },
              { l: "76%", t: "30%", d: 2.2 },
              { l: "50%", t: "78%", d: 4.1 },
            ].map((b, i) => (
              <motion.span
                key={i}
                className="absolute h-[34vmin] w-[34vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,200,115,0.35),transparent_65%)]"
                style={{ left: b.l, top: b.t }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.3, 1.6] }}
                transition={{ duration: 5.5, repeat: Infinity, delay: b.d, ease: "easeOut" }}
              />
            ))}
          </div>
        </>
      }
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6 }} className="relative w-[min(78vw,340px)]">
          <motion.div
            className="rounded-[2rem] border border-gold/25 bg-white/[0.04] p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
            animate={{ rotateY: [0, 4, 0, -4, 0], y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ perspective: 900 }}
          >
            <HandsHeld id="held-celebrate" className="w-full" />
          </motion.div>
          <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2">
            <ParticleHeart size="small" density="low" intensity={burst ? "burst" : "normal"} opacity={0.9} />
          </div>
        </motion.div>
        <LineSequence lines={items} mode="stack" startDelay={1400} onDone={() => setDone(true)} className="mt-6 min-h-[9rem] !gap-2" />
        {done && (
          <StageButton onClick={() => go("duaLove")} variant="gold" delay={0.5} urdu={button.urdu}>
            {button.text}
          </StageButton>
        )}
      </div>
    </StageWrap>
  );
}
