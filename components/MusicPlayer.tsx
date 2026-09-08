"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause } from "lucide-react";
import { music } from "@/data/loveMessages";
import { musicTrackLabels } from "@/data/anniversaryConfig";
import { useLang } from "@/lib/language";
import { useMusic } from "@/lib/music";
import { useNav } from "@/lib/nav";

/**
 * Floating chapter music control. Hidden on the intro (the intro button starts the music).
 * The active track name is shown so each emotional chapter is easy to verify.
 */
export default function MusicPlayer() {
  const { playing, toggle, track } = useMusic();
  const { stage } = useNav();
  const { bt } = useLang();
  const visible = stage !== "intro";
  const label = bt(playing ? music.pause : music.play);
  const trackLabel = musicTrackLabels[track];

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="music"
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={`${label.text} · ${trackLabel}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="fixed right-3 z-50 flex min-h-[44px] items-center gap-2 rounded-full border border-blush/30 bg-maroon-deepest/70 px-4 py-2 text-sm text-warmwhite shadow-lg backdrop-blur-md hover:bg-maroon-deepest/90"
          style={{ top: "calc(0.75rem + env(safe-area-inset-top, 0px))" }}
        >
          <span className={`relative flex h-5 w-5 items-center justify-center ${playing ? "text-gold" : "text-blush"}`}>
            {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
            {playing && <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" />}
          </span>
          <span className="hidden sm:inline" lang="en" dir="ltr">
            {label.text} · {trackLabel}
          </span>
          <span className="sm:hidden">{label.text} · {trackLabel}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
