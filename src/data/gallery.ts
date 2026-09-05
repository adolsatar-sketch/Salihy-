import type { Bi } from "@/lib/utils";

export type GalleryCategory =
  | "legacy"
  | "fights"
  | "tournaments"
  | "trophies"
  | "students"
  | "academy"
  | "training"
  | "behind";

export type GalleryItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  categories: GalleryCategory[];
  caption: Bi;
  alt: Bi;
};

// Real, unedited academy photography. Nothing here is stock imagery or
// AI-generated — every entry maps to a file under /public/assets/gallery.
export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-04",
    src: "/assets/gallery/gallery-04.jpg",
    width: 853,
    height: 1280,
    categories: ["legacy", "training", "fights"],
    caption: { ar: "من الأرشيف — سنوات التمرين الأولى", en: "From the archive — the early training years" },
    alt: {
      ar: "صورة أرشيفية قديمة للاعبين يتدربان على القتال داخل صالة رياضية، أحدهما يرتدي حزامًا أخضر",
      en: "Archival photo of two athletes sparring in a gym, one wearing a green belt",
    },
  },
  {
    id: "gallery-03",
    src: "/assets/gallery/gallery-03.jpg",
    width: 1500,
    height: 2249,
    categories: ["fights", "training"],
    caption: { ar: "ركلة رأس في التدريب الحر", en: "A head-height kick in free sparring" },
    alt: {
      ar: "لاعب كيوكوشنكاي ينفذ ركلة عالية باتجاه رأس شريكه داخل صالة تدريب",
      en: "A Kyokushin fighter executing a high kick toward his sparring partner's head inside the training hall",
    },
  },
  {
    id: "gallery-10",
    src: "/assets/gallery/gallery-10.jpg",
    width: 853,
    height: 1280,
    categories: ["fights", "tournaments"],
    caption: { ar: "ركلة أمامية أمام الجمهور", en: "A front kick in front of the crowd" },
    alt: {
      ar: "لاعب ينفذ ركلة أمامية قوية داخل صالة بطولة أمام جمهور من المتفرجين",
      en: "An athlete delivering a powerful front kick inside a tournament hall in front of spectators",
    },
  },
  {
    id: "gallery-05",
    src: "/assets/gallery/gallery-05.jpg",
    width: 750,
    height: 750,
    categories: ["tournaments", "trophies"],
    caption: {
      ar: "منصة التتويج — البطولة الدولية الأولى للزعفران للكيوكوشنكاي، تركيا",
      en: "The podium — 1st International Saffron Kyokushin Championship, Turkey",
    },
    alt: {
      ar: "لاعب يرفع كأس البطولة على منصة التتويج ملتفًا بعلم العراق، وبجانبه لاعبون آخرون يحملون العلم العراقي وعلم تركيا",
      en: "An athlete raising the championship trophy on the podium wrapped in the Iraqi flag, alongside other athletes holding the Iraqi and Turkish flags",
    },
  },
  {
    id: "gallery-06",
    src: "/assets/gallery/gallery-06.jpg",
    width: 2000,
    height: 1500,
    categories: ["tournaments", "trophies", "students"],
    caption: { ar: "منصة التتويج — بطولة بودوكايدو، تركيا", en: "The podium — Budokaido Championship, Turkey" },
    alt: {
      ar: "أربعة لاعبين من بينهم طفل يقفون على منصة التتويج حاملين كؤوسًا وميداليات أمام العلم التركي",
      en: "Four athletes, including a child, standing on the podium holding trophies and medals in front of the Turkish flag",
    },
  },
  {
    id: "gallery-02",
    src: "/assets/gallery/gallery-02.jpg",
    width: 1512,
    height: 2016,
    categories: ["tournaments", "trophies", "students"],
    caption: { ar: "المركز الثاني — بطولة محلية", en: "Second place — local championship" },
    alt: {
      ar: "لاعبان بزي الكيوكوشنكاي الأبيض يحملان كأس المركز الثاني والميداليات ويبتسمان",
      en: "Two athletes in white Kyokushin gi holding second-place trophies and medals, smiling",
    },
  },
  {
    id: "gallery-08",
    src: "/assets/gallery/gallery-08.jpg",
    width: 2000,
    height: 1500,
    categories: ["tournaments", "trophies", "students"],
    caption: { ar: "فريق الأكاديمية بكؤوس المراكز الأربعة الأولى", en: "The academy team with four podium trophies" },
    alt: {
      ar: "أربعة لاعبين يقفون بجانب بعضهم حاملين ميداليات، وأمامهم أربع كؤوس تحمل تسميات المراكز الأول حتى الرابع",
      en: "Four athletes standing together wearing medals, with four trophies labeled first through fourth place in front of them",
    },
  },
  {
    id: "gallery-01",
    src: "/assets/gallery/gallery-01.jpg",
    width: 1125,
    height: 1500,
    categories: ["academy", "behind"],
    caption: { ar: "لحظة تركيز قبل الإعلان عن النتيجة", en: "A focused moment before the result is announced" },
    alt: {
      ar: "لاعب راكع على الأرض بزي أبيض وحزام أسود بانتظار الإعلان عن نتيجة المباراة داخل الصالة",
      en: "An athlete kneeling on the mat in a white gi and black belt, waiting for the match result to be announced",
    },
  },
  {
    id: "gallery-07",
    src: "/assets/gallery/gallery-07.jpg",
    width: 1512,
    height: 2016,
    categories: ["behind", "students"],
    caption: { ar: "المدرب مع أحد اللاعبين بعد التتويج", en: "The coach with an athlete after the podium" },
    alt: {
      ar: "مدرب يقف بجانب لاعب يرتدي زي الكيوكوشنكاي ويحمل كأس بطولة",
      en: "A coach standing beside an athlete wearing a Kyokushin gi and holding a championship trophy",
    },
  },
  {
    id: "gallery-09",
    src: "/assets/gallery/gallery-09.jpg",
    width: 853,
    height: 1280,
    categories: ["training", "behind"],
    caption: { ar: "تدريب ثنائي على الحركات الأساسية", en: "Partner drilling on fundamental movements" },
    alt: {
      ar: "لاعبان يتدربان معًا على حركة رفع الركبة داخل صالة التدريب",
      en: "Two athletes practicing a knee-raise drill together inside the training hall",
    },
  },
];

export const galleryCategoryLabels: Record<GalleryCategory, Bi> = {
  legacy: { ar: "المسيرة", en: "Legacy" },
  fights: { ar: "النزالات", en: "Fights" },
  tournaments: { ar: "البطولات", en: "Tournaments" },
  trophies: { ar: "الكؤوس", en: "Trophies" },
  students: { ar: "الطلاب", en: "Students" },
  academy: { ar: "الأكاديمية", en: "Academy" },
  training: { ar: "التدريب", en: "Training" },
  behind: { ar: "خلف الكواليس", en: "Behind the Scenes" },
};
