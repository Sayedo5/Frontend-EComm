"use client";

import { motion } from "framer-motion";
import { urduSection } from "@/data/loveMessages";
import { poems } from "@/data/poetry";
import { L, useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import RosePetals from "./RosePetals";
import Sparkles from "./Sparkles";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/** 5.11 – Original Urdu poetry. Three cards, gold left border, generous spacing, rose-gold bokeh. */
export default function UrduPoetry() {
  const { go } = useNav();
  const { t, bt, resolve } = useLang();
  const urdu = resolve("ur") === "ur";
  const button = bt(urduSection.poetryButton);

  return (
    <StageWrap
      mood="roseGold"
      ambient={
        <>
          <Sparkles kind="bokeh" count={10} seed={23} slow={1.6} />
          <RosePetals count={6} slow={2} gold seed={24} />
        </>
      }
      dir={urdu ? "rtl" : "ltr"}
      lang={urdu ? "ur" : "en"}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        {poems.map((poem, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 + i * 2.2 }}
            className={`rounded-2xl border-l-4 border-gold bg-white/[0.04] px-6 py-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] sm:px-8 ${urdu ? "text-right" : "text-left"}`}
          >
            {poem.lines.map((line, k) => (
              <L key={k} t={line} primary="ur" as="p" className="text-warmwhite" urduClassName="text-[1.3rem] sm:text-2xl leading-[2.3]" enClassName="text-xl sm:text-2xl leading-relaxed italic" />
            ))}
          </motion.blockquote>
        ))}
      </div>
      <div className="mt-10" dir="ltr">
        <StageButton onClick={() => go("proposalTransition")} variant="gold" delay={7.5} urdu={button.urdu}>
          {button.text}
        </StageButton>
      </div>
    </StageWrap>
  );
}
