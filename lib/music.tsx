"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { anniversaryConfig, stageMusic } from "@/data/anniversaryConfig";
import { useNav } from "./nav";

type TrackId = keyof typeof anniversaryConfig.musicTracks;

type MusicValue = {
  playing: boolean;
  track: TrackId;
  startFromIntro: () => void;
  toggle: () => void;
  play: () => void;
  pause: () => void;
};

const MusicContext = createContext<MusicValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const { stage } = useNav();
  const song = useRef<HTMLAudioElement | null>(null);
  const chime = useRef<HTMLAudioElement | null>(null);
  const currentTrack = useRef<TrackId>(stageMusic[stage] as TrackId);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState<TrackId>(currentTrack.current);

  const setTrackSource = useCallback((next: TrackId, autoplay: boolean) => {
    const audio = song.current;
    if (!audio || currentTrack.current === next && audio.src.endsWith(anniversaryConfig.musicTracks[next])) {
      if (autoplay) audio?.play().catch(() => setPlaying(false));
      return;
    }
    currentTrack.current = next;
    setTrack(next);
    audio.pause();
    audio.src = anniversaryConfig.musicTracks[next];
    audio.currentTime = 0;
    audio.load();
    if (autoplay) audio.play().catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    const s = new Audio();
    s.loop = true;
    s.preload = "auto";
    s.volume = 0.7;
    s.src = anniversaryConfig.musicTracks[currentTrack.current];
    song.current = s;
    const c = new Audio("/audio/intro-chime.mp3");
    c.preload = "auto";
    c.volume = 0.9;
    chime.current = c;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setPlaying(false);
    s.addEventListener("play", onPlay);
    s.addEventListener("pause", onPause);
    s.addEventListener("error", onError);
    return () => {
      s.removeEventListener("play", onPlay);
      s.removeEventListener("pause", onPause);
      s.removeEventListener("error", onError);
      s.pause();
      c.pause();
    };
  }, []);

  // A chapter change switches tracks only if music was already playing.
  useEffect(() => {
    const next = stageMusic[stage] as TrackId;
    if (next === currentTrack.current) return;
    setTrackSource(next, playing);
  }, [stage, playing, setTrackSource]);

  const play = useCallback(() => {
    song.current?.play().catch(() => setPlaying(false));
  }, []);
  const pause = useCallback(() => song.current?.pause(), []);
  const toggle = useCallback(() => (song.current?.paused ? play() : pause()), [play, pause]);

  const startFromIntro = useCallback(() => {
    setTrackSource("opening", false);
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
    c.play().then(() => setTimeout(startSong, 2600)).catch(startSong);
  }, [play, setTrackSource]);

  const value = useMemo(() => ({ playing, track, startFromIntro, toggle, play, pause }), [playing, track, startFromIntro, toggle, play, pause]);
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside <MusicProvider>");
  return ctx;
}
