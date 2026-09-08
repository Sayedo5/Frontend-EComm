"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { anniversaryConfig } from "@/data/anniversaryConfig";
import { music, ui } from "@/data/loveMessages";
import { moods } from "@/lib/backgrounds";
import { useLang } from "@/lib/language";
import { useMusic } from "@/lib/music";
import { useNav } from "@/lib/nav";
import ParticleHeart from "./ParticleHeart";
import Heart from "./ui/Heart";

/**
 * Opening beat: the glowing particle heart (canvas recreation of the reference video),
 * or your own love.mp4 if `useIntroVideo` is on, then "Open My Heart".
 */
export default function ParticleHeartIntro() {
  const { go } = useNav();
  const { t } = useLang();
  const { startFromIntro } = useMusic();
  const reduce = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);
  const [opening, setOpening] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const useVideo = anniversaryConfig.useIntroVideo && videoOk && !reduce;
  const intro = t(music.intro);
  const hint = t(ui.soundHint);

  const open = () => {
    if (opening) return;
    setOpening(true);
    startFromIntro();
    setTimeout(() => go("hero"), 1900);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, [useVideo]);

  return (
    <motion.section
      className="stage"
      style={{ background: moods.night }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.1 } }}
    >
      <motion.div
        className="absolute inset-0"
        animate={opening && !reduce ? { scale: [1, 1.06, 1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 1.9, ease: "easeInOut" }}
      >
        {useVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={anniversaryConfig.introVideo}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onError={() => setVideoOk(false)}
            aria-hidden
          />
        ) : reduce ? (
          <div className="flex h-full w-full items-center justify-center">
            <Heart className="h-40 w-40 text-rose" style={{ filter: "drop-shadow(0 0 30px rgba(255,77,109,0.7))" }} />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ParticleHeart size="fullscreen" density="high" intensity="normal" className="!h-[78vmin] !w-[78vmin] max-h-full max-w-full" />
          </div>
        )}
      </motion.div>

      <div className="stage-content flex min-h-[72dvh] flex-col items-center justify-end">
        <motion.button
          type="button"
          onClick={open}
          disabled={opening}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          whileTap={{ scale: 0.96 }}
          className={`min-h-[56px] rounded-full border border-blush/40 bg-maroon-deepest/60 px-9 py-3 text-xl font-semibold text-warmwhite shadow-[0_0_40px_-6px_rgba(255,77,109,0.8)] backdrop-blur-md transition hover:bg-maroon-deepest/80 disabled:opacity-60 ${intro.urdu ? "font-urdu leading-[2]" : ""}`}
          lang={intro.lang}
          dir={intro.urdu ? "rtl" : "ltr"}
        >
          {intro.text}
        </motion.button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.6, duration: 1 }}
          className={`mt-4 text-sm tracking-widest text-blush/80 ${hint.urdu ? "font-urdu" : ""}`}
          lang={hint.lang}
          dir={hint.urdu ? "rtl" : "ltr"}
        >
          {hint.text}
        </motion.p>
      </div>
    </motion.section>
  );
}
