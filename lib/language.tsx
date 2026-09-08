"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ElementType, type ReactNode } from "react";

/** Every piece of copy carries both languages. */
export type Bi = { en: string; ur: string };
export type Lang = "en" | "ur";
/** bi = each screen in its native language (as designed); ur = Urdu only; en = English only */
export type LangMode = "bi" | "ur" | "en";

type LangValue = {
  mode: LangMode;
  setMode: (m: LangMode) => void;
  cycle: () => void;
  /** Which language a string should render in, given the screen's native language. */
  resolve: (primary: Lang) => Lang;
  /** Resolve one bilingual string. */
  t: (bi: Bi, primary?: Lang) => { text: string; urdu: boolean; lang: Lang };
};

const LanguageContext = createContext<LangValue | null>(null);
const STORAGE_KEY = "love-site-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<LangMode>("bi");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as LangMode | null;
      if (saved === "bi" || saved === "ur" || saved === "en") setModeState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = useCallback((m: LangMode) => {
    setModeState(m);
    try {
      window.localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }, []);

  const cycle = useCallback(() => {
    setMode(mode === "bi" ? "ur" : mode === "ur" ? "en" : "bi");
  }, [mode, setMode]);

  const resolve = useCallback((primary: Lang): Lang => (mode === "bi" ? primary : mode), [mode]);

  const t = useCallback(
    (bi: Bi, primary: Lang = "en") => {
      const lang = resolve(primary);
      return { text: bi[lang], urdu: lang === "ur", lang };
    },
    [resolve],
  );

  const value = useMemo(() => ({ mode, setMode, cycle, resolve, t }), [mode, setMode, cycle, resolve, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

/** Classes that make Urdu breathe: Nastaliq font, RTL, more line-height, a touch larger. */
export const URDU_TEXT = "font-urdu";

type LProps = {
  t: Bi;
  primary?: Lang;
  as?: ElementType;
  className?: string;
  /** extra classes only when rendering Urdu */
  urduClassName?: string;
  /** extra classes only when rendering English */
  enClassName?: string;
  /** animate in word by word (soft rise + un-blur, staggered) */
  reveal?: boolean;
  /** delay before the reveal starts, seconds */
  delay?: number;
  children?: never;
};

const wordVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 180, damping: 22 } },
};

/** Render one bilingual string in the active language with the right font/direction. */
export function L({ t: bi, primary = "en", as: Tag = "span", className = "", urduClassName = "", enClassName = "", reveal = false, delay = 0 }: LProps) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const r = t(bi, primary);
  const langClasses = r.urdu ? `${URDU_TEXT} ${urduClassName}` : enClassName;

  if (!reveal || reduce) {
    return (
      <Tag className={`${className} ${langClasses}`} lang={r.lang} dir={r.urdu ? "rtl" : "ltr"}>
        {r.text}
      </Tag>
    );
  }

  // gold-text uses background-clip:text, which must live on the animated word itself
  const gold = /\bgold-text\b/.test(className);
  const outer = className.replace(/\bgold-text\b/, "");
  const words = r.text.split(/(\s+)/);

  return (
    <Tag className={`${outer} ${langClasses}`} lang={r.lang} dir={r.urdu ? "rtl" : "ltr"} aria-label={r.text}>
      <motion.span initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }} aria-hidden>
        {words.map((w, i) =>
          /^\s+$/.test(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <motion.span key={i} className={`inline-block ${gold ? "gold-text" : ""}`} variants={wordVariants}>
              {w}
            </motion.span>
          ),
        )}
      </motion.span>
    </Tag>
  );
}

/** Helper for LineSequence: map bilingual lines to resolved SeqLine objects. */
export function useLines() {
  const { t } = useLang();
  return useCallback(
    (lines: Bi[], primary: Lang = "en", extra?: (i: number, urdu: boolean) => { hold?: number; className?: string }) =>
      lines.map((bi, i) => {
        const r = t(bi, primary);
        const e = extra?.(i, r.urdu) ?? {};
        return { text: r.text, urdu: r.urdu, hold: e.hold, className: e.className };
      }),
    [t],
  );
}
