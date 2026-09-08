// Spiritual expressions of love, promises, and the anniversary card.
// These are shown in Urdu on every language setting; the `en` text is only a small gloss.
import type { Bi } from "@/lib/language";

const bi = (en: string, ur: string): Bi => ({ en, ur });

/** "God is my witness…" – used after the Nikah dua and on the card's back page. */
export const witnessLine = bi(
  "God is my witness: I asked for you in my life the way a heart, seated on the prayer mat, asks the Master for a miracle.",
  "خدا گواہ ہے، میں نے تمہیں اپنی زندگی کے لیے ایسے مانگا ہے جیسے دل مصلے پر بیٹھ کر مولیٰ سے معجزہ مانگتا ہے۔",
);

/** New screen between the celebration and the Nikah ending. */
export const duaLove = {
  heading: bi("Love, the way a prayer is made", "محبت، دعا کی طرح"),
  sub: bi("A few things I only know how to say in Urdu.", "کچھ باتیں جو میں صرف اردو میں کہہ سکتا ہوں۔"),
  expressions: [
    bi(
      "Your love is a reward from God to me, like the protective shade of the Panjtan Pak's (a.s.) grace in the scorching sun.",
      "تمہاری محبت میرے لیے خدا کا وہ انعام ہے جیسے تپتی دھوپ میں پنجتن پاکؑ کے کرم کا سایہ۔",
    ),
    bi(
      "When I raised my hands to ask for you, my only prayer was that God keeps our companionship as pure as the air of Bain-ul-Haramain.",
      "میں نے تمہیں مانگنے کے لیے ہاتھ اٹھائے تو بس یہی دعا نکلی کہ خدا ہمارا یہ ساتھ بین الحرمین کی فضاؤں کی طرح پاکیزہ رکھے۔",
    ),
    bi(
      "My heart is as much at peace in your love as the soul finds calm after reciting Dua-e-Tawassul.",
      "میرا دل تمہاری محبت میں ایسے ہی پرسکون ہے جیسے دعائے توسل پڑھ کر روح کو قرار ملتا ہے۔",
    ),
    bi(
      "By the grace of Bibi Fatima (s.a.), you are the most beautiful miracle of my life, the one who filled my world with light.",
      "بی بی فاطمہؑ کے صدقے، تم میری زندگی کا وہ خوبصورت ترین معجزہ ہو جس نے میری دنیا کو نور سے بھر دیا ہے۔",
    ),
    bi(
      "Whenever I bow my head in prostration, I only ask the Master for your happiness, your health, and your companionship.",
      "میں جب بھی سجدے میں سر جھکاتا ہوں، مولا سے بس تمہاری خوشی، تمہاری صحت اور تمہارا ساتھ مانگتا ہوں۔",
    ),
    bi(
      "Your modesty and your love are a reward from God that I could not thank Him enough for in a lifetime.",
      "تمہاری حیا اور تمہاری محبت میرے لیے خدا کا وہ انعام ہیں جس کا شکر میں زندگی بھر ادا نہیں کر سکتا۔",
    ),
  ],
  button: bi("Ameen ❤️", "آمین ❤️"),
};

/** Promises, shown after the Nikah dua. Lightly adapted so they read as a promise for the life ahead. */
export const promises = [
  bi(
    "I pray to God that this journey of our love always stays on the footsteps of the pure lives of Moula Ali (a.s.) and Bibi Fatima (s.a.).",
    "خدا سے دعا ہے کہ ہماری محبت کا یہ سفر مولا علیؑ اور بی بی فاطمہؑ کی پاکیزہ زندگی کے نقشِ قدم پر ہمیشہ قائم رہے۔",
  ),
  bi(
    "Making the Panjtan Pak (a.s.) my witness, I promise that at every turn of life, in every joy and every sorrow, I will hold your hand just like this.",
    "میں پنجتن پاکؑ کو گواہ بنا کر یہ وعدہ کرتا ہوں کہ زندگی کے ہر موڑ پر، ہر خوشی اور غم میں، تمہارا ہاتھ ہمیشہ ایسے ہی تھامے رکھوں گا۔",
  ),
  bi(
    "Every year spent with you is the Master's grace upon me. I promise this loyalty and this love will last until my very last breath.",
    "تمہارے ساتھ گزارا ہوا ہر ایک سال میرے لیے مولا کا کرم ہے۔ میں وعدہ کرتا ہوں کہ زندگی کے آخری سانس تک یہ وفا اور محبت قائم رہے گی۔",
  ),
  bi(
    "The covenant we made on this day will live on by the grace of the Panjtan Pak (a.s.). Our anniversary is a witness to our togetherness.",
    "آج کے دن ہم نے جو عہد کیا تھا، پنجتن پاکؑ کے صدقے وہ ہمیشہ زندہ رہے گا۔ ہماری سالگرہ ہمارے لازوال ساتھ کی گواہ ہے۔",
  ),
];

