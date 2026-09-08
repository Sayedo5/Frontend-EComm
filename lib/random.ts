/** Deterministic pseudo-random so server and client render identical ambient layouts. */
export function seeded(seed: number) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function range(rand: () => number, min: number, max: number) {
  return min + rand() * (max - min);
}
