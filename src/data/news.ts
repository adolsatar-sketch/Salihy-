import type { Bi } from "@/lib/utils";

export type NewsPost = {
  slug: string;
  date: string;
  title: Bi;
  excerpt: Bi;
  body: Bi[];
  image: string;
  imageAlt: Bi;
};

// Grounded in the same verified tournament photography used across the
// Achievements archive. Exact publish dates are placeholders pending
// confirmation from the academy.
export const newsPosts: NewsPost[] = [
  {
    slug: "saffron-championship-podium",
    date: "[التاريخ]",
    title: {
      ar: "أكاديمية صالحي تصعد منصة التتويج في البطولة الدولية للزعفران",
      en: "Salihy Academy Reaches the Podium at the International Saffron Championship",
    },
    excerpt: {
      ar: "مشاركة دولية في كارابوك التركية انتهت برفع العلم العراقي على منصة التتويج.",
      en: "An international outing in Karabük, Turkey ended with the Iraqi flag raised on the podium.",
    },
    body: [
      {
        ar: "شارك أحد لاعبي أكاديمية صالحي في البطولة الدولية الأولى للزعفران للكيوكوشنكاي المقامة في مدينة كارابوك التركية، ليصعد بعدها إلى منصة التتويج ممثلًا العراق أمام لاعبين من عدة دول.",
        en: "An athlete from Salihy Academy competed in the 1st International Saffron Kyokushin Championship held in Karabük, Turkey, reaching the podium and representing Iraq against athletes from multiple countries.",
      },
      {
        ar: "المشاركة جاءت ضمن مسار مستمر لتمثيل الأكاديمية والعراق في المحافل الدولية، وتأكيدًا على أن التدريب المحلي قادر على منافسة أعلى المستويات.",
        en: "The appearance is part of an ongoing path to represent both the academy and Iraq internationally, and a reminder that local training can compete at the highest levels.",
      },
    ],
    image: "/assets/gallery/gallery-05.jpg",
    imageAlt: {
      ar: "لاعب يرفع كأس البطولة ملتفًا بعلم العراق على منصة التتويج",
      en: "An athlete raising the championship trophy wrapped in the Iraqi flag on the podium",
    },
  },
  {
    slug: "budokaido-tokat-results",
    date: "[التاريخ]",
    title: {
      ar: "نتائج قوية لأكاديمية صالحي في بطولة بودوكايدو بتوكات",
      en: "Strong Results for Salihy Academy at the Budokaido Championship in Tokat",
    },
    excerpt: {
      ar: "أربعة لاعبين من الأكاديمية يصعدون منصة التتويج في بطولة أقيمت تحت إشراف الاتحاد التركي للووشو كونغ فو.",
      en: "Four academy athletes reached the podium at a championship held under the Turkish Wushu Kung-Fu Federation.",
    },
    body: [
      {
        ar: "حقق لاعبو أكاديمية صالحي نتائج متقدمة في بطولة بودوكايدو بين المحافظات التي استضافتها مدينة توكات التركية، بمشاركة فئات عمرية مختلفة ضمّت أصغر لاعبي الأكاديمية سنًا.",
        en: "Salihy Academy athletes achieved strong results at the Budokaido inter-provincial championship hosted in Tokat, Turkey, with participants spanning several age categories including some of the academy's youngest fighters.",
      },
      {
        ar: "النتيجة عكست عمق المنهج التدريبي الذي يعتمده المدرب مع لاعبيه، من أصغر الأعمار إلى فريق البطولات.",
        en: "The result reflected the depth of the training method the coach applies with his athletes, from the youngest ages through the competition team.",
      },
    ],
    image: "/assets/gallery/gallery-06.jpg",
    imageAlt: {
      ar: "أربعة لاعبين يقفون على منصة التتويج حاملين كؤوسًا وميداليات",
      en: "Four athletes standing on the podium holding trophies and medals",
    },
  },
];
