import type { Bi } from "@/lib/utils";

// Every field below is optional/empty on purpose: none of this has been
// confirmed by the academy owner yet, so the page must render correctly
// with all of it missing. Never fill a field with a bracket placeholder
// like "[السنة]" or invented copy — leave it absent and let the page hide
// it. See CONTENT_NEEDED.md for the list of what to ask the owner for.
export const coachProfile: {
  fullName?: Bi;
  rankAndBelt?: Bi;
  yearsOfExperience?: Bi;
  portrait: string;
  portraitAlt: Bi;
} = {
  portrait: "/assets/gallery/gallery-07.jpg",
  portraitAlt: {
    ar: "مدرب أكاديمية صالحي يقف بزي الكيوكوشنكاي إلى جانب أحد اللاعبين حاملًا كأس بطولة",
    en: "Salihy Academy coach standing in Kyokushin gi beside an athlete holding a tournament trophy",
    tr: "Salihy Akademisi antrenörü, Kyokushin gi'si içinde bir turnuva kupası tutan bir sporcunun yanında duruyor",
  },
};

// No real first-person quote has been provided — stays undefined until the
// academy supplies real words, never a placeholder or invented sentence.
export const philosophy: Bi | undefined = undefined;

export type CareerMilestone = {
  year?: string;
  title: Bi;
  description: Bi;
  image?: string;
};

// Empty until the academy confirms real milestones (dates, tournaments,
// the founding story). No entry here has ever been provided by the owner,
// so nothing is invented to fill the shape — the Legacy page must hide
// this section entirely when the array is empty.
export const careerTimeline: CareerMilestone[] = [];

// No real vision statement has been provided yet — undefined, not invented.
export const vision: Bi | undefined = undefined;

// Confirmed career facts, given directly by the academy owner — no year is
// attached to any individual title below because none was provided; these
// are a record of places and titles, not a dated timeline. See
// CONTENT_NEEDED.md for what's still needed (years, cities, weight
// classes, documents) to expand this further.
export const journeyStart: { year: string; label: Bi } = {
  year: "2009",
  label: {
    ar: "بداية المسيرة في الكيوكوشنكاي",
    en: "The journey in Kyokushinkai begins",
    tr: "Kyokushinkai yolculuğunun başlangıcı",
  },
};

export const careerRouteIntro: { eyebrow: Bi; title: Bi; intro: Bi } = {
  eyebrow: { ar: "سجل المسيرة", en: "CAREER RECORD", tr: "KARİYER KAYDI" },
  title: { ar: "من بغداد إلى أوروبا", en: "From Baghdad to Europe", tr: "Bağdat'tan Avrupa'ya" },
  intro: {
    ar: "بدأت مسيرة صالحي في الكيوكوشنكاي عام 2009، وتوسعت تجربته بين المنافسة والتدريب والتحكيم، داخل العراق وخارجه.",
    en: "Salihy began his Kyokushinkai journey in 2009, building experience across competition, coaching, and refereeing in Iraq and abroad.",
    tr: "Salihy, Kyokushinkai yolculuğuna 2009 yılında başladı ve Irak'ta ve yurt dışında sporcu, antrenör ve hakem olarak deneyim kazandı.",
  },
};

export type CareerRouteStation = {
  place: Bi;
  title: Bi;
  sublabel?: Bi;
};

// A record of places and titles, not sequential dates — do not attach a
// year to any of these unless the academy confirms one.
export const careerRouteStations: CareerRouteStation[] = [
  {
    place: { ar: "بغداد", en: "Baghdad", tr: "Bağdat" },
    title: { ar: "بطل بغداد", en: "Baghdad Champion", tr: "Bağdat Şampiyonu" },
  },
  {
    place: { ar: "العراق", en: "Iraq", tr: "Irak" },
    title: { ar: "بطل العراق", en: "Iraq Champion", tr: "Irak Şampiyonu" },
  },
  {
    place: { ar: "تركيا", en: "Turkey", tr: "Türkiye" },
    title: { ar: "بطل تركيا", en: "Turkey Champion", tr: "Türkiye Şampiyonu" },
  },
  {
    place: { ar: "أوروبا", en: "Europe", tr: "Avrupa" },
    title: { ar: "بطل أوروبا", en: "European Champion", tr: "Avrupa Şampiyonu" },
    sublabel: { ar: "بطولة الكأس الذهبي", en: "Golden Cup Championship", tr: "Altın Kupa Şampiyonası" },
  },
];

export type CareerCredential = {
  kind: "referee" | "club";
  label: Bi;
  sublabel: Bi;
};

// The club name is written verbatim in every locale, including its
// Turkish characters — never translated or transliterated.
export const careerCredentials: CareerCredential[] = [
  {
    kind: "referee",
    label: { ar: "حكم معتمد", en: "Certified Referee", tr: "Onaylı Hakem" },
    sublabel: {
      ar: "من الاتحاد العراقي المركزي للكيوكوشنكاي",
      en: "Accredited by the Iraqi Central Kyokushinkai Federation",
      tr: "Irak Merkez Kyokushinkai Federasyonu",
    },
  },
  {
    kind: "club",
    label: { ar: "لاعب ومدرب", en: "Athlete & Coach", tr: "Sporcu ve Antrenör" },
    sublabel: { ar: "Gökboğa Spor Kulübü", en: "Gökboğa Spor Kulübü", tr: "Gökboğa Spor Kulübü" },
  },
];
