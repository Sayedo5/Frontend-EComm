// Every line of copy on the site, in both languages. Components only read from here.
// `en` is what English-only mode shows, `ur` is what Urdu-only mode shows; bilingual mode
// shows each screen in the language it was written in.
import type { Bi } from "@/lib/language";

const bi = (en: string, ur: string): Bi => ({ en, ur });

export const ui = {
  langToggle: { ur: "Urdu", bi: "Both", en: "English" },
  soundHint: bi("sound on, please 🎧", "آواز آن کر لو، پلیز 🎧"),
  swipe: bi("← swipe →", "← سوائپ کرو →"),
};

export const hero = {
  lines: [
    bi("09 September 2022", "09 ستمبر 2022"),
    bi("Four years ago...", "چار سال پہلے..."),
    bi("Something beautiful began.", "کچھ خوبصورت شروع ہوا۔"),
    bi("09 September 2026", "09 ستمبر 2026"),
    bi("Happy 4th Anniversary, My Love ❤️", "چوتھی سالگرہ مبارک ہو، میری جان ❤️"),
  ],
  subtitle: bi(
    "Four years of memories, laughter, little fights, countless smiles, and a love that still makes my heart choose you.",
    "چار سال کی یادیں، ہنسی، چھوٹے چھوٹے جھگڑے، بے شمار مسکراہٹیں، اور ایک محبت جو آج بھی میرے دل سے تمہیں چنواتی ہے۔",
  ),
  button: bi("Come with me ❤️", "میرے ساتھ چلو ❤️"),
};

export const counter = {
  title: bi("4 Years.", "چار سال۔"),
  lead: bi(
    "Four years sounds like a number... but to me, it's thousands of little moments.",
    "چار سال سننے میں بس ایک نمبر لگتا ہے... لیکن میرے لیے یہ ہزاروں چھوٹے چھوٹے لمحے ہیں۔",
  ),
  labels: {
    years: bi("Years", "سال"),
    months: bi("Months", "مہینے"),
    days: bi("Days", "دن"),
    hours: bi("Hours", "گھنٹے"),
    minutes: bi("Minutes", "منٹ"),
    seconds: bi("Seconds", "سیکنڈ"),
    // (these three are running totals, like the months and days above)
  },
  liveLead: bi("Exactly, to this very second", "بالکل ٹھیک، اسی سیکنڈ تک"),
  liveNote: bi("still counting… every single second with you", "ابھی بھی گن رہا ہوں… تمہارے ساتھ کا ہر ایک سیکنڈ"),
  closing: bi("And somehow... I still get butterflies because of you.", "اور نہ جانے کیسے... آج بھی تمہاری وجہ سے دل میں تتلیاں اڑتی ہیں۔"),
  button: bi("Keep going →", "آگے چلو ❤️"),
};

