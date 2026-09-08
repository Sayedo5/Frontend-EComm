"use client";

import { motion, useReducedMotion } from "framer-motion";
import { timeline } from "@/data/loveMessages";
import { L } from "@/lib/language";

/** Legacy-safe animated gallery shell. The story no longer renders memory photos. */
export default function PhotoGallery() {
  const reduce = useReducedMotion();
  return (
    <section className="w-full" aria-label="Animated love symbols">
      <L t={timeline.gallery} as="h3" className="display mb-4 text-xl text-blush sm:text-2xl" enClassName="italic" />
      <div className="grid grid-cols-3 gap-3">
        {["♡", "✦", "❀"].map((symbol, i) => (
          <motion.div key={symbol} className="flex aspect-square items-center justify-center rounded-2xl border border-blush/15 bg-gradient-to-br from-rose/30 to-maroon-mid/50 text-5xl text-blush" animate={reduce ? undefined : { y: [0, -6, 0], rotate: [-4, 4, -4] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}>
            {symbol}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
