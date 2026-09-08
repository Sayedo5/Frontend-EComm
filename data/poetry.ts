// Original Urdu poetry with English renderings. Each entry is one card; lines are shown on separate rows.
import type { Bi } from "@/lib/language";

const bi = (en: string, ur: string): Bi => ({ en, ur });

export const poems: { lines: Bi[] }[] = [
  {
    lines: [
      bi("When you're with me, even silence feels beautiful,", "تم ساتھ ہو تو خاموشی بھی خوبصورت لگتی ہے،"),
      bi("when you smile, the world looks a little lovelier.", "تم مسکرا دو تو دنیا تھوڑی اور حسین لگتی ہے۔"),
      bi("When you're near, my heart wants nothing else,", "تم قریب ہو تو دل کو کسی اور چیز کی طلب نہیں،"),
      bi("just you, and this heart of mine. ❤️", "بس تم ہو، اور میرا دل ہے۔ ❤️"),
    ],
  },
  {
    lines: [
      bi("It's been four years, but my heart's wish is still the same:", "چار سال کا سفر ہے، مگر دل کی خواہش آج بھی وہی ہے،"),
      bi("stay with me, and let every coming year be lovelier than the last.", "تم ساتھ رہو، تو ہر آنے والا سال پہلے سے زیادہ خوبصورت ہو۔"),
    ],
  },
  {
    lines: [bi("You are the prayer I ask for, and my heart finds peace.", "تم میری وہ دعا ہو جسے مانگ کر دل کو سکون ملتا ہے۔")],
  },
];

export const urduLove = {
  heading: bi("A few things from my heart ❤️", "میرے دل کی کچھ باتیں ❤️"),
  paragraphs: [
    bi(
      "You are not just my love; you are the peace in my heart that I want to feel every single day.",
      "تم صرف میری محبت نہیں ہو، تم میرے دل کا وہ سکون ہو جسے میں ہر دن محسوس کرنا چاہتا ہوں۔",
    ),
    bi("Your smile isn't just a smile to me. It is the most beautiful reason for my day.", "تمہاری مسکراہٹ میرے لیے صرف ایک مسکراہٹ نہیں، یہ میرے دن کی سب سے خوبصورت وجہ ہے۔"),
    bi(
      "Four years have passed, and my heart still lights up at the sight of you the way it did the very first time.",
      "چار سال گزر گئے، لیکن آج بھی دل تمہیں دیکھ کر اسی طرح خوش ہوتا ہے جیسے پہلی بار ہوا تھا۔",
    ),
    bi("You are the beautiful reality of my life that I never want to mistake for a dream.", "تم میری زندگی کی وہ خوبصورت حقیقت ہو جسے میں کبھی خواب نہیں سمجھنا چاہتا۔"),
  ],
  romanUrdu:
    "Tum sirf meri mohabbat nahi ho, tum mere dil ka woh sukoon ho jise main har din mehsoos karna chahta hoon.",
};
