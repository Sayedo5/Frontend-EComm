// Edit these to personalise the site. Everything else reads from here.
export const anniversaryConfig = {
  herName: "MONO",
  yourName: "Sayedo",
  // ISO dates used for the counters
  relationshipStartDate: "2022-09-09",
  anniversaryDate: "2026-09-09",
  // Display strings
  startDateDisplay: "09 September 2022",
  anniversaryDateDisplay: "09 September 2026",
  dateStamp: "09 • 09 • 2026",
  years: 4,
  // Media (drop your own files into /public and keep these paths)
  introVideo: "/video/love.mp4",
  introChime: "/audio/intro-chime.mp3",
  // Add these eight files to /public/music using these exact names.
  musicTracks: {
    // Existing file currently in the project; replace with opening.mp3 later if desired.
    opening: "/music/our-song.mp3",
    anniversaryMemories: "/music/anniversary-memories.mp3",
    loveLetter: "/music/love-letter.mp3",
    emotionalProposal: "/music/emotional-proposal.mp3",
    nikahAcceptance: "/music/nikah-acceptance.mp3",
    ringCelebration: "/music/ring-celebration.mp3",
    duaNikahPrayer: "/music/dua-nikah-prayer.mp3",
    finalAnniversary: "/music/final-anniversary.mp3",
  },
  // true = play love.mp4 as the opening visual; false = native canvas particle heart
  useIntroVideo: false,
};

/** One track loops for its whole emotional chapter, then changes at the next chapter. */
export const stageMusic = {
  intro: "opening",
  // Opening is intentionally only the intro. The first message starts the next track.
  hero: "anniversaryMemories",
  anniversaryCount: "anniversaryMemories",
  memories: "anniversaryMemories",
  loveLetter: "loveLetter",
  youAre: "loveLetter",
  loveQuestion: "emotionalProposal",
  yesResponse: "emotionalProposal",
  noResponse: "emotionalProposal",
  deeperLove: "emotionalProposal",
  deepestLoveCinematic: "emotionalProposal",
  urduLove: "emotionalProposal",
  urduPoetry: "emotionalProposal",
  proposalTransition: "emotionalProposal",
  proposalAsk: "emotionalProposal",
  qabool1: "nikahAcceptance",
  qabool2: "nikahAcceptance",
  qabool3: "nikahAcceptance",
  ringAnimation: "nikahAcceptance",
  engagementCelebration: "ringCelebration",
  duaLove: "duaNikahPrayer",
  nikahEnding: "duaNikahPrayer",
  anniversaryCard: "finalAnniversary",
  finalMessage: "finalAnniversary",
} as const;

export const musicTrackLabels = {
  opening: "Opening",
  anniversaryMemories: "Anniversary memories",
  loveLetter: "Love letter",
  emotionalProposal: "Emotional proposal",
  nikahAcceptance: "Nikkah acceptance",
  ringCelebration: "Ring / engagement celebration",
  duaNikahPrayer: "Dua and Nikkah prayer",
  finalAnniversary: "Final anniversary message",
} as const;

function daysBetween(a: string, b: string) {
  const ms = new Date(b + "T00:00:00Z").getTime() - new Date(a + "T00:00:00Z").getTime();
  return Math.round(ms / 86400000);
}

export const counts = {
  years: anniversaryConfig.years,
  months: anniversaryConfig.years * 12,
  days: daysBetween(anniversaryConfig.relationshipStartDate, anniversaryConfig.anniversaryDate),
};
