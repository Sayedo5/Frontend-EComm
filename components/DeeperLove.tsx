"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { deeperLove } from "@/data/loveMessages";
import { L, useLang, type Bi } from "@/lib/language";
import { useNav } from "@/lib/nav";
import FloatingHearts from "./FloatingHearts";
import ParticleHeart from "./ParticleHeart";
import Sparkles from "./Sparkles";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/** 5.8 – Three quick interactive beats. Both paths land here. */
export default function DeeperLove() {
  const { go } = useNav();
  const { t } = useLang();
  const [q, setQ] = useState(0);
  const [reply, setReply] = useState<Bi | null>(null);
  const current = deeperLove[q];
  const playful = q === 1;

  useEffect(() => {
    if (reply === null) return;
    const tm = setTimeout(() => {
      if (q < deeperLove.length - 1) {
        setQ((v) => v + 1);
        setReply(null);
      } else {
        go("deepestLoveCinematic");
      }
    }, 3400);
    return () => clearTimeout(tm);
  }, [reply, q, go]);

  return (
    <StageWrap
      mood={playful ? "blush" : "spotlight"}
      ambient={
        <>
          <FloatingHearts count={playful ? 14 : 8} slow={playful ? 0.8 : 1.6} opacity={playful ? 0.55 : 0.3} seed={50 + q} />
          {playful && <Sparkles count={12} color="#FFB3C6" />}
        </>
      }
    >
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-7">
        <div className="flex items-center gap-2" aria-label={`Question ${q + 1} of ${deeperLove.length}`}>
          {deeperLove.map((_, i) => (
            <span key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i <= q ? "bg-gold" : "bg-white/15"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={q} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.8 }} className="flex w-full flex-col items-center gap-6">
            <motion.div animate={playful ? { rotate: [0, -6, 6, -4, 0] } : { rotate: 0 }} transition={{ duration: 1.4, repeat: playful ? Infinity : 0, repeatDelay: 1.6 }}>
              <ParticleHeart size="small" density="low" intensity={playful ? "normal" : "calm"} />
            </motion.div>

            <L t={current.question} as="h2" reveal className="display measure text-3xl font-semibold text-warmwhite sm:text-4xl" />

            {reply === null ? (
              <div className="flex w-full max-w-sm flex-col gap-4 sm:flex-row sm:justify-center">
                {current.options.map((o, i) => {
                  const label = t(o.label);
                  return (
                    <StageButton key={i} onClick={() => setReply(o.reply)} variant={i === 0 ? "primary" : "soft"} delay={0.5 + i * 0.2} className="w-full sm:w-auto sm:min-w-[12rem]" urdu={label.urdu}>
                      {label.text}
                    </StageButton>
                  );
                })}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} role="status">
                <L t={reply} as="p" className="measure text-xl leading-relaxed text-blush sm:text-2xl" enClassName="italic" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </StageWrap>
  );
}