export const letter = {
  heading: bi("A Letter From My Heart ❤️", "میرے دل کی طرف سے ایک خط ❤️"),
  paragraphs: [
    bi("My love,", "میری جان،"),
    bi(
      "Today isn't just another date on the calendar. It's the day I get to look back at four beautiful years and realize how much of my heart has quietly become yours.",
      "آج کا دن کیلنڈر کی بس ایک اور تاریخ نہیں ہے۔ یہ وہ دن ہے جب میں چار خوبصورت سالوں کو پیچھے مڑ کر دیکھتا ہوں اور محسوس کرتا ہوں کہ میرا دل کتنی خاموشی سے تمہارا ہو گیا ہے۔",
    ),
    bi(
      "Four years ago, I didn't know exactly where this journey would take us. I only knew that there was something about you that felt different.",
      "چار سال پہلے مجھے ٹھیک سے معلوم نہیں تھا کہ یہ سفر ہمیں کہاں لے جائے گا۔ بس اتنا پتا تھا کہ تم میں کچھ ایسا ہے جو سب سے مختلف محسوس ہوتا ہے۔",
    ),
    bi(
      "And today, after all these years, I still find myself smiling at the smallest things about you. Your smile. Your voice. Your little habits. Your cute way of getting angry. Your softness. Your kindness. Your innocence. Even the little things you probably don't realize I notice.",
      "اور آج، ان سب سالوں کے بعد بھی، میں تمہاری چھوٹی چھوٹی باتوں پر مسکراتا رہتا ہوں۔ تمہاری مسکراہٹ۔ تمہاری آواز۔ تمہاری چھوٹی چھوٹی عادتیں۔ تمہارا پیارا سا غصہ۔ تمہاری نرمی۔ تمہاری مہربانی۔ تمہاری معصومیت۔ اور وہ باتیں بھی جن پر شاید تمہیں پتا ہی نہیں کہ میں غور کرتا ہوں۔",
    ),
    bi(
      "I don't love you only because of the beautiful moments. I love you through the difficult moments too. I love the real you — the girl who can make me smile without even trying, whose one message can change my entire mood, who somehow became my favorite notification, my favorite conversation, and one of the most precious parts of my life.",
      "میں تم سے صرف خوبصورت لمحوں کی وجہ سے محبت نہیں کرتا۔ مشکل لمحوں میں بھی کرتا ہوں۔ میں اصلی تم سے محبت کرتا ہوں — وہ لڑکی جو بغیر کوشش کیے مجھے مسکرا دیتی ہے، جس کا ایک پیغام میرا پورا موڈ بدل دیتا ہے، جو نہ جانے کب میری پسندیدہ نوٹیفکیشن، میری پسندیدہ گفتگو، اور میری زندگی کا سب سے قیمتی حصہ بن گئی۔",
    ),
    bi(
      "Four years later, I don't want to simply say that I loved you. I want to say that I still choose you. And if life gave me the chance to go back and start again... I would still choose you.",
      "چار سال بعد میں صرف یہ نہیں کہنا چاہتا کہ میں نے تم سے محبت کی تھی۔ میں یہ کہنا چاہتا ہوں کہ میں آج بھی تمہیں چنتا ہوں۔ اور اگر زندگی مجھے واپس جا کر دوبارہ شروع کرنے کا موقع دے... تو میں پھر تمہیں ہی چنوں گا۔",
    ),
    bi("Happy 4th Anniversary, meri jaan. ❤️", "چوتھی سالگرہ مبارک ہو، میری جان۔ ❤️"),
  ],
  keepReading: bi("Keep reading ↓", "آگے پڑھو ↓"),
  button: bi("There's more ❤️", "ابھی اور بھی ہے ❤️"),
};

export const youAre = {
  heading: bi("You are...", "تم ہو..."),
  button: bi("And then there's us →", "اور پھر ہم دونوں ❤️"),
};

export const timeline = {
  heading: bi("Four years, one line", "چار سال، ایک لکیر"),
  sub: bi("Every year, one more reason.", "ہر سال، ایک اور وجہ۔"),
  gallery: bi("A few little symbols from our story", "ہماری کہانی کے چند خوبصورت نشان"),
  button: bi("Okay. One question. ❤️", "اچھا۔ ایک سوال۔ ❤️"),
};

export const loveQuestion = {
  lines: [
    bi("Okay...", "اچھا..."),
    bi("Enough about how much I love you.", "بس، میری محبت کی باتیں بہت ہو گئیں۔"),
    bi("I want to ask YOU something.", "اب میں تم سے کچھ پوچھنا چاہتا ہوں۔"),
  ],
  question: bi("Do you love me?", "کیا تم مجھ سے محبت کرتی ہو؟"),
  yes: bi("YES ❤️", "ہاں ❤️"),
  no: bi("NO 🥺", "نہیں 🥺"),
};

