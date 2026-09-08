// One node per year. Replace the [placeholders] with your real captions,
// and drop photos into /public/images (photo1.jpg … photo5.jpg).
import type { Bi } from "@/lib/language";

const bi = (en: string, ur: string): Bi => ({ en, ur });

export type Memory = {
  year: string;
  title: Bi;
  caption: Bi;
  photo: string;
  alt: string;
};

export const memories: Memory[] = [
  {
    year: "2022",
    title: bi("The beginning ❤️", "شروعات ❤️"),
    caption: bi("[Our first memory]", "[ہماری پہلی یاد]"),
    photo: "/images/photo1.jpg",
    alt: "Us, in 2022 – where it all began",
  },
  {
    year: "2023",
    title: bi("Getting closer", "قریب آتے ہوئے"),
    caption: bi("[Our favorite place]", "[ہماری پسندیدہ جگہ]"),
    photo: "/images/photo2.jpg",
    alt: "Us, in 2023 – at our favorite place",
  },
  {
    year: "2024",
    title: bi("More memories", "اور یادیں"),
    caption: bi("[Our funniest moment]", "[ہمارا سب سے مزے دار لمحہ]"),
    photo: "/images/photo3.jpg",
    alt: "Us, in 2024 – laughing about something silly",
  },
  {
    year: "2025",
    title: bi("More reasons to love you", "تم سے محبت کی اور وجوہات"),
    caption: bi("[Our most emotional moment]", "[ہمارا سب سے جذباتی لمحہ]"),
    photo: "/images/photo4.jpg",
    alt: "Us, in 2025 – a moment that meant a lot",
  },
  {
    year: "2026",
    title: bi("Four years... and still you.", "چار سال... اور آج بھی تم۔"),
    caption: bi("[Our favorite conversation]", "[ہماری پسندیدہ گفتگو]"),
    photo: "/images/photo5.jpg",
    alt: "Us, in 2026 – four years in",
  },
];
