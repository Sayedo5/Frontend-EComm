"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { proposal } from "@/data/loveMessages";
import { L, useLang, useLines } from "@/lib/language";
import { useNav } from "@/lib/nav";
import ParticleHeart from "./ParticleHeart";
import RingAnimation from "./RingAnimation";
import Sparkles from "./Sparkles";
import LineSequence from "./ui/LineSequence";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/**
 * 5.12 – Proposal. Starlit, darkening. Handles `proposalTransition` (the lead-in lines)
 * and `proposalAsk` (ring + question + YES / LET ME THINK). Both answers reach qabool1.
 */
export default function ProposalTransition() {
  const { stage, go } = useNav();
  const { t, bt } = useLang();
  const lines = useLines();
  const [thinking, setThinking] = useState(false);
  const [thinkDone, setThinkDone] = useState(false);
  const asking = stage === "proposalAsk";

  const leadLines = lines(proposal.lines, "en", (i) => ({
    hold: i === proposal.lines.length - 1 ? 2800 : 2600,
    className: i === proposal.lines.length - 1 ? "text-3xl sm:text-5xl text-gold" : "text-2xl sm:text-4xl text-warmwhite/90",
  }));
  const thinkLines = lines(proposal.thinkLines, "en", () => ({ hold: 3200, className: "text-2xl sm:text-3xl text-warmwhite/95" }));
  const yes = bt(proposal.yes);
  const think = bt(proposal.think);
  const ready = bt(proposal.ready);

  return (
    <StageWrap mood="starlit" ambient={<Sparkles kind="star" count={24} seed={61} slow={1.1} />}>
      <div className="flex min-h-[64dvh] flex-col items-center justify-center gap-7">
        {!asking ? (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
              <ParticleHeart size="small" density="low" intensity="calm" opacity={0.8} />
            </motion.div>
            <LineSequence lines={leadLines} startDelay={1600} onDone={() => go("proposalAsk")} keepLast={false} duration={1.2} className="min-h-[8rem]" />
          </>
        ) : !thinking ? (
          <>
            <motion.div initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.6, ease: "easeOut" }}>
              <RingAnimation size={150} glow={1.1} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 1 }}>
              <L t={proposal.question} as="h2" reveal delay={0.9} className="display font-semibold gold-text" enClassName="text-4xl sm:text-6xl" urduClassName="text-4xl sm:text-5xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 2.4 }}>
              <L t={proposal.sub} as="p" className="measure text-xl text-blush sm:text-2xl" enClassName="italic" />
            </motion.div>
            <div className="mt-2 flex w-full max-w-sm flex-col gap-4 sm:flex-row sm:justify-center">
              <StageButton onClick={() => go("qabool1")} variant="gold" delay={3.4} className="w-full text-xl sm:w-auto sm:min-w-[12rem]" urdu={yes.urdu}>
                {yes.text}
              </StageButton>
              <StageButton onClick={() => setThinking(true)} variant="ghost" delay={3.6} className="w-full text-xl sm:w-auto sm:min-w-[12rem]" urdu={think.urdu}>
                {think.text}
              </StageButton>
            </div>
          </>
        ) : (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
              <ParticleHeart size="small" density="low" intensity="calm" opacity={0.8} />
            </motion.div>
            <LineSequence lines={thinkLines} startDelay={800} onDone={() => setThinkDone(true)} className="min-h-[8rem]" />
            {thinkDone && (
              <StageButton onClick={() => go("qabool1")} variant="soft" delay={0.4} urdu={ready.urdu}>
                {ready.text}
              </StageButton>
            )}
          </>
        )}
      </div>
    </StageWrap>
  );
}