export const yesPath = {
  lines: [
    bi("I knew there was a reason my heart felt so safe with you. ❤️", "مجھے پتا تھا، میرا دل تمہارے ساتھ یونہی محفوظ محسوس نہیں کرتا۔ ❤️"),
    bi("Thank you for loving me.", "مجھ سے محبت کرنے کا شکریہ۔"),
    bi("But honestly... do you know what your YES means to me?", "لیکن سچ بتاؤں... تمہیں پتا ہے تمہاری 'ہاں' میرے لیے کیا معنی رکھتی ہے؟"),
    bi("It means that somewhere in this huge world... there is one heart that chose mine.", "اس کا مطلب ہے کہ اس اتنی بڑی دنیا میں... ایک دل ہے جس نے میرا دل چنا۔"),
    bi("Your YES just made this entire website worth creating.", "تمہاری 'ہاں' نے یہ پوری ویب سائٹ بنانا کامیاب کر دیا۔"),
  ],
  tellMore: bi("Tell Me More ❤️", "اور بتاؤ ❤️"),
  more: bi(
    "You know what? I don't just want your love in beautiful moments. I want to be there in the ordinary ones too. I want your random messages. Your sleepy good mornings. Your silly complaints. Your laughter. Your anger. Your happiness. Your bad days. Your good days. I want all of it. Because I don't want only a beautiful chapter with you. I want the whole story.",
    "پتا ہے؟ میں تمہاری محبت صرف خوبصورت لمحوں میں نہیں چاہتا۔ میں عام لمحوں میں بھی تمہارے ساتھ ہونا چاہتا ہوں۔ تمہارے بے وجہ پیغام۔ تمہاری نیند بھری گڈ مارننگ۔ تمہاری چھوٹی چھوٹی شکایتیں۔ تمہاری ہنسی۔ تمہارا غصہ۔ تمہاری خوشی۔ تمہارے برے دن۔ تمہارے اچھے دن۔ میں یہ سب چاہتا ہوں۔ کیونکہ میں تمہارے ساتھ صرف ایک خوبصورت باب نہیں چاہتا۔ میں پوری کہانی چاہتا ہوں۔",
  ),
  keepGoing: bi("Keep Going →", "آگے چلو ❤️"),
};

export const noPath = {
  lines: [
    bi("Okay...", "اچھا..."),
    bi("That answer hurt a little. 🥺", "یہ جواب تھوڑا سا چبھا۔ 🥺"),
    bi("But you know me... I can't just give up on telling you how I feel.", "لیکن تم مجھے جانتی ہو... میں اپنے دل کی بات کہنا یونہی نہیں چھوڑ سکتا۔"),
    bi(
      "I'm not asking you to answer because you feel pressured. I'm asking you to listen to my heart one more time.",
      "میں تم سے دباؤ میں آ کر جواب نہیں مانگ رہا۔ میں بس یہ کہہ رہا ہوں کہ ایک بار پھر میرے دل کی بات سن لو۔",
    ),
  ],
  paragraphs: [
    bi(
      "I don't know what your heart is saying right now. Maybe you're confused. Maybe you're scared. Maybe you need time. Maybe you simply don't feel what I feel yet. And that's okay.",
      "مجھے نہیں پتا اس وقت تمہارا دل کیا کہہ رہا ہے۔ شاید تم الجھی ہوئی ہو۔ شاید ڈری ہوئی ہو۔ شاید تمہیں وقت چاہیے۔ شاید تم ابھی وہ محسوس نہیں کرتیں جو میں کرتا ہوں۔ اور یہ بھی ٹھیک ہے۔",
    ),
    bi(
      "But if there is even the smallest corner of your heart where you wonder what you mean to me... let me tell you. You are not someone I loved for a moment. You became someone I learned to care about deeply. Someone whose happiness matters to me. Someone whose sadness bothers me. Someone whose smile can make an ordinary day feel special.",
      "لیکن اگر تمہارے دل کے کسی چھوٹے سے کونے میں بھی یہ سوال ہے کہ تم میرے لیے کیا ہو... تو سنو۔ تم وہ نہیں ہو جس سے میں نے کسی ایک لمحے کے لیے محبت کی۔ تم وہ ہو جس کی فکر کرنا میں نے دل سے سیکھا۔ جس کی خوشی مجھے اہم لگتی ہے۔ جس کی اداسی مجھے بے چین کرتی ہے۔ جس کی مسکراہٹ ایک عام سے دن کو خاص بنا دیتی ہے۔",
    ),
    bi(
      "Four years have taught me something: real love isn't just saying \"I love you.\" It's choosing someone again and again. It's patience. It's understanding. It's forgiveness. It's staying gentle even when things aren't perfect. And if you ever choose me... I promise I won't take that choice lightly.",
      "چار سالوں نے مجھے ایک بات سکھائی ہے: سچی محبت صرف 'میں تم سے محبت کرتا ہوں' کہنا نہیں ہے۔ یہ کسی کو بار بار چننا ہے۔ یہ صبر ہے۔ یہ سمجھنا ہے۔ یہ معاف کرنا ہے۔ یہ تب بھی نرم رہنا ہے جب سب کچھ ٹھیک نہ ہو۔ اور اگر تم نے کبھی مجھے چنا... تو وعدہ ہے، میں اس فیصلے کو کبھی ہلکا نہیں لوں گا۔",
    ),
  ],
  closing: bi("So I won't ask you to say YES right now. Just answer one more thing.", "تو میں ابھی تم سے 'ہاں' نہیں مانگوں گا۔ بس ایک اور بات کا جواب دے دو۔"),
  button: bi("Give My Heart One More Chance ❤️", "میرے دل کو ایک اور موقع دو ❤️"),
};

