"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { anniversaryConfig } from "@/data/anniversaryConfig";
import { counter } from "@/data/loveMessages";
import { L, useLang, type Bi } from "@/lib/language";
import { useNav } from "@/lib/nav";
import RosePetals from "./RosePetals";
import { LightRays } from "./Sparkles";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/* ---------- time since the relationship began ---------- */

type Totals = { years: number; months: number; days: number; hours: number; minutes: number; seconds: number };
type Breakdown = { years: number; months: number; days: number; hours: number; minutes: number; seconds: number };

function startDate() {
  return new Date(anniversaryConfig.relationshipStartDate + "T00:00:00");
}

/** Running totals: whole years, whole calendar months, whole days, hours, minutes, seconds elapsed. */
function totalsSince(start: Date, now: Date): Totals {
  const ms = Math.max(0, now.getTime() - start.getTime());
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate() || (now.getDate() === start.getDate() && now.getHours() < start.getHours())) months -= 1;
  return {
    years: Math.floor(months / 12),
    months,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000),
    minutes: Math.floor(ms / 60000),
    seconds: Math.floor(ms / 1000),
  };
}

/** Calendar breakdown: X years, Y months, Z days, hh:mm:ss. */
function breakdownSince(start: Date, now: Date): Breakdown {
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();
  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }
  return { years: Math.max(0, years), months, days, hours, minutes, seconds };
}

/** A number whose digits flip individually when they change (thousands separators stay put). */
function RollingNumber({ value, className = "" }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  const chars = value.toLocaleString("en-US").split("");
  return (
    <span className={`inline-flex items-baseline tabular-nums ${className}`} aria-label={value.toLocaleString("en-US")}>
      {chars.map((ch, i) => (
        <span key={`${i}-${chars.length}`} className="flip-digit relative inline-block overflow-hidden" style={{ minWidth: /\d/.test(ch) ? "0.56em" : undefined }} aria-hidden>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={ch}
              className="inline-block text-center"
              initial={reduce || !/\d/.test(ch) ? { opacity: 0 } : { rotateX: -90, y: "-0.4em", opacity: 0 }}
              animate={{ rotateX: 0, y: 0, opacity: 1 }}
              exit={reduce || !/\d/.test(ch) ? { opacity: 0 } : { rotateX: 90, y: "0.4em", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

/** Count up from 0 to the live value over `duration`, then follow the live value. */
function useIntroCount(target: number, start: boolean, duration: number) {
  const [p, setP] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setP(1);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const x = Math.min(1, (now - t0) / duration);
      setP(1 - Math.pow(1 - x, 3));
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, duration, reduce]);
  return Math.round(target * p);
}

function Tile({ value, label, delay, big }: { value: number; label: Bi; delay: number; big?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay }}
      className="flex min-w-0 flex-col items-center overflow-hidden rounded-2xl border border-gold/20 bg-white/[0.03] px-1 py-4 sm:py-5"
    >
      <RollingNumber value={value} className={`display font-semibold text-warmwhite ${big ? "text-4xl sm:text-5xl" : "text-[1.2rem] sm:text-2xl"}`} />
      <L t={label} className="mt-1 text-[0.65rem] text-gold/80 sm:text-sm" enClassName="uppercase tracking-[0.3em]" urduClassName="text-base urdu-tight" />
    </motion.div>
  );
}

/** 5.2 – Anniversary counter. Running totals of years, months, days, hours, minutes and seconds, live to the second. */
export default function AnniversaryIntro() {
  const { go } = useNav();
  const { t, bt } = useLang();
  const [step, setStep] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const timers = [setTimeout(() => setStep(1), 1800), setTimeout(() => setStep(2), 4000), setTimeout(() => setStep(3), 7200), setTimeout(() => setStep(4), 9800)];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = startDate();
  const live = totalsSince(start, now ?? start);
  const bd = breakdownSince(start, now ?? start);

  const years = useIntroCount(live.years, step >= 2, 1200);
  const months = useIntroCount(live.months, step >= 2, 1800);
  const days = useIntroCount(live.days, step >= 2, 2400);
  const hours = useIntroCount(live.hours, step >= 3, 1600);
  const minutes = useIntroCount(live.minutes, step >= 3, 2000);
  const seconds = useIntroCount(live.seconds, step >= 3, 2400);

  const title = t(counter.title);
  const button = bt(counter.button);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <StageWrap
      mood="warmDark"
      ambient={
        <>
          <LightRays count={4} />
          <RosePetals count={6} slow={1.5} />
        </>
      }
    >
      <div className="flex flex-col items-center gap-7">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2 }} className="rule-gold w-40" />
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: title.urdu ? "0" : "0.08em" }}
          transition={{ duration: 1.4 }}
          className={`font-semibold gold-text ${title.urdu ? "font-urdu text-5xl sm:text-7xl" : "display text-6xl sm:text-8xl"}`}
          lang={title.lang}
          dir={title.urdu ? "rtl" : "ltr"}
        >
          {title.text}
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.3 }} className="rule-gold w-40" />

        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <L t={counter.lead} as="p" className="measure text-xl text-blush sm:text-2xl" />
          </motion.div>
        )}

        {step >= 2 && (
          <div className="grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-4">
            <Tile value={years} label={counter.labels.years} delay={0} big />
            <Tile value={months} label={counter.labels.months} delay={0.25} big />
            <Tile value={days} label={counter.labels.days} delay={0.5} big />
          </div>
        )}

        {step >= 3 && (
          <>
            <div className="grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-4">
              <Tile value={hours} label={counter.labels.hours} delay={0} />
              <Tile value={minutes} label={counter.labels.minutes} delay={0.25} />
              <Tile value={seconds} label={counter.labels.seconds} delay={0.5} />
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }} className="flex flex-col items-center gap-1">
              <L t={counter.liveLead} as="p" className="text-xs text-blush/70" enClassName="uppercase tracking-[0.3em]" urduClassName="text-sm urdu-tight" />
              <p className="display text-base text-warmwhite/90 sm:text-lg" dir="ltr">
                <span className="text-gold">{bd.years}</span> {t(counter.labels.years).text.toLowerCase()} · <span className="text-gold">{bd.months}</span>{" "}
                {t(counter.labels.months).text.toLowerCase()} · <span className="text-gold">{bd.days}</span> {t(counter.labels.days).text.toLowerCase()} ·{" "}
                <span className="tabular-nums text-gold">
                  {pad(bd.hours)}:{pad(bd.minutes)}:{pad(bd.seconds)}
                </span>
              </p>
              <L t={counter.liveNote} as="p" className="text-xs text-blush/60" enClassName="italic tracking-wide" urduClassName="text-sm urdu-tight" />
            </motion.div>
          </>
        )}

        {step >= 4 && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
              <L t={counter.closing} as="p" className="measure text-xl text-warmwhite sm:text-2xl" enClassName="italic" />
            </motion.div>
            <StageButton onClick={() => go("loveLetter")} variant="ghost" delay={0.8} urdu={button.urdu}>
              {button.text}
            </StageButton>
          </>
        )}
      </div>
    </StageWrap>
  );
}
