"use client";

import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { spring } from "./motion";

/*
 * One shared pointer listener for the whole page. Returns spring-smoothed motion values in
 * -0.5 … 0.5 (x, y) relative to the viewport centre, so ambient layers, the cursor glow and
 * the parallax on each stage all follow the same hand. On touch devices the values stay at 0.
 */

type Listener = (x: number, y: number) => void;
const listeners = new Set<Listener>();
let attached = false;
let last = { x: 0, y: 0 };

function attach() {
  if (attached || typeof window === "undefined") return;
  attached = true;
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    last = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
    listeners.forEach((l) => l(last.x, last.y));
  };
  const onLeave = () => {
    last = { x: 0, y: 0 };
    listeners.forEach((l) => l(0, 0));
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
}

/** true when the device has a fine pointer that can hover (i.e. a mouse/trackpad). */
export function useCanHover() {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCan(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return can;
}

/** Spring-smoothed pointer position (-0.5 … 0.5). `strength` scales the output. */
export function usePointer(strength = 1): { x: MotionValue<number>; y: MotionValue<number> } {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const x = useSpring(rx, spring.follow);
  const y = useSpring(ry, spring.follow);
  useEffect(() => {
    attach();
    const l: Listener = (px, py) => {
      rx.set(px * strength);
      ry.set(py * strength);
    };
    listeners.add(l);
    l(last.x, last.y);
    return () => {
      listeners.delete(l);
    };
  }, [rx, ry, strength]);
  return { x, y };
}
