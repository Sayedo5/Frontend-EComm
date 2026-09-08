"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { STAGES, type Stage } from "./stages";

type NavValue = {
  stage: Stage;
  /** true while a stage transition animation is running – buttons disable themselves */
  locked: boolean;
  go: (next: Stage) => void;
};

const NavContext = createContext<NavValue | null>(null);

export const TRANSITION_LOCK_MS = 1100;

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<Stage>("intro");
  const [locked, setLocked] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((next: Stage) => {
    setStage((current) => {
      if (current === next) return current;
      return next;
    });
    setLocked(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLocked(false), TRANSITION_LOCK_MS);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Testing aid: open /?stage=qabool3 (any stage name) to jump straight to a screen.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("stage") as Stage | null;
    if (wanted && STAGES.includes(wanted)) setStage(wanted);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const value = useMemo(() => ({ stage, locked, go }), [stage, locked, go]);
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside <NavProvider>");
  return ctx;
}
