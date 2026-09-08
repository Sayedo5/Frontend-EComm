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
  ourSong: "/music/our-song.mp3",
  // true = play love.mp4 as the opening visual; false = native canvas particle heart
  useIntroVideo: false,
};

function daysBetween(a: string, b: string) {
  const ms = new Date(b + "T00:00:00Z").getTime() - new Date(a + "T00:00:00Z").getTime();
  return Math.round(ms / 86400000);
}

export const counts = {
  years: anniversaryConfig.years,
  months: anniversaryConfig.years * 12,
  days: daysBetween(anniversaryConfig.relationshipStartDate, anniversaryConfig.anniversaryDate),
};
