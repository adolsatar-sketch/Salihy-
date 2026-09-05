import type { Bi } from "@/lib/utils";

export const coachProfile = {
  fullName: { ar: "[الاسم الكامل]", en: "[Full Name]" } as Bi,
  rankAndBelt: { ar: "[الرتبة والحزام]", en: "[Rank & Belt]" } as Bi,
  yearsOfExperience: { ar: "[سنوات الخبرة]", en: "[Years of Experience]" } as Bi,
  portrait: "/assets/gallery/gallery-07.jpg",
  portraitAlt: {
    ar: "مدرب أكاديمية صالحي يقف بزي الكيوكوشنكاي إلى جانب أحد اللاعبين حاملًا كأس بطولة",
    en: "Salihy Academy coach standing in Kyokushin gi beside an athlete holding a tournament trophy",
  } as Bi,
};

export const bioIntro: Bi = {
  ar: "قبل أن يرتدي عباءة المدرب، كان صالحي مقاتلًا في الحلبة نفسها التي يدرّب فيها اليوم أبناءه من اللاعبين. مسيرته لم تبدأ من مكتب، بل من الأرض، من التمارين المتكررة، ومن سنوات النزال التي شكّلت فهمه العميق لما يعنيه أن تصنع بطلًا.",
  en: "Before he ever wore a coach's mantle, Salihy was a fighter on the very mat where he now trains the next generation. His story didn't start behind a desk — it started on the ground, in repetition, and in years of competition that shaped a deep understanding of what it truly takes to build a champion.",
};

export type CareerMilestone = {
  year: string;
  title: Bi;
  description: Bi;
  image?: string;
};

export const careerTimeline: CareerMilestone[] = [
  {
    year: "[السنة]",
    title: { ar: "البداية في الكيوكوشنكاي", en: "The Beginning in Kyokushin" },
    description: {
      ar: "أولى الخطوات داخل القاعة، حيث بدأ التمرين اليومي والانضباط يشكلان أساس المسيرة.",
      en: "The first steps inside the dojo, where daily training and discipline began forming the foundation of the journey.",
    },
    image: "/assets/gallery/gallery-04.jpg",
  },
  {
    year: "[السنة]",
    title: { ar: "أول بطولة", en: "First Tournament" },
    description: {
      ar: "أول اختبار حقيقي على الحلبة، وأول درس في ضغط المنافسة واتخاذ القرار في اللحظة.",
      en: "The first real test on the mat — and the first lesson in competitive pressure and split-second decisions.",
    },
  },
  {
    year: "[السنة]",
    title: { ar: "مشاركات دولية", en: "International Participation" },
    description: {
      ar: "تمثيل العراق خارج الحدود، ومواجهة مستويات ومدارس قتالية مختلفة صقلت الأسلوب والخبرة.",
      en: "Representing Iraq abroad, facing different schools and styles that refined both technique and experience.",
    },
    image: "/assets/gallery/gallery-05.jpg",
  },
  {
    year: "[السنة]",
    title: { ar: "الانتقال من لاعب إلى مدرب", en: "From Fighter to Coach" },
    description: {
      ar: "قرار تحويل سنوات الخبرة إلى منهج تدريبي، ونقل ما تعلّمه على الحلبة إلى جيل جديد من اللاعبين.",
      en: "The decision to turn years of experience into a training method — passing on everything learned on the mat to a new generation of athletes.",
    },
    image: "/assets/gallery/gallery-06.jpg",
  },
  {
    year: "[السنة]",
    title: { ar: "تأسيس أكاديمية صالحي", en: "Founding Salihy Academy" },
    description: {
      ar: "ولادة مساحة تدريب متكاملة تحمل فلسفة واضحة: الانضباط أولًا، ثم البطولة.",
      en: "The birth of a complete training space built on one clear philosophy: discipline first, championship after.",
    },
  },
];

export const philosophy: Bi = {
  ar: "أؤمن أن الحزام الأسود ليس نهاية الطريق، بل بداية القدرة على تعليم الآخرين. أبني لاعبيّ على ثلاث ركائز: الانضباط، الاحترام، والاستمرارية. الميداليات تأتي كنتيجة طبيعية حين تُبنى هذه الركائز أولًا.",
  en: "I believe the black belt isn't the end of the road — it's the beginning of the ability to teach others. I build my athletes on three pillars: discipline, respect and consistency. Medals arrive naturally once those pillars are in place first.",
};

export const vision: Bi = {
  ar: "رؤيتي لأكاديمية صالحي هي أن تكون بيتًا لصناعة الأبطال بمعناها الحقيقي: أبطال داخل الحلبة وخارجها، في حياتهم الدراسية والشخصية، وفي المجتمع من حولهم.",
  en: "My vision for Salihy Academy is to be a home for building champions in the truest sense — champions on the mat and off it, in their studies, their character, and the community around them.",
};
