import type { Bi } from "@/lib/utils";

export type Champion = {
  slug: string;
  name: Bi;
  age: string;
  belt: Bi;
  tournament: Bi;
  result: Bi;
  participations: string;
  image: string;
  imageAlt: Bi;
  story: Bi;
};

// Real athletes from the academy's tournament photography. Personal details
// that are not publicly confirmed (full name, exact age, tally of
// participations) are marked as editable placeholders rather than invented —
// swap them in as the academy confirms each athlete's profile.
export const champions: Champion[] = [
  {
    slug: "champion-01",
    name: { ar: "[اسم اللاعب]", en: "[Athlete Name]" },
    age: "[العمر]",
    belt: { ar: "[الحزام]", en: "[Belt]" },
    tournament: {
      ar: "البطولة الدولية الأولى للزعفران، كارابوك",
      en: "1st International Saffron Championship, Karabük",
    },
    result: { ar: "المركز الأول", en: "1st Place" },
    participations: "[عدد المشاركات]",
    image: "/assets/gallery/gallery-05.jpg",
    imageAlt: {
      ar: "لاعب يرفع كأس البطولة ملتفًا بعلم العراق على منصة التتويج",
      en: "An athlete raising the championship trophy wrapped in the Iraqi flag on the podium",
    },
    story: {
      ar: "صعد إلى منصة التتويج ممثلاً العراق أمام منافسين من عدة دول، في لحظة تُلخّص سنوات من التمرين اليومي والانضباط.",
      en: "Stood on the podium representing Iraq against competitors from several countries — a moment summarizing years of daily training and discipline.",
    },
  },
  {
    slug: "champion-02",
    name: { ar: "[اسم اللاعب]", en: "[Athlete Name]" },
    age: "[العمر]",
    belt: { ar: "الحزام الأسود", en: "Black Belt" },
    tournament: {
      ar: "بطولة بودوكايدو بين المحافظات، توكات",
      en: "Budokaido Inter-Provincial Championship, Tokat",
    },
    result: { ar: "المركز الأول", en: "1st Place" },
    participations: "[عدد المشاركات]",
    image: "/assets/gallery/gallery-06.jpg",
    imageAlt: {
      ar: "لاعب يقف على قمة منصة التتويج حاملاً كأسًا وميدالية ذهبية",
      en: "An athlete standing atop the podium holding a trophy and gold medal",
    },
    story: {
      ar: "من أصغر المشاركين سنًا في البطولة، وأحد أوائل من صعدوا لمنصة التتويج بعد انضمامهم للأكاديمية.",
      en: "One of the youngest competitors at the championship, and among the first to reach the podium after joining the academy.",
    },
  },
  {
    slug: "champion-03",
    name: { ar: "[اسم اللاعب]", en: "[Athlete Name]" },
    age: "[العمر]",
    belt: { ar: "[الحزام]", en: "[Belt]" },
    tournament: { ar: "[اسم البطولة المحلية]", en: "[Local Tournament Name]" },
    result: { ar: "المركز الثاني", en: "2nd Place" },
    participations: "[عدد المشاركات]",
    image: "/assets/gallery/gallery-02.jpg",
    imageAlt: {
      ar: "لاعبان بزي أبيض يحملان كأس المركز الثاني والميداليات",
      en: "Two athletes in white gi holding a second-place trophy and medals",
    },
    story: {
      ar: "رحلة بدأت بخطوات مترددة داخل الصالة، وانتهت بابتسامة واثقة فوق منصة التتويج.",
      en: "A journey that began with hesitant steps inside the dojo, and ended with a confident smile on the podium.",
    },
  },
  {
    slug: "champion-04",
    name: { ar: "[اسم اللاعب]", en: "[Athlete Name]" },
    age: "[العمر]",
    belt: { ar: "[الحزام]", en: "[Belt]" },
    tournament: { ar: "[اسم البطولة المحلية]", en: "[Local Tournament Name]" },
    result: { ar: "المركز الأول", en: "1st Place" },
    participations: "[عدد المشاركات]",
    image: "/assets/gallery/gallery-08.jpg",
    imageAlt: {
      ar: "لاعب ضمن فريق حصد المراكز الأربعة الأولى في بطولة محلية",
      en: "An athlete from a team that swept the top four places at a local championship",
    },
    story: {
      ar: "جزء من جيل كامل من لاعبي الأكاديمية الذين تصدّروا منصة التتويج معًا في اليوم نفسه.",
      en: "Part of an entire generation of academy athletes who topped the podium together on the very same day.",
    },
  },
];
