"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { anniversaryConfig } from "@/data/anniversaryConfig";

type MusicValue = {
  playing: boolean;
  /** Play the one-shot intro chime, then start the looping song. Must be called from a user gesture. */
  startFromIntro: () => void;
  toggle: () => void;
  play: () => void;
  pause: () => void;
};

const MusicContext = createContext<MusicValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const song = useRef<HTMLAudioElement | null>(null);
  const chime = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const s = new Audio(anniversaryConfig.ourSong);
    s.loop = true;
    s.preload = "auto";
    s.volume = 0.7;
    song.current = s;
    const c = new Audio(anniversaryConfig.introChime);
    c.preload = "auto";
    c.volume = 0.9;
    chime.current = c;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    s.addEventListener("play", onPlay);
    s.addEventListener("pause", onPause);
    return () => {
      s.removeEventListener("play", onPlay);
      s.removeEventListener("pause", onPause);
      s.pause();
      c.pause();
    };
  }, []);

  const play = useCallback(() => {
    song.current?.play().catch(() => setPlaying(false));
  }, []);
  const pause = useCallback(() => {
    song.current?.pause();
  }, []);
  const toggle = useCallback(() => {
    if (song.current?.paused) play();
    else pause();
  }, [play, pause]);

  const startFromIntro = useCallback(() => {
    const c = chime.current;
    if (!c) {
      play();
      return;
    }
    let started = false;
    const startSong = () => {
      if (started) return;
      started = true;
      play();
    };
    c.currentTime = 0;
    c.addEventListener("ended", startSong, { once: true });
    c.play()
      .then(() => {
        // Safety net: if the chime is long or never fires `ended`, start the loop anyway.
        setTimeout(startSong, 2600);
      })
      .catch(startSong);
  }, [play]);

  const value = useMemo(
    () => ({ playing, startFromIntro, toggle, play, pause }),
    [playing, startFromIntro, toggle, play, pause],
  );
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside <MusicProvider>");
  return ctx;
}
