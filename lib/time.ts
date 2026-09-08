/*
 * Time since the relationship began – all the arithmetic in one place, pure and testable.
 *
 * Two views of the same span:
 *   breakdown  → "3 years, 11 months, 30 days, 14:22:05"   (calendar-exact, every unit is a remainder)
 *   totals     → "1,460 days · 35,040 hours · …"            (running totals in each unit)
 *
 * Everything is done in local calendar time so the counter matches the wall clock she is
 * looking at, and day counting goes through UTC-noon anchors so DST changes never make a day
 * come out 23 or 25 hours long.
 */

export type Breakdown = { years: number; months: number; days: number; hours: number; minutes: number; seconds: number };
export type Totals = { years: number; months: number; days: number; hours: number; minutes: number; seconds: number };

const DAY_MS = 86_400_000;

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/** `start` shifted by `n` whole calendar months, clamping the day (31 Jan + 1 month → 28/29 Feb). */
export function addMonths(start: Date, n: number) {
  const total = start.getMonth() + n;
  const year = start.getFullYear() + Math.floor(total / 12);
  const month = ((total % 12) + 12) % 12;
  const day = Math.min(start.getDate(), daysInMonth(year, month));
  return new Date(year, month, day, start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds());
}

/** Whole calendar days from a's date to b's date (ignores time of day, DST-safe). */
export function calendarDaysBetween(a: Date, b: Date) {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / DAY_MS);
}

/** Whole calendar months from start to now (the largest n such that start + n months <= now). */
export function wholeMonthsBetween(start: Date, now: Date) {
  let n = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (addMonths(start, n).getTime() > now.getTime()) n -= 1;
  return Math.max(0, n);
}

/** Calendar-exact breakdown: X years, Y months, Z days, hh:mm:ss. Each unit is a remainder of the one above. */
export function breakdownSince(start: Date, now: Date): Breakdown {
  if (now.getTime() <= start.getTime()) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const months = wholeMonthsBetween(start, now);
  const anchor = addMonths(start, months); // same time of day as `start`, `months` later

  // Whole days after the month anchor, then the remaining time of day.
  let days = calendarDaysBetween(anchor, now);
  let seconds =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() - (anchor.getHours() * 3600 + anchor.getMinutes() * 60 + anchor.getSeconds());
  if (seconds < 0) {
    seconds += 86_400;
    days -= 1;
  }

  return {
    years: Math.floor(months / 12),
    months: months % 12,
    days,
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

/** Running totals: whole years, whole months, whole days, hours, minutes and seconds elapsed. */
export function totalsSince(start: Date, now: Date): Totals {
  const ms = Math.max(0, now.getTime() - start.getTime());
  const months = wholeMonthsBetween(start, now);
  return {
    years: Math.floor(months / 12),
    months,
    days: wholeDaysBetween(start, now),
    hours: Math.floor(ms / 3_600_000),
    minutes: Math.floor(ms / 60_000),
    seconds: Math.floor(ms / 1000),
  };
}

/** Whole days elapsed, DST-safe: calendar days, minus one if today's time of day is still before the start's. */
export function wholeDaysBetween(start: Date, now: Date) {
  let d = calendarDaysBetween(start, now);
  const tod = (x: Date) => x.getHours() * 3600 + x.getMinutes() * 60 + x.getSeconds();
  if (tod(now) < tod(start)) d -= 1;
  return Math.max(0, d);
}

export type NextAnniversary = {
  /** local midnight of the next anniversary (today if it is the anniversary) */
  date: Date;
  /** whole days from today until it (0 = today) */
  daysToGo: number;
  /** which anniversary that will be (1st, 2nd, …) */
  number: number;
  /** 0..1 – how far through the current anniversary year we are */
  progress: number;
};

/** The next anniversary of `start` on or after `now`, with days to go and progress through the year. */
export function nextAnniversary(start: Date, now: Date): NextAnniversary {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  let n = today.getFullYear() - startDay.getFullYear();
  let candidate = anniversaryOn(startDay, n);
  if (candidate.getTime() < today.getTime()) {
    n += 1;
    candidate = anniversaryOn(startDay, n);
  }
  const previous = anniversaryOn(startDay, n - 1);
  const cycle = Math.max(1, calendarDaysBetween(previous, candidate));
  const daysToGo = calendarDaysBetween(today, candidate);
  return { date: candidate, daysToGo, number: n, progress: Math.min(1, Math.max(0, 1 - daysToGo / cycle)) };
}

function anniversaryOn(startDay: Date, n: number) {
  const year = startDay.getFullYear() + n;
  const day = Math.min(startDay.getDate(), daysInMonth(year, startDay.getMonth()));
  return new Date(year, startDay.getMonth(), day);
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
