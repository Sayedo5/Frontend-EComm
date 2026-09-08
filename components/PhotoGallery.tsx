"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { memories } from "@/data/memories";
import { timeline } from "@/data/loveMessages";
import { L } from "@/lib/language";
import Heart from "./ui/Heart";

/** One photo that falls back to a soft placeholder until the real jpg is dropped in. */
export function Photo({ src, alt, className = "", label }: { src: string; alt: string; className?: string; label?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-[linear-gradient(135deg,#5a1028,#240b16)] ${className}`} role="img" aria-label={alt}>
        <div className="flex flex-col items-center gap-2 text-blush/70">
          <Heart className="h-8 w-8 text-rose/70" />
          <span className="text-xs tracking-widest">{label ?? "add photo"}</span>
        </div>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

/** Elegant fade/scale-in grid of our photos (photo1.jpg … photo5.jpg). */
export default function PhotoGallery() {
  const reduce = useReducedMotion();
  return (
    <section className="w-full" aria-label="Photo gallery">
      <L t={timeline.gallery} as="h3" className="display mb-4 text-xl text-blush sm:text-2xl" enClassName="italic" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {memories.map((m, i) => (
          <motion.figure
            key={m.photo}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: (i % 3) * 0.12 }}
            className={`relative overflow-hidden rounded-2xl border border-blush/15 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] ${i === 0 ? "col-span-2 aspect-[16/10] sm:col-span-1 sm:aspect-square" : "aspect-square"}`}
          >
            <Photo src={m.photo} alt={m.alt} className="h-full w-full" label={m.photo.split("/").pop()} />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-deepest/90 to-transparent px-3 pb-2 pt-8 text-left text-sm text-blush">{m.year}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