export const deeperLove: { question: Bi; options: { label: Bi; reply: Bi }[] }[] = [
  {
    question: bi("Can I stay in your life?", "کیا میں تمہاری زندگی میں رہ سکتا ہوں؟"),
    options: [
      { label: bi("Yes ❤️", "ہاں ❤️"), reply: bi("Then I'm not going anywhere. Not on the good days, not on the hard ones.", "تو پھر میں کہیں نہیں جا رہا۔ نہ اچھے دنوں میں، نہ مشکل دنوں میں۔") },
      { label: bi("I want you here 🥹", "میں تمہیں یہیں چاہتی ہوں 🥹"), reply: bi("That's all I needed to hear. I'm here. I'm staying.", "بس یہی سننا تھا۔ میں یہیں ہوں۔ میں رہوں گا۔") },
    ],
  },
  {
    question: bi("Can I keep making you smile?", "کیا میں تمہیں ہنساتا رہ سکتا ہوں؟"),
    options: [
      { label: bi("Always ❤️", "ہمیشہ ❤️"), reply: bi("Deal. Even on the days you pretend you're mad at me. 😌", "ڈن۔ ان دنوں میں بھی جب تم مجھ سے ناراض ہونے کا ناٹک کرتی ہو۔ 😌") },
      { label: bi("Try your best 😌", "کوشش کر لو 😌"), reply: bi("Challenge accepted. I've had four years of practice, you know.", "چیلنج قبول ہے۔ چار سال کی پریکٹس ہے میری، پتا ہے نا۔") },
    ],
  },
  {
    question: bi("If I promise to keep choosing you... will you keep choosing me?", "اگر میں وعدہ کروں کہ تمہیں چنتا رہوں گا... تو کیا تم مجھے چنتی رہو گی؟"),
    options: [
      { label: bi("I will ❤️", "چنوں گی ❤️"), reply: bi("Then that's it. That's the whole plan. You and me, on purpose, every single day.", "تو بس یہی ہے۔ یہی پورا منصوبہ ہے۔ تم اور میں، جان بوجھ کر، ہر ایک دن۔") },
      { label: bi("Forever 🥹", "ہمیشہ 🥹"), reply: bi("Forever is a big word. I'm glad you said it first. 🥹", "ہمیشہ بہت بڑا لفظ ہے۔ اچھا لگا کہ تم نے پہلے کہا۔ 🥹") },
    ],
  },
];

