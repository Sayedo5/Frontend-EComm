"use client";

import { motion } from "framer-motion";
import { urduSection } from "@/data/loveMessages";
import { urduLove } from "@/data/poetry";
import { L, useLang } from "@/lib/language";
import { useNav } from "@/lib/nav";
import RosePetals from "./RosePetals";
import Sparkles from "./Sparkles";
import StageButton from "./ui/StageButton";
import StageWrap from "./ui/StageWrap";

/** 5.10 – Urdu love section. Rose-gold with soft bokeh, RTL, slower petals. */
export default function UrduLove() {
  const { go } = useNav();
  const { t, bt, resolve, mode } = useLang();
  const urdu = resolve("ur") === "ur";
  const button = bt(urduSection.button);

  return (
    <StageWrap
      mood="roseGold"
      ambient={
        <>
          <Sparkles kind="bokeh" count={12} seed={17} slow={1.4} />
          <RosePetals count={8} slow={1.8} gold seed={18} />
        </>
      }
      dir={urdu ? "rtl" : "ltr"}
      lang={urdu ? "ur" : "en"}
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
        <L t={urduLove.heading} primary="ur" as="h2" reveal delay={0.3} className="mb-6 font-semibold gold-text" urduClassName="text-3xl sm:text-4xl leading-[2.2]" enClassName="display text-3xl sm:text-4xl" />
      </motion.div>

      <div className="flex flex-col gap-4">
        {urduLove.paragraphs.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: urdu ? 24 : -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: 0.8 + i * 1.5 }}>
            <L t={p} primary="ur" as="p" className="measure text-warmwhite" urduClassName="text-[1.35rem] sm:text-2xl leading-[2.3]" enClassName="text-xl sm:text-2xl leading-relaxed" />
          </motion.div>
        ))}
      </div>

      {mode !== "en" && (
        <motion.p dir="ltr" lang="en" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 7.2 }} className="measure mt-8 font-serif text-base italic leading-relaxed text-blush/85 sm:text-lg">
          “{urduLove.romanUrdu}”
        </motion.p>
      )}

      <div className="mt-10">
        <StageButton onClick={() => go("urduPoetry")} variant="soft" delay={8.2} urdu={button.urdu}>
          {button.text}
        </StageButton>
      </div>
    </StageWrap>
  );
}
