import type { CSSProperties } from "react";

type Props = { className?: string; style?: CSSProperties; fill?: string; title?: string };

/** Simple heart glyph used across the site (ambient hearts, glowing hearts, buttons). */
export default function Heart({ className = "", style, fill = "currentColor", title }: Props) {
  return (
    <svg viewBox="0 0 32 29" className={className} style={style} aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path
        fill={fill}
        d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 21.2 6.5-9.3 16-11.8 16-21.2C32 3.8 28.2 0 23.6 0z"
      />
    </svg>
  );
}

/** A large, softly glowing heart – used on the question screens where everything else fades away. */
export function GlowHeart({ size = 140, intensity = 1, className = "" }: { size?: number; intensity?: number; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size * 0.92 }} aria-hidden>
      <div
        className="glow-orb"
        style={{
          width: size * 2.2,
          height: size * 2.2,
          background: `radial-gradient(circle, rgba(255,77,109,${0.45 * intensity}) 0%, rgba(139,30,63,${0.25 * intensity}) 35%, transparent 65%)`,
        }}
      />
      <Heart className="relative h-full w-full animate-heartbeat text-rose" style={{ filter: "drop-shadow(0 0 18px rgba(255,77,109,0.6))" }} />
    </div>
  );
}
