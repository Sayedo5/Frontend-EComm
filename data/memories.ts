import type { Bi } from "@/lib/language";

const bi = (en: string, ur: string): Bi => ({ en, ur });

export type Memory = { year: string; title: Bi; caption: Bi; symbol: string; tone: string };

// Animated memory moments: intentionally no photos or placeholder images.
export const memories: Memory[] = [
  { year: "2022", title: bi("The beginning ❤️", "وہ خوبصورت آغاز ❤️"), caption: bi("The day two hearts quietly found each other.", "وہ دن جب دو دلوں نے خاموشی سے ایک دوسرے کو پا لیا۔"), symbol: "✦", tone: "from-rose/30 via-crimson/40 to-maroon-deep" },
  { year: "2023", title: bi("Getting closer", "محبت اور گہری ہوتی گئی"), caption: bi("Every conversation made my world feel more like home.", "ہر گفتگو نے میری دنیا کو تمہارے ساتھ گھر جیسا بنا دیا۔"), symbol: "♡", tone: "from-blush/30 via-rose/30 to-crimson/40" },
  { year: "2024", title: bi("More laughter", "ہنسی کے اور بھی لمحے"), caption: bi("With you, even ordinary days learned how to sparkle.", "تمہارے ساتھ عام دنوں نے بھی جگمگانا سیکھ لیا۔"), symbol: "❀", tone: "from-gold/30 via-rose/30 to-maroon-mid" },
  { year: "2025", title: bi("More reasons to love you", "تم سے محبت کی اور بھی وجوہات"), caption: bi("Your kindness became one of the safest places in my life.", "تمہاری محبت اور مہربانی میری زندگی کی محفوظ ترین پناہ بن گئی۔"), symbol: "∞", tone: "from-crimson/40 via-rose/30 to-night" },
  { year: "2026", title: bi("Four years… and still you", "چار سال… اور آج بھی تم"), caption: bi("The 5th year has begun; my prayer is that it leads us to Nikah.", "پانچواں سال شروع ہو گیا ہے؛ میری دعا ہے کہ یہ ہمیں نکاح تک لے جائے۔"), symbol: "♥", tone: "from-gold/40 via-rose/40 to-crimson/50" },
];
