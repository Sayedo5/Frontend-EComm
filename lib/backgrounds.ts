/*
 * One background "mood" per screen. All share the reference video's base recipe
 * (#1A0812 → #12060C → #0D0509 with an off-centre #4A1030 glow) so the site stays
 * cohesive, but each screen shifts the light to match its emotional beat.
 */

export const BASE_NIGHT =
  "radial-gradient(ellipse at 22% 15%, #4A1030 0%, transparent 55%), linear-gradient(160deg, #1A0812 0%, #12060C 70%, #0D0509 100%)";

export const moods = {
  /** Opening / Hero: deep night maroon behind the particle heart */
  night: BASE_NIGHT,
  /** Anniversary counter: soft warm dark with faint gold from above */
  warmDark:
    "radial-gradient(ellipse at 50% -10%, rgba(247,200,115,0.16) 0%, transparent 50%), radial-gradient(ellipse at 22% 15%, #4A1030 0%, transparent 55%), linear-gradient(160deg, #1A0812 0%, #12060C 70%, #0D0509 100%)",
  /** Love letter: candlelight – amber pooling from one side, very still */
  candle:
    "radial-gradient(ellipse at 88% 70%, rgba(255,166,77,0.22) 0%, rgba(255,120,60,0.08) 30%, transparent 60%), radial-gradient(ellipse at 10% 10%, #3a0d22 0%, transparent 50%), linear-gradient(160deg, #1c0a12 0%, #140609 70%, #0D0509 100%)",
  /** "You are…": blush-rose, lighter and warmer */
  blush:
    "radial-gradient(ellipse at 50% 100%, #8a2249 0%, #4A1030 45%, transparent 75%), radial-gradient(ellipse at 20% 10%, rgba(255,179,198,0.18) 0%, transparent 45%), linear-gradient(160deg, #2a0c19 0%, #1A0812 60%, #12060C 100%)",
  /** Memory timeline: dusk, maroon into deep blue – time passing */
  dusk:
    "linear-gradient(180deg, #1A0812 0%, #24102a 45%, #141a3a 100%), radial-gradient(ellipse at 22% 15%, #4A1030 0%, transparent 55%)",
  /** Do you love me: near-black with one spotlight behind the heart */
  spotlight: "radial-gradient(circle at 50% 42%, #3b0d24 0%, #1a0710 30%, #0b0406 65%, #070203 100%)",
  /** Deepest love: almost pure black */
  silence: "radial-gradient(ellipse at 50% 50%, #140610 0%, #090306 60%, #050203 100%)",
  /** Urdu love + poetry: rose-gold with faint bokeh */
  roseGold:
    "radial-gradient(ellipse at 70% 15%, rgba(247,200,115,0.14) 0%, transparent 45%), radial-gradient(ellipse at 20% 80%, rgba(201,24,74,0.35) 0%, transparent 55%), linear-gradient(160deg, #2b0b1a 0%, #1A0812 55%, #12060C 100%)",
  /** Proposal transition: darkening, starlit */
  starlit: "radial-gradient(ellipse at 50% 120%, #2a0c1b 0%, transparent 55%), linear-gradient(180deg, #05020a 0%, #0f0512 55%, #1A0812 100%)",
  /** Qabool sequence: golden hour – the richest gold in the site */
  goldenHour:
    "radial-gradient(ellipse at 50% 70%, rgba(247,200,115,0.30) 0%, rgba(201,120,60,0.14) 30%, transparent 65%), radial-gradient(ellipse at 22% 15%, #5a1834 0%, transparent 55%), linear-gradient(160deg, #2a0f18 0%, #1a0a10 60%, #0D0509 100%)",
  /** Engagement celebration: same golden mood, slightly brighter */
  goldenBright:
    "radial-gradient(ellipse at 50% 60%, rgba(247,200,115,0.36) 0%, rgba(255,160,90,0.16) 30%, transparent 65%), radial-gradient(ellipse at 22% 15%, #6a1c3c 0%, transparent 55%), linear-gradient(160deg, #331220 0%, #1c0a12 60%, #0D0509 100%)",
  /** Nikah ending: deep night blue-maroon with moonlight */
  moonlight: "radial-gradient(ellipse at 50% -10%, #2b2450 0%, #1a0f2a 30%, #1c0a16 65%, #0e0b1f 100%)",
  /** Final message: back to the opening palette, quieter */
  fullCircle: "radial-gradient(ellipse at 22% 15%, #3a0d26 0%, transparent 55%), linear-gradient(160deg, #1A0812 0%, #12060C 70%, #0D0509 100%)",
} as const;

export type Mood = keyof typeof moods;

import type { Stage } from "./stages";

/** Which mood each screen uses – the MoodLayer crossfades between these as the story moves. */
export const stageMood: Record<Stage, Mood> = {
  intro: "night",
  hero: "night",
  anniversaryCount: "warmDark",
  loveLetter: "candle",
  youAre: "blush",
  memories: "dusk",
  loveQuestion: "spotlight",
  yesResponse: "blush",
  noResponse: "spotlight",
  deeperLove: "spotlight",
  deepestLoveCinematic: "silence",
  urduLove: "roseGold",
  urduPoetry: "roseGold",
  proposalTransition: "starlit",
  proposalAsk: "starlit",
  qabool1: "goldenHour",
  qabool2: "goldenHour",
  qabool3: "goldenHour",
  ringAnimation: "goldenHour",
  engagementCelebration: "goldenBright",
  duaLove: "roseGold",
  nikahEnding: "moonlight",
  anniversaryCard: "goldenHour",
  finalMessage: "fullCircle",
};
