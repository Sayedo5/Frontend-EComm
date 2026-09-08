"use client";

import { useEffect, useState } from "react";

/**
 * A clock that ticks exactly on the second boundary (no setInterval drift), pauses while the
 * tab is hidden and re-syncs the moment it comes back. Returns null until mounted so the
 * server and the first client paint agree.
 */
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let stopped = false;

    const tick = () => {
      if (stopped) return;
      const d = new Date();
      setNow(d);
      // schedule the next tick for the start of the next second
      timer = setTimeout(tick, 1000 - d.getMilliseconds() + 2);
    };
    const stop = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };
    const onVisibility = () => {
      stop();
      if (document.visibilityState === "visible") tick();
    };

    tick();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopped = true;
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return now;
}
