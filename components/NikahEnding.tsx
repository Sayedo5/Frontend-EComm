"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { anniversaryConfig } from "@/data/anniversaryConfig";
import { nikah } from "@/data/loveMessages";
import { promises, witnessLine } from "@/data/spiritual";
import { L, useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import { HandsHeld, Rose } from "./HandsIllustration";
import ParticleHeart from "./ParticleHeart";
import RosePetals from "./RosePetals";
import Sparkles from "./Sparkles";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.6, delay, ease: "easeOut" as const },
});

/** Section 8 – Nikah ending. Deep night blue-maroon, moonlight, roses at the edges, calmest pacing of all. */
export default function NikahEnding() {
  const { go } = useNav();
  const { resolve } = useLang();
  const [photoFailed, setPhotoFailed] = useState(false);
  const urdu = resolve("ur") === "ur";

  return (
    <StageWrap
      mood="moonlight"
      ambient={
        <>
          <div className="ambient">
            <span
              className="absolute left-1/2 top-[5%] h-[26vmin] w-[26vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,244,214,0.95)_0%,rgba(255,244,214,0.5)_28%,rgba(255,244,214,0.08)_55%,transparent_70%)]"
              style={{ animation: "moon-glow 9s ease-in-out infinite" }}
            />
            {[
              { l: "-4%", t: "30%", r: -20, s: "18vmin" },
              { l: "88%", t: "24%", r: 25, s: "16vmin" },
              { l: "-2%", t: "74%", r: 10, s: "14vmin" },
              { l: "90%", t: "70%", r: -12, s: "15vmin" },
            ].map((x, i) => (
              <span key={i} className="absolute opacity-80" style={{ left: x.l, top: x.t, width: x.s, transform: `rotate(${x.r}deg)` }}>
                <Rose className="w-full" />
              </span>
            ))}
          </div>
          <Sparkles kind="star" count={20} seed={91} slow={1.5} />
          <RosePetals count={5} slow={2.6} seed={92} />
        </>
      }
      lang={urdu ? "ur" : "en"}
      dir={urdu ? "rtl" : "ltr"}
    >
      <div className="flex flex-col items-center gap-5 pt-[12vmin]">
        <motion.div {...fade(0.4)} className="relative w-[min(62vw,260px)]">
          {photoFailed ? (
            <HandsHeld id="held-nikah" className="w-full opacity-95" />
          ) : (
            <div className="photo-grade relative overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hands/nikah-henna.jpg" alt="Her henna-covered hand resting on his, ring on her finger" className="aspect-[4/3] w-full object-cover" style={{ filter: "sepia(0.7) saturate(1.2) brightness(0.9)" }} onError={() => setPhotoFailed(true)} />
            </div>
          )}
          <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-90">
            <ParticleHeart size="small" density="low" intensity="calm" opacity={0.85} />
          </div>
        </motion.div>

        <motion.div {...fade(1.6)} className="mt-6">
          <L t={nikah.urdu1} primary="ur" as="h2" reveal delay={1.6} className="font-semibold gold-text" urduClassName="text-4xl sm:text-5xl" enClassName="display text-4xl sm:text-5xl" />
        </motion.div>
        <motion.div {...fade(2.8)}>
          <L t={nikah.urdu2} primary="ur" as="h3" className="text-warmwhite" urduClassName="text-2xl sm:text-3xl" enClassName="display text-2xl sm:text-3xl" />
        </motion.div>

        <motion.div {...fade(4.2)}>
          <L t={nikah.dua} as="p" reveal delay={4.2} className="measure text-xl text-blush sm:text-2xl" enClassName="font-serif italic leading-relaxed" urduClassName="text-[1.35rem] sm:text-2xl" />
        </motion.div>

        <motion.div {...fade(6)}>
          <L t={nikah.ameen} primary="ur" as="p" className="text-gold" urduClassName="text-3xl sm:text-4xl" enClassName="display text-3xl sm:text-4xl" />
        </motion.div>

        {/* God is my witness… */}
        <motion.div {...fade(7.4)} className="measure rounded-2xl border border-gold/25 bg-white/[0.04] px-5 py-4 sm:px-7">
          <p className="font-urdu text-[1.3rem] leading-[2.3] text-warmwhite sm:text-2xl" lang="ur" dir="rtl">
            {witnessLine.ur}
          </p>
          {!urdu && (
            <p dir="ltr" lang="en" className="mt-2 text-left font-serif text-sm italic text-blush/75 sm:text-base">
              {witnessLine.en}
            </p>
          )}
        </motion.div>

        {/* Promises */}
        <div className="measure flex flex-col gap-4">
          {promises.map((p, i) => (
            <motion.div key={i} {...fade(9 + i * 1.8)}>
              <L t={p} primary="ur" as="p" className="text-warmwhite/95" urduClassName="text-[1.25rem] sm:text-[1.45rem] leading-[2.3]" enClassName="font-serif text-lg sm:text-xl leading-relaxed italic" />
            </motion.div>
          ))}
        </div>

        <motion.div {...fade(9 + promises.length * 1.8)} dir="ltr" lang="en" className="mt-4 font-serif">
          <L t={nikah.english} as="p" className="display text-2xl text-warmwhite sm:text-3xl" />
          <p className="mt-1 text-lg tracking-[0.3em] text-gold/90">{anniversaryConfig.dateStamp}</p>
        </motion.div>

        <motion.div {...fade(10.5 + promises.length * 1.8)}>
          <L t={nikah.urdu3} primary="ur" as="p" className="mt-2 text-warmwhite/95" urduClassName="text-2xl sm:text-3xl" enClassName="display text-2xl sm:text-3xl" />
        </motion.div>
        <motion.div {...fade(11.7 + promises.length * 1.8)}>
          <L t={nikah.urdu4} primary="ur" as="p" className="text-blush" urduClassName="text-2xl sm:text-3xl" enClassName="display text-2xl sm:text-3xl" />
        </motion.div>

        <div className="mt-6" dir="ltr">
          <StageButton onClick={() => go("anniversaryCard")} variant="soft" delay={13 + promises.length * 1.8} ariaLabel="Continue" className="text-2xl">
            {nikah.button}
          </StageButton>
        </div>
      </div>
    </StageWrap>
  );
}
