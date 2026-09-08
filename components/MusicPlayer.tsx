"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause } from "lucide-react";
import { music } from "@/data/loveMessages";
import { useLang } from "@/lib/language";
import { useMusic } from "@/lib/music";
import { useNav } from "@/lib/nav";

/**
 * Floating "Play our song 🎵" control. Hidden on the intro (the intro button starts the music).
 * Song file: /public/music/our-song.mp3 – swap freely.
 */
export default function MusicPlayer() {
  const { playing, toggle } = useMusic();
  const { stage } = useNav();
  const { bt } = useLang();
  const visible = stage !== "intro";
  const label = bt(playing ? music.pause : music.play);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="music"
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={label.text}
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
          <span className={`hidden sm:inline ${label.urdu ? "font-urdu" : ""}`} lang={label.lang} dir={label.urdu ? "rtl" : "ltr"}>
            {label.text}
          </span>
          <span className="sm:hidden">{playing ? "Pause" : "Play"}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
