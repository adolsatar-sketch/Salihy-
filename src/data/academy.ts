import type { Bi } from "@/lib/utils";

export const academyName: Bi = {
  ar: "أكاديمية صالحي للكيوكوشنكاي",
  en: "Salihy Kyokushin Academy",
  tr: "Salihy Kyokushin Akademisi",
};

export const tagline: Bi = {
  ar: "من ساحة النزال إلى صناعة أبطال الغد.",
  en: "From the Fight to the Future of Champions.",
  tr: "Ringden geleceğin şampiyonlarını yetiştirmeye.",
};

export const shortDescription: Bi = {
  ar: "مدرسة كيوكوشنكاي كاراتيه في قلب بغداد، تجمع بين الانضباط الرياضي والقتالي الأصيل وبين بيئة تدريب حديثة لجميع الأعمار.",
  en: "A Kyokushin karate school in the heart of Baghdad, blending authentic combat discipline with a modern training environment for all ages.",
  tr: "Bağdat'ın kalbinde yer alan bir Kyokushin karate okulu; özgün mücadele disiplinini her yaşa uygun modern bir antrenman ortamıyla birleştiriyor.",
};

export type AcademyPillar = {
  title: Bi;
  description: Bi;
};

export const pillars: AcademyPillar[] = [
  {
    title: { ar: "التدريب", en: "Training", tr: "Antrenman" },
    description: {
      ar: "برامج منهجية مبنية على أساسيات الكيوكوشنكاي الحقيقية، من الأساس إلى القتال التنافسي.",
      en: "Structured programs built on authentic Kyokushin fundamentals, from the basics to competitive fighting.",
      tr: "Temellerden müsabaka seviyesine kadar, özgün Kyokushin esaslarına dayanan yapılandırılmış programlar.",
    },
  },
  {
    title: { ar: "اللياقة", en: "Fitness", tr: "Fiziksel Uygunluk" },
    description: {
      ar: "بناء جسدي متكامل يخدم القوة والسرعة والتحمل، بما ينعكس داخل وخارج الحلبة.",
      en: "Complete physical conditioning for strength, speed and endurance — on the mat and off it.",
      tr: "Güç, hız ve dayanıklılık için tam bir fiziksel kondisyon — hem minderde hem günlük hayatta.",
    },
  },
  {
    title: { ar: "الانضباط", en: "Discipline", tr: "Disiplin" },
    description: {
      ar: "قيم الاحترام والالتزام والصبر التي تصنع الشخصية قبل أن تصنع البطل.",
      en: "The values of respect, commitment and patience that build character before they build a champion.",
      tr: "Bir şampiyon inşa etmeden önce karakteri inşa eden saygı, kararlılık ve sabır değerleri.",
    },
  },
  {
    title: { ar: "الثقة والدفاع عن النفس", en: "Confidence & Self-Defense", tr: "Özgüven ve Öz Savunma" },
    description: {
      ar: "أدوات عملية للدفاع عن النفس، وثقة حقيقية تُبنى بالتكرار والتقدم الملموس.",
      en: "Practical self-defense tools and real confidence, built through repetition and visible progress.",
      tr: "Pratik öz savunma becerileri ve tekrar ile somut ilerlemeyle inşa edilen gerçek bir özgüven.",
    },
  },
  {
    title: { ar: "الإعداد للبطولات", en: "Competition Readiness", tr: "Müsabakaya Hazırlık" },
    description: {
      ar: "مسار واضح من أول حصة تدريبية إلى منصات التتويج المحلية والدولية.",
      en: "A clear path from a student's very first class to local and international podiums.",
      tr: "Bir öğrencinin ilk dersinden yerel ve uluslararası podyumlara uzanan net bir yol.",
    },
  },
];

export const audiences: Bi[] = [
  { ar: "الأطفال", en: "Kids", tr: "Çocuklar" },
  { ar: "الناشئون والشباب", en: "Youth", tr: "Gençler" },
  { ar: "الرجال", en: "Men", tr: "Erkekler" },
  { ar: "النساء", en: "Women", tr: "Kadınlar" },
];

export const locationNote: Bi = {
  ar: "بغداد – الصليخ – شارع الـ600 – مقابل الكوخ",
  en: "Baghdad – Al-Sulaikh – 600 Street – Opposite Al-Koukh",
  tr: "Bağdat – Al-Sulaikh – 600. Cadde – Al-Koukh Karşısı",
};
