"use client";

import { AnimatePresence } from "framer-motion";
import AnniversaryCard from "@/components/AnniversaryCard";
import AnniversaryIntro from "@/components/AnniversaryIntro";
import CuteGirlSection from "@/components/CuteGirlSection";
import DeeperLove from "@/components/DeeperLove";
import DeepestLoveCinematic from "@/components/DeepestLoveCinematic";
import DuaLove from "@/components/DuaLove";
import EngagementCelebration from "@/components/EngagementCelebration";
import FinalMessage from "@/components/FinalMessage";
import Hero from "@/components/Hero";
import LanguageToggle from "@/components/LanguageToggle";
import LoveLetter from "@/components/LoveLetter";
import LoveQuestion from "@/components/LoveQuestion";
import MemoryTimeline from "@/components/MemoryTimeline";
import MoodLayer from "@/components/MoodLayer";
import MusicPlayer from "@/components/MusicPlayer";
import NikahEnding from "@/components/NikahEnding";
import NoLoveResponse from "@/components/NoLoveResponse";
import ParticleHeartIntro from "@/components/ParticleHeartIntro";
import ProposalTransition from "@/components/ProposalTransition";
import QaboolExperience from "@/components/QaboolExperience";
import UrduLove from "@/components/UrduLove";
import UrduPoetry from "@/components/UrduPoetry";
import YesLoveResponse from "@/components/YesLoveResponse";
import { LanguageProvider } from "@/lib/language";
import { MusicProvider } from "@/lib/music";
import { NavProvider, useNav } from "@/lib/nav";
import { PROPOSAL_STAGES, QABOOL_STAGES, type Stage } from "@/lib/stages";

/**
 * The whole story is one state machine:
 * hero → anniversaryCount → loveLetter → youAre → memories → loveQuestion
 *   → (yesResponse | noResponse) → deeperLove → deepestLoveCinematic → urduLove → urduPoetry
 *   → proposalTransition → proposalAsk → qabool1 → qabool2 → qabool3 → ringAnimation
 *   → engagementCelebration → duaLove → nikahEnding → anniversaryCard → finalMessage
 */
function Story() {
  const { stage } = useNav();

  // Group stages that share one mounted component so their animations carry over.
  const key: string = PROPOSAL_STAGES.includes(stage) ? "proposal" : QABOOL_STAGES.includes(stage) ? "qabool" : stage;

  const screens: Record<string, JSX.Element> = {
    intro: <ParticleHeartIntro />,
    hero: <Hero />,
    anniversaryCount: <AnniversaryIntro />,
    loveLetter: <LoveLetter />,
    youAre: <CuteGirlSection />,
    memories: <MemoryTimeline />,
    loveQuestion: <LoveQuestion />,
    yesResponse: <YesLoveResponse />,
    noResponse: <NoLoveResponse />,
    deeperLove: <DeeperLove />,
    deepestLoveCinematic: <DeepestLoveCinematic />,
    urduLove: <UrduLove />,
    urduPoetry: <UrduPoetry />,
    proposal: <ProposalTransition />,
    qabool: <QaboolExperience />,
    engagementCelebration: <EngagementCelebration />,
    duaLove: <DuaLove />,
    nikahEnding: <NikahEnding />,
    anniversaryCard: <AnniversaryCard />,
    finalMessage: <FinalMessage />,
  };

  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden" data-stage={stage satisfies Stage}>
      <MoodLayer />
      <LanguageToggle />
      <MusicPlayer />
      <AnimatePresence mode="wait" initial={false}>
        <div key={key} className="w-full">
          {screens[key]}
        </div>
      </AnimatePresence>
    </main>
  );
}

export default function Page() {
  return (
    <NavProvider>
      <LanguageProvider>
        <MusicProvider>
          <Story />
        </MusicProvider>
      </LanguageProvider>
    </NavProvider>
  );
}
