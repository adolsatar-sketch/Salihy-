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
// Captions stay strictly neutral/documentary: no tournament name,
// placement, year, or player identity is ever read off a photo (a
// banner, a medal color, a "1" on a podium block) — only the alt text
// describes what is visibly in frame, for accessibility.
export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-04",
    src: "/assets/gallery/gallery-04.jpg",
    width: 853,
    height: 1280,
    categories: ["legacy", "training", "fights"],
    caption: { ar: "من الأرشيف", en: "From the archive" },
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
    caption: { ar: "لحظة من التدريب الحر", en: "A moment from free sparring" },
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
    caption: { ar: "لحظة من إحدى المباريات", en: "A moment from a match" },
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
    caption: { ar: "لحظة على منصة التتويج", en: "A moment on the podium" },
    alt: {
      ar: "لاعب يرفع كأس البطولة على منصة التتويج ملتفًا بعلم العراق، وبجانبه لاعبون آخرون يحملون العلم العراقي وعلم تركيا",
      en: "An athlete raising a championship trophy on the podium wrapped in the Iraqi flag, alongside other athletes holding the Iraqi and Turkish flags",
    },
  },
  {
    id: "gallery-06",
    src: "/assets/gallery/gallery-06.jpg",
    width: 2000,
    height: 1500,
    categories: ["tournaments", "trophies", "students"],
    caption: { ar: "لحظة على منصة التتويج", en: "A moment on the podium" },
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
    caption: { ar: "لحظة من إحدى البطولات", en: "A moment from a tournament" },
    alt: {
      ar: "لاعبان بزي الكيوكوشنكاي الأبيض يحملان كؤوسًا وميداليات ويبتسمان",
      en: "Two athletes in white Kyokushin gi holding trophies and medals, smiling",
    },
  },
  {
    id: "gallery-08",
    src: "/assets/gallery/gallery-08.jpg",
    width: 2000,
    height: 1500,
    categories: ["tournaments", "trophies", "students"],
    caption: { ar: "فريق الأكاديمية مع كؤوس البطولة", en: "The academy team with tournament trophies" },
    alt: {
      ar: "أربعة لاعبين يقفون بجانب بعضهم حاملين ميداليات، وأمامهم أربع كؤوس بطولة",
      en: "Four athletes standing together wearing medals, with four tournament trophies in front of them",
    },
  },
  {
    id: "gallery-01",
    src: "/assets/gallery/gallery-01.jpg",
    width: 1125,
    height: 1500,
    categories: ["academy", "behind"],
    caption: { ar: "لحظة تركيز داخل الصالة", en: "A focused moment inside the hall" },
    alt: {
      ar: "لاعب راكع على الأرض بزي أبيض وحزام أسود داخل الصالة",
      en: "An athlete kneeling on the mat in a white gi and black belt inside the hall",
    },
  },
  {
    id: "gallery-07",
    src: "/assets/gallery/gallery-07.jpg",
    width: 1512,
    height: 2016,
    categories: ["behind", "students"],
    caption: { ar: "المدرب مع أحد اللاعبين", en: "The coach with an athlete" },
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