export const deepestLove = {
  lines: [
    bi("I don't want a perfect love.", "مجھے کوئی پرفیکٹ محبت نہیں چاہیے۔"),
    bi("I want a real one.", "مجھے سچی محبت چاہیے۔"),
    bi("A love where we laugh.", "ایک محبت جس میں ہم ہنسیں۔"),
    bi("A love where we disagree.", "ایک محبت جس میں ہم اختلاف بھی کریں۔"),
    bi("A love where we forgive.", "ایک محبت جس میں ہم معاف کریں۔"),
    bi("A love where we grow.", "ایک محبت جس میں ہم بڑھیں۔"),
    bi("A love where we become better for each other.", "ایک محبت جس میں ہم ایک دوسرے کے لیے بہتر بنیں۔"),
    bi("A love where, after every difficult day...", "ایک محبت جس میں، ہر مشکل دن کے بعد..."),
    bi("...we still find our way back to each other.", "...ہم پھر بھی ایک دوسرے تک لوٹ آئیں۔"),
    bi("That's the kind of love I want with you.", "یہی وہ محبت ہے جو میں تمہارے ساتھ چاہتا ہوں۔"),
    bi("Not just for another year.", "صرف ایک اور سال کے لیے نہیں۔"),
    bi("Not just for another four years.", "صرف اگلے چار سال کے لیے نہیں۔"),
  ],
  finale: bi("Forever.", "ہمیشہ کے لیے۔"),
};

export const urduSection = {
  button: bi("Keep reading ❤️", "آگے پڑھو ❤️"),
  poetryButton: bi("One last thing… ❤️", "ایک آخری بات… ❤️"),
};

export const proposal = {
  lines: [
    bi("There's one thing I've been wanting to ask you...", "ایک بات ہے جو میں تم سے کب سے پوچھنا چاہتا ہوں..."),
    bi("Something much bigger than an anniversary.", "سالگرہ سے کہیں بڑی بات۔"),
    bi("I don't just want another year with you.", "میں تمہارے ساتھ صرف ایک اور سال نہیں چاہتا۔"),
    bi("I don't just want four more years.", "میں صرف چار اور سال نہیں چاہتا۔"),
    bi("I want a lifetime.", "میں پوری زندگی چاہتا ہوں۔"),
  ],
  question: bi("Will you make me the luckiest man and say yes to our Nikah?", "کیا تم مجھے دنیا کا سب سے خوش نصیب انسان بنا کر میرے ساتھ نکاح کے لیے ہاں کہو گی؟"),
  sub: bi(
    "I do not want only a beautiful promise; I want a halal life with you, built with love, respect, and Allah's blessing.",
    "میں صرف ایک خوبصورت وعدہ نہیں چاہتا؛ میں تمہارے ساتھ محبت، عزت اور اللہ کی برکت سے ایک حلال زندگی بنانا چاہتا ہوں۔",
  ),
  yes: bi("YES ❤️", "ہاں ❤️"),
  think: bi("LET ME THINK 🥺", "مجھے سوچنے دو 🥺"),
  thinkLines: [
    bi("Take your time.", "اپنا وقت لو۔"),
    bi("I don't want your answer because of a website. I want it because your heart says it.", "میں تمہارا جواب کسی ویب سائٹ کی وجہ سے نہیں چاہتا۔ میں چاہتا ہوں کہ تمہارا دل کہے۔"),
    bi("But whenever you're ready... my heart will still be here. ❤️", "لیکن جب بھی تم تیار ہو... میرا دل یہیں ہوگا۔ ❤️"),
  ],
  ready: bi("I am ready to say yes ❤️", "میں ہاں کہنے کے لیے تیار ہوں ❤️"),
};

