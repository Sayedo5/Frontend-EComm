// The "You are..." words. Order matters – they appear one after another.
import type { Bi } from "@/lib/language";

const bi = (en: string, ur: string): Bi => ({ en, ur });

export const youAreWords: { word: Bi; emoji?: string }[] = [
  { word: bi("Sweet", "پیاری"), emoji: "❤️" },
  { word: bi("Humble", "سادہ دل"), emoji: "🤍" },
  { word: bi("Beautiful", "خوبصورت"), emoji: "🌹" },
  { word: bi("Cute", "کیوٹ"), emoji: "🥹" },
  { word: bi("Precious", "انمول"), emoji: "💕" },
  { word: bi("Adorable", "پیاری سی"), emoji: "🫶" },
  { word: bi("My Happiness", "میری خوشی") },
  { word: bi("My Peace", "میرا سکون") },
  { word: bi("My Favorite Person", "میری سب سے پسندیدہ شخصیت") },
  { word: bi("My Love", "میری محبت") },
];

export const youAreClosing = {
  question: bi("How are you this cute?", "تم اتنی کیوٹ کیسے ہو؟"),
  answer: bi("I genuinely don't know. But I'm definitely not complaining. 🥹❤️", "مجھے سچ میں نہیں پتا۔ لیکن مجھے کوئی شکایت بھی نہیں ہے۔ 🥹❤️"),
};
