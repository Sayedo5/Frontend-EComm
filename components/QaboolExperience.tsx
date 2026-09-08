"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { qabool } from "@/data/loveMessages";
import { useLang, useLines } from "@/lib/language";
import { useNav } from "@/lib/nav";
import { HandsHeld, Rose } from "./HandsIllustration";
import RingAnimation from "./RingAnimation";
import RosePetals from "./RosePetals";
import Sparkles from "./Sparkles";
import LineSequence from "./ui/LineSequence";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/*
 * Section 6 – The Qabool Hai set-piece with real photographic hands.
 * One component stays mounted across qabool1 → qabool2 → qabool3 → ringAnimation
 * so the photos cross-fade instead of resetting between steps.
 *
 * Stage A (qabool1): hands apart, reaching.   Stage B (qabool2/3): closer, ring in his fingers.
 * Stage C (ringAnimation): ring slides on → hands clasp and hold. Roses bloom, gold light rises.
 */

type Seq = "idle" | "inserting" | "held" | "roses" | "bloom" | "light" | "text";
const SEQ_ORDER: Seq[] = ["inserting", "held", "roses", "bloom", "light", "text"];
const SEQ_DELAYS = [0, 2600, 1200, 700, 700, 900];

export default function QaboolExperience() {
  const { stage, go } = useNav();
  const { t, bt } = useLang();
  const lines = useLines();
  const reduce = useReducedMotion();
  const stepIndex = stage === "qabool1" ? 1 : stage === "qabool2" ? 2 : stage === "qabool3" ? 3 : 4;
  const [phase, setPhase] = useState<"lines" | "ask" | "after">("lines");
  const [seq, setSeq] = useState<Seq>("idle");

  const seqAt = (s: Seq) => SEQ_ORDER.indexOf(seq) >= SEQ_ORDER.indexOf(s);

  useEffect(() => {
    if (stepIndex <= 3) setPhase("lines");
  }, [stepIndex]);

  // The big final sequence.
  useEffect(() => {
    if (stage !== "ringAnimation") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let acc = 0;
    SEQ_ORDER.forEach((s, i) => {
      acc += SEQ_DELAYS[i];
      timers.push(setTimeout(() => setSeq(s), acc));
    });
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  const tap = () => {
    if (stepIndex < 3) setPhase("after");
    else go("ringAnimation");
  };

  const data = stepIndex === 1 ? qabool.one : stepIndex === 2 ? qabool.two : qabool.three;
  const ask = t(data.ask, "ur");
  const button = bt(data.button);
  const leadLines = lines(data.lines, stepIndex === 1 ? "en" : "ur", (i, urdu) => ({
    hold: 2000,
    className: stepIndex === 1 && i === data.lines.length - 1 ? "text-4xl sm:text-5xl gold-text font-semibold" : `${urdu ? "text-3xl sm:text-4xl" : "text-2xl sm:text-4xl"} text-warmwhite/90`,
  }));
  const afterLines = lines(data.after, "ur", () => ({ hold: 2200, className: "text-3xl sm:text-4xl text-gold" }));

  const intensity = stage === "ringAnimation" ? 3 : stepIndex - 1; // 0..3 for ambient density
  const settled = seqAt("held");

  return (
    <StageWrap
      mood="goldenHour"
      ambient={
        <>
          {intensity >= 1 && <RosePetals count={intensity >= 2 ? 16 : 8} slow={1.6} gold seed={70 + intensity} />}
          {intensity >= 2 && <Sparkles count={14} color="#F7C873" />}
          {seqAt("light") && (
            <div className="ambient">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(247,200,115,0.34)_0%,rgba(247,200,115,0.1)_40%,transparent_70%)]"
              />
            </div>
          )}
        </>
      }
    >
      {/* Text + button (above the hands) */}
      <div className="flex min-h-[10rem] flex-col items-center justify-end gap-4 pb-3">
        {stage !== "ringAnimation" && phase === "lines" && (
          <LineSequence key={`lead-${stepIndex}`} lines={leadLines} startDelay={900} onDone={() => setPhase("ask")} className="min-h-[5rem]" />
        )}
        {stage !== "ringAnimation" && phase === "ask" && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className={`font-semibold gold-text ${ask.urdu ? "font-urdu text-4xl leading-[2] sm:text-5xl" : "display text-4xl sm:text-6xl"}`}
              lang={ask.lang}
              dir={ask.urdu ? "rtl" : "ltr"}
            >
              {ask.text}
            </motion.h2>
            <StageButton onClick={tap} variant="gold" delay={0.9} urdu={button.urdu} className="px-10 text-2xl">
              {button.text}
            </StageButton>
          </>
        )}
        {stage !== "ringAnimation" && phase === "after" && (
          <LineSequence key={`after-${stepIndex}`} lines={afterLines} startDelay={700} onDone={() => go(stepIndex === 1 ? "qabool2" : "qabool3")} className="min-h-[5rem]" />
        )}
        {stage === "ringAnimation" && seqAt("text") && <FinalLines onDone={() => go("engagementCelebration")} />}
      </div>

      {/* The hands */}
      <motion.div
        className="relative mx-auto w-[min(88vw,400px)]"
        animate={{ scale: reduce ? 1 : 1 + intensity * 0.02 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <motion.div
          className="rounded-[2rem] border border-gold/20 bg-white/[0.03] p-6 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
          animate={reduce ? undefined : { rotateY: [0, 3, 0, -3, 0], y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ perspective: 900 }}
        >
          <HandsHeld id="qabool-hands" ring={settled || stepIndex >= 3} />
          {stage === "ringAnimation" && (
            <motion.div
              className="pointer-events-none absolute left-[52%] top-[8%] z-20"
              initial={{ x: -90, y: -30, scale: 0.55, opacity: 0 }}
              animate={settled ? { x: 0, y: 112, scale: [0.42, 0.48, 0.42], opacity: [0.55, 1, 0.55], rotate: [-3, 3, -3] } : { x: 0, y: 112, scale: 0.42, opacity: [0, 1, 1, 0] }}
              transition={settled ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : { duration: 2.8, ease: "easeInOut" }}
            >
              <RingAnimation size={100} glow={settled ? 2 : 1.6} float={false} />
            </motion.div>
          )}
        </motion.div>

        {/* roses bloom around the hands */}
        {seqAt("roses") &&
          [
            { l: "-6%", t: "18%", r: -18, d: 0 },
            { l: "88%", t: "14%", r: 14, d: 0.25 },
            { l: "-4%", t: "72%", r: 8, d: 0.5 },
            { l: "86%", t: "76%", r: -10, d: 0.7 },
          ].map((r, i) => (
            <motion.div
              key={i}
              className="absolute z-[4] w-[18%]"
              style={{ left: r.l, top: r.t }}
              initial={{ opacity: 0, scale: 0.2, rotate: r.r - 30 }}
              animate={{ opacity: 1, scale: 1, rotate: r.r }}
              transition={{ type: "spring", stiffness: 90, damping: 12, delay: r.d }}
            >
              <Rose className="w-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]" />
            </motion.div>
          ))}

        {/* quiet bloom of hearts + gold sparks */}
        {seqAt("bloom") && !reduce && (
          <div className="pointer-events-none absolute inset-0 z-[5]">
            {Array.from({ length: 18 }, (_, i) => {
              const a = (i / 18) * Math.PI * 2;
              const dist = 38 + (i % 3) * 10;
              return (
                <motion.span
                  key={i}
                  className={`absolute left-1/2 top-1/2 block rounded-full ${i % 2 ? "bg-gold" : "bg-rose"}`}
                  style={{ width: i % 2 ? 5 : 7, height: i % 2 ? 5 : 7 }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                  animate={{ x: `${Math.cos(a) * dist}vmin`, y: `${Math.sin(a) * dist * 0.8}vmin`, opacity: 0, scale: 1.4 }}
                  transition={{ duration: 2.4, ease: "easeOut", delay: (i % 4) * 0.12 }}
                />
              );
            })}
          </div>
        )}
      </motion.div>
    </StageWrap>
  );
}

function FinalLines({ onDone }: { onDone: () => void }) {
  const lines = useLines();
  const [done, setDone] = useState(false);
  const items = lines(qabool.three.after, "ur", (i, urdu) => ({
    hold: 2600,
    className: i === 0 ? `${urdu ? "" : "display"} text-4xl sm:text-5xl gold-text font-semibold` : `${urdu ? "" : "display"} text-3xl sm:text-4xl text-warmwhite`,
  }));
  return (
    <>
      <LineSequence lines={items} mode="stack" startDelay={300} onDone={() => setDone(true)} className="min-h-[5rem] !gap-1" />
      {done && (
        <StageButton onClick={onDone} variant="soft" delay={0.5} ariaLabel="Continue" className="text-2xl">
          {qabool.continueButton}
        </StageButton>
      )}
    </>
  );
}
