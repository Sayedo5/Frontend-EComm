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
  const wantsPlayback = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState<TrackId>(currentTrack.current);

  const playAudio = useCallback(() => {
    const audio = song.current;
    if (!audio) return;
    const start = () => audio.play().catch(() => setPlaying(false));
    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      start();
      return;
    }
    const onCanPlay = () => {
      audio.removeEventListener("canplay", onCanPlay);
      start();
    };
    audio.addEventListener("canplay", onCanPlay, { once: true });
    audio.load();
  }, []);

  const setTrackSource = useCallback((next: TrackId, autoplay: boolean) => {
    const audio = song.current;
    if (!audio || currentTrack.current === next && audio.src.endsWith(anniversaryConfig.musicTracks[next])) {
      if (autoplay) playAudio();
      return;
    }
    currentTrack.current = next;
    setTrack(next);
    audio.pause();
    audio.src = anniversaryConfig.musicTracks[next];
    audio.currentTime = 0;
    audio.load();
    if (autoplay) playAudio();
  }, [playAudio]);

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
    const onPlaying = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setPlaying(false);
    s.addEventListener("playing", onPlaying);
    s.addEventListener("pause", onPause);
    s.addEventListener("error", onError);
    return () => {
      s.removeEventListener("playing", onPlaying);
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
    setTrackSource(next, wantsPlayback.current);
  }, [stage, setTrackSource]);

  const play = useCallback(() => {
    wantsPlayback.current = true;
    playAudio();
  }, [playAudio]);
  const pause = useCallback(() => {
    wantsPlayback.current = false;
    song.current?.pause();
    chime.current?.pause();
  }, []);
  const toggle = useCallback(() => (song.current?.paused ? play() : pause()), [play, pause]);

  const startFromIntro = useCallback(() => {
    wantsPlayback.current = true;
    // Start immediately from the user's click so later chapter changes retain autoplay permission.
    setTrackSource("opening", true);
    const c = chime.current;
    if (c) {
      c.currentTime = 0;
      c.play().catch(() => {});
    }
  }, [setTrackSource]);

  const value = useMemo(() => ({ playing, track, startFromIntro, toggle, play, pause }), [playing, track, startFromIntro, toggle, play, pause]);
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside <MusicProvider>");
  return ctx;
}