/** The emerald-and-gold anniversary card. */
export const card = {
  names: "Sayedo & MONO",
  frontTitle: bi("Alhamdulillah for 4 Years of Togetherness", "الحمدللہ، ساتھ کے چار سال"),
  openHint: bi("tap to open", "کھولنے کے لیے ٹچ کرو"),
  insideLeftTitle: bi("Shayari", "شاعری"),
  insideRightTitle: bi("For you", "تمہارے لیے"),
  /** Main message inside the card (Roman Urdu as you wrote it, plus Urdu and English). */
  message: {
    roman:
      "Meri shareek-e-hayat, tumhein hamari 4th saalgirah mubarak ho! Khuda se dua hai ke hamari muhabbat ki buniyaad Moula Ali (a.s.) aur Bibi Fatima (s.a.) ki pakeeza muhabbat ki tarah hamesha lafani rahe. Tumhare sath guzre hue ye 4 saal mere liye Moula ka khaas karam hain. Main Panjtan Pak (a.s.) ko gawah bana kar waada karta hoon ke zindagi ke har morr par tumhara hath hamesha aise hi thaame rakhon ga. Alhamdulillah, hamare 4 khoobsoorat saal mukammal ho gaye. Tum sirf meri mohabbat nahi, meri duniya aur meri jannat ka raasta ho. 4th Anniversary Mubarak, meri jaan!",
    ur: "میری شریکِ حیات، تمہیں ہماری چوتھی سالگرہ مبارک ہو! خدا سے دعا ہے کہ ہماری محبت کی بنیاد مولا علیؑ اور بی بی فاطمہؑ کی پاکیزہ محبت کی طرح ہمیشہ لافانی رہے۔ تمہارے ساتھ گزرے ہوئے یہ چار سال میرے لیے مولا کا خاص کرم ہیں۔ میں پنجتن پاکؑ کو گواہ بنا کر وعدہ کرتا ہوں کہ زندگی کے ہر موڑ پر تمہارا ہاتھ ہمیشہ ایسے ہی تھامے رکھوں گا۔ الحمدللہ، ہمارے چار خوبصورت سال مکمل ہو گئے۔ تم صرف میری محبت نہیں، میری دنیا اور میری جنت کا راستہ ہو۔ چوتھی سالگرہ مبارک، میری جان!",
    en: "My life partner, happy 4th anniversary to us! I pray to God that the foundation of our love stays eternal like the pure love of Moula Ali (a.s.) and Bibi Fatima (s.a.). These four years with you are the Master's special grace upon me. Making the Panjtan Pak (a.s.) my witness, I promise that at every turn of life I will hold your hand just like this. Alhamdulillah, four beautiful years are complete. You are not just my love; you are my world and my path to paradise. Happy 4th anniversary, meri jaan!",
  },
  extra: bi(
    "Whenever I bow my head in prostration, I ask the Master for your happiness, your health, and for this four-year-old bond of ours to stay safe forever.",
    "میں جب بھی سجدے میں سر جھکاتا ہوں، مولا سے بس تمہاری خوشی، صحت اور ہمارے اس چار سال پرانے رشتے کی ہمیشہ کی سلامتی مانگتا ہوں۔",
  ),
  backCalligraphy: "یا علیؑ ادرکنی",
  backSub: bi("Ya Ali (a.s.) Adrikni", "یا علی مدد"),
  next: bi("One last thing ❤️", "ایک آخری بات ❤️"),
};