export const qabool = {
  one: {
    lines: [bi("Then...", "تو پھر..."), bi("One word.", "بس ایک لفظ۔"), bi("Qabool Hai.", "قبول ہے۔")],
    ask: bi("Qabool hai?", "قبول ہے؟"),
    button: bi("Qabool Hai ❤️", "قبول ہے ❤️"),
    after: [bi("Once... ❤️", "ایک بار... ❤️")],
  },
  two: {
    lines: [bi("Again...", "پھر سے...")],
    ask: bi("Qabool hai?", "قبول ہے؟"),
    button: bi("Qabool Hai 🥹", "قبول ہے 🥹"),
    after: [bi("Two hearts...", "دو دل..."), bi("One promise...", "ایک وعدہ...")],
  },
  three: {
    lines: [bi("And one last time...", "اور آخری بار...")],
    ask: bi("Qabool hai?", "قبول ہے؟"),
    button: bi("Qabool Hai ❤️", "قبول ہے ❤️"),
    after: [bi("Qabool hai. ❤️", "قبول ہے۔ ❤️"), bi("With all my heart.", "دل سے۔"), bi("Forever.", "ہمیشہ کے لیے۔")],
  },
  continueButton: "❤️",
};

export const celebration = {
  lines: [bi("She said Qabool Hai. ❤️", "اس نے کہا قبول ہے۔ ❤️"), bi("From two hearts...", "دو دلوں سے..."), bi("...to one beautiful promise.", "...ایک خوبصورت وعدے تک۔")],
  button: bi("One more thing ❤️", "ایک اور بات ❤️"),
};

export const nikah = {
  urdu1: bi("May Allah bring our Nikah close ❤️", "اللہ ہمارے نکاح کا وقت جلد لائے ❤️"),
  urdu2: bi("and keep our love sincere and protected.", "اور ہماری محبت کو خلوص اور حفاظت عطا فرمائے۔"),
  dua: bi(
    "May Allah keep our hearts together, fill our lives with peace, protect our love, and keep us beside each other through every chapter of life.",
    "اللہ ہمارے دلوں کو جوڑے رکھے، ہماری زندگیوں کو سکون سے بھر دے، ہماری محبت کی حفاظت کرے، اور زندگی کے ہر موڑ پر ہمیں ایک دوسرے کے ساتھ رکھے۔",
  ),
  ameen: bi("Ameen ❤️", "آمین ❤️"),
  english: bi("Our 5th year has begun, my love.", "میری جان، ہماری محبت کا پانچواں سال شروع ہو گیا ہے۔"),
  urdu3: bi("Four beautiful years are complete…", "محبت کے چار خوبصورت سال مکمل ہو گئے…"),
  urdu4: bi("and I pray that before our 5th love anniversary, we are together in Nikah. ❤️", "اور میری دعا ہے کہ ہماری پانچویں محبت کی سالگرہ سے پہلے ہم نکاح کے بندھن میں بندھے ہوں۔ ❤️"),
  button: "❤️",
};

export const finalMessage = {
  lines: [bi("Four beautiful years behind us...", "محبت کے چار خوبصورت سال ہمارے پیچھے ہیں…"), bi("The 5th year of our love has begun.", "ہماری محبت کا پانچواں سال شروع ہو گیا ہے۔")],
  urdu: [
    bi("I love you.", "میں تم سے محبت کرتا ہوں۔"),
    bi("I am in love with you.", "تم سے عشق ہے۔"),
    bi("You are my prayer.", "تم میری دعا ہو۔"),
    bi("You are my happiness.", "تم میری خوشی ہو۔"),
    bi("Before our 5th love anniversary, I pray we stand together in Nikah.", "میری دعا ہے کہ ہماری پانچویں محبت کی سالگرہ سے پہلے ہم نکاح کے بندھن میں بندھے ہوں۔"),
    bi("I choose you today, tomorrow, and in every prayer after this.", "میں آج، کل، اور اس کے بعد ہر دعا میں تمہیں ہی چنتا ہوں۔"),
  ],
  finale: bi("Forever yours. ❤️", "ہمیشہ تمہارا۔ ❤️"),
  replay: bi("Read it again from the start", "شروع سے دوبارہ پڑھو"),
};

export const music = {
  play: bi("Play our song 🎵", "ہمارا گانا چلاؤ 🎵"),
  pause: bi("Pause our song", "گانا روکو"),
  intro: bi("Open My Heart 💌", "میرا دل کھولو 💌"),
};
