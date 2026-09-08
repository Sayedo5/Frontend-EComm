export const STAGES = [
  "intro",
  "hero",
  "anniversaryCount",
  "loveLetter",
  "youAre",
  "memories",
  "loveQuestion",
  "yesResponse",
  "noResponse",
  "deeperLove",
  "deepestLoveCinematic",
  "urduLove",
  "urduPoetry",
  "proposalTransition",
  "proposalAsk",
  "qabool1",
  "qabool2",
  "qabool3",
  "ringAnimation",
  "engagementCelebration",
  "duaLove",
  "nikahEnding",
  "anniversaryCard",
  "finalMessage",
] as const;

export type Stage = (typeof STAGES)[number];

/** Stages that share one mounted component (so the hand/ring scene never unmounts). */
export const PROPOSAL_STAGES: Stage[] = ["proposalTransition", "proposalAsk"];
export const QABOOL_STAGES: Stage[] = ["qabool1", "qabool2", "qabool3", "ringAnimation"];
