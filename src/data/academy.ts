import type { Bi } from "@/lib/utils";

export const academyName: Bi = {
  ar: "أكاديمية صالحي للكيوكوشنكاي",
  en: "Salihy Kyokushin Academy",
};

export const tagline: Bi = {
  ar: "من ساحة النزال إلى صناعة أبطال الغد.",
  en: "From the Fight to the Future of Champions.",
};

export const shortDescription: Bi = {
  ar: "مدرسة كيوكوشنكاي كاراتيه في قلب بغداد، تجمع بين الانضباط الرياضي والقتالي الأصيل وبين بيئة تدريب حديثة لجميع الأعمار.",
  en: "A Kyokushin karate school in the heart of Baghdad, blending authentic combat discipline with a modern training environment for all ages.",
};

export type AcademyPillar = {
  title: Bi;
  description: Bi;
};

export const pillars: AcademyPillar[] = [
  {
    title: { ar: "التدريب", en: "Training" },
    description: {
      ar: "برامج منهجية مبنية على أساسيات الكيوكوشنكاي الحقيقية، من الأساس إلى القتال التنافسي.",
      en: "Structured programs built on authentic Kyokushin fundamentals, from the basics to competitive fighting.",
    },
  },
  {
    title: { ar: "اللياقة", en: "Fitness" },
    description: {
      ar: "بناء جسدي متكامل يخدم القوة والسرعة والتحمل، بما ينعكس داخل وخارج الحلبة.",
      en: "Complete physical conditioning for strength, speed and endurance — on the mat and off it.",
    },
  },
  {
    title: { ar: "الانضباط", en: "Discipline" },
    description: {
      ar: "قيم الاحترام والالتزام والصبر التي تصنع الشخصية قبل أن تصنع البطل.",
      en: "The values of respect, commitment and patience that build character before they build a champion.",
    },
  },
  {
    title: { ar: "الثقة والدفاع عن النفس", en: "Confidence & Self-Defense" },
    description: {
      ar: "أدوات عملية للدفاع عن النفس، وثقة حقيقية تُبنى بالتكرار والتقدم الملموس.",
      en: "Practical self-defense tools and real confidence, built through repetition and visible progress.",
    },
  },
  {
    title: { ar: "الإعداد للبطولات", en: "Competition Readiness" },
    description: {
      ar: "مسار واضح من أول حصة تدريبية إلى منصات التتويج المحلية والدولية.",
      en: "A clear path from a student's very first class to local and international podiums.",
    },
  },
];

export const audiences: Bi[] = [
  { ar: "الأطفال", en: "Kids" },
  { ar: "الناشئون والشباب", en: "Youth" },
  { ar: "الرجال", en: "Men" },
  { ar: "النساء", en: "Women" },
];

export const locationNote: Bi = {
  ar: "بغداد – الصليخ – شارع الـ600 – مقابل الكوخ",
  en: "Baghdad – Al-Sulaikh – 600 Street – Opposite Al-Koukh",
};
