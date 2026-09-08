/*
 * One motion vocabulary for the whole site. Every screen pulls its easings, springs and
 * variants from here so entrances, exits and idle motion feel like one hand made them.
 */
import type { SpringOptions, Variants } from "framer-motion";

/** Easing curves */
export const ease = {
  /** soft, cinematic settle – the default for anything entering */
  out: [0.22, 1, 0.36, 1] as const,
  /** symmetrical, for crossfades and things that move away */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** a little overshoot for playful pops */
  back: [0.34, 1.56, 0.64, 1] as const,
};

/** Spring presets */
export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 18, mass: 0.9 },
  gentle: { type: "spring", stiffness: 180, damping: 22 },
  pop: { type: "spring", stiffness: 300, damping: 16 },
  snappy: { type: "spring", stiffness: 420, damping: 30 },
  /** for things that follow the pointer */
  follow: { type: "spring", stiffness: 60, damping: 18, mass: 1.2 },
} satisfies Record<string, SpringOptions & { type: "spring" }>;

/** Durations in seconds */
export const dur = { fast: 0.35, base: 0.7, slow: 1.1, cinematic: 1.8 };

/** A fade + soft rise + un-blur. The site's bread-and-butter entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: dur.slow, ease: ease.out } },
  exit: { opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: dur.fast + 0.15, ease: ease.inOut } },
};

/** Plain fade */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: dur.slow, ease: ease.out } },
  exit: { opacity: 0, transition: { duration: dur.fast } },
};

/** Bloom: scale up from slightly small, with blur – for hearts, rings, big words. */
export const bloom: Variants = {
  hidden: { opacity: 0, scale: 0.86, filter: "blur(8px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: dur.cinematic, ease: ease.out } },
  exit: { opacity: 0, scale: 1.04, filter: "blur(6px)", transition: { duration: dur.base, ease: ease.inOut } },
};

/** Pop: springy scale-in for chips, badges, small delights. */
export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.4, y: 24 },
  show: { opacity: 1, scale: 1, y: 0, transition: spring.pop },
  exit: { opacity: 0, scale: 0.6, transition: { duration: dur.fast } },
};

/** Slide in from the reading direction (pass rtl to mirror). */
export const slideIn = (rtl = false, distance = 28): Variants => ({
  hidden: { opacity: 0, x: rtl ? distance : -distance, filter: "blur(4px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: dur.slow, ease: ease.out } },
  exit: { opacity: 0, x: rtl ? -distance / 2 : distance / 2, transition: { duration: dur.fast } },
});

/** Parent that staggers its children's `hidden → show`. */
export const stagger = (each = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
});

/** One word / character inside a text reveal. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: spring.gentle },
};
export const charReveal: Variants = {
  hidden: { opacity: 0, y: "0.35em", rotateX: -60, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 260, damping: 24 } },
};

/** Idle motion – loop these with `animate` on anything that should never be quite still. */
export const idle = {
  float: (amp = 6, duration = 6) => ({ y: [0, -amp, 0], transition: { duration, repeat: Infinity, ease: "easeInOut" } }),
  sway: (deg = 2, duration = 7) => ({ rotate: [-deg, deg, -deg], transition: { duration, repeat: Infinity, ease: "easeInOut" } }),
  breathe: (amount = 0.04, duration = 5) => ({ scale: [1, 1 + amount, 1], transition: { duration, repeat: Infinity, ease: "easeInOut" } }),
  heartbeat: (duration = 2.4) => ({
    scale: [1, 1.06, 1, 1.05, 1],
    transition: { duration, times: [0, 0.14, 0.28, 0.42, 0.6], repeat: Infinity, ease: "easeInOut" },
  }),
};

/** Helper: `delay` seconds added to a variant transition without redefining the variant. */
export const withDelay = (v: Variants, delay: number): Variants => ({
  ...v,
  show: { ...(v.show as object), transition: { ...((v.show as { transition?: object }).transition ?? {}), delay } },
});
