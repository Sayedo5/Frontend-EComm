"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ui } from "@/data/loveMessages";
import { useLang, type LangMode } from "@/lib/language";
import { useNav } from "@/lib/nav";

const ORDER: LangMode[] = ["ur", "bi", "en"];

/** Persistent three-way segmented control: اردو | Both | English. Hidden on the intro. */
export default function LanguageToggle() {
  const { mode, setMode } = useLang();
  const { stage } = useNav();
  return (
    <AnimatePresence>
      {stage !== "intro" && (
        <motion.div
          key="lang"
          role="group"
          aria-label="Language"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="fixed left-3 z-50 flex items-center rounded-full border border-blush/30 bg-maroon-deepest/70 p-1 text-xs text-warmwhite shadow-lg backdrop-blur-md"
          style={{ top: "calc(0.75rem + env(safe-area-inset-top, 0px))" }}
        >
          {ORDER.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`relative min-h-[36px] min-w-[44px] rounded-full px-3 transition-colors ${mode === m ? "text-maroon-deepest" : "text-blush hover:text-warmwhite"} ${m === "ur" ? "font-urdu lang-pill text-sm" : ""}`}
              lang={m === "ur" ? "ur" : "en"}
            >
              {mode === m && <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative">{ui.langToggle[m]}</span>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
