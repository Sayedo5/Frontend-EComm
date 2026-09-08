# Four Years & Forever ❤️

A private, one-recipient anniversary + proposal website. Next.js 14 (App Router), TypeScript, Tailwind, Framer Motion. Fully static, no backend, no API keys.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Deploy to Vercel with `vercel deploy` (or import the repo in the Vercel dashboard). Zero config needed.

## Make it yours

Everything personal lives in `data/` — no UI code needs touching. Every string has an `en` and a `ur` version.

| File | What's in it |
| --- | --- |
| `data/anniversaryConfig.ts` | names (Sayedo & MONO), dates, media paths, `useIntroVideo` switch |
| `data/loveMessages.ts` | every line of copy, stage by stage, English + Urdu |
| `data/poetry.ts` | the Urdu love section and the three poems (with English renderings) |
| `data/spiritual.ts` | the spiritual expressions screen, the "خدا گواہ ہے" line, the promises after the Nikah dua, and the anniversary card text |
| `data/memories.ts` | the five timeline nodes (year, title, caption, photo) |
| `data/thingsILove.ts` | the "You are…" words |

Media (drop your own files in, keep the names):

| Path | Used for |
| --- | --- |
| `public/images/hands/stage-a.jpg … stage-c-held.jpg`, `nikah-henna.jpg` | the real-hands Qabool sequence, celebration and Nikah ending. CC0 stock photos are included (see `CREDITS.md` there); replace them with your own. If you swap a photo, update its `ring` position in `components/HandPhotos.tsx` so the glint lands on the ring. |
| `public/video/love.mp4` | optional opening video (set `useIntroVideo: true`); by default the opening is the canvas particle heart |
| `public/audio/intro-chime.mp3` | plays once when she taps "Open My Heart" |
| `public/music/our-song.mp3` | loops for the rest of the site, toggled by the "Play our song" button |
| `public/images/photo1.jpg … photo5.jpg` | timeline + gallery photos (placeholders included; any missing file shows a soft fallback card) |

## Language toggle

Top-left pill: **اردو | Both | English**.
- **Both** (default): each screen in the language it was written in, exactly as designed.
- **اردو**: everything in Urdu, Nastaliq, RTL, with extra line-height.
- **English**: everything in English. The spiritual expressions screen stays in Urdu (as requested) with a small English gloss.

The choice is remembered in `localStorage`.

## Story flow

```
intro → hero → anniversaryCount → loveLetter → youAre → memories
  → loveQuestion → (yesResponse | noResponse) → deeperLove
  → deepestLoveCinematic → urduLove → urduPoetry
  → proposalTransition → proposalAsk → qabool1 → qabool2 → qabool3
  → ringAnimation → engagementCelebration → duaLove → nikahEnding
  → anniversaryCard → finalMessage
```

Both answers to every question reconverge on the same next screen. The "No" path is slower and gentler, never a worse ending.

## The counter

The anniversary counter shows running totals since `relationshipStartDate`: years, months, days, and (live, ticking every second) hours, minutes and seconds, plus an exact calendar breakdown (X years, Y months, Z days, hh:mm:ss). Digits flip individually when they change.

## Visual system

- `components/ParticleHeart.tsx` — the canvas particle heart (breathing, shimmer, edge sparks, halo). Props: `size`, `density`, `intensity`, `opacity`. Used on the opening, hero, "Do you love me?", the cinematic, the celebration (burst), Nikah ending and final message.
- `lib/backgrounds.ts` — one named background mood per screen, all built on the same base recipe. `components/MoodLayer.tsx` crossfades between them as the story moves, so the theme changes with every screen instead of cutting.
- Screens enter with a soft rise + un-blur and leave the same way; headings reveal word by word (`<L reveal />`); photos drift slowly (Ken Burns); the card tilts with the pointer and floats idly.
- `components/ui/StageButton.tsx` — every button emits a small heart burst on press (`HeartBurstButton`).
- `components/AnniversaryCard.tsx` — the emerald + gold card: front cover → inside (shayari | message) → back (یا علیؑ ادرکنی). Tap to turn.

## Testing a specific screen

Open `/?stage=<name>` with any stage name from the list above, e.g. `/?stage=qabool3`.

## Notes

- Ambient motion is CSS-only and capped at ~25 nodes per screen; the particle heart is one canvas.
- `prefers-reduced-motion`: static heart, no ambient motion, no heart bursts, photos still cross-fade gently.
- Audio never autoplays; it starts from the intro tap.
