import type { Bi } from "@/lib/utils";

export type ProgramSlug =
  | "kids"
  | "youth"
  | "adults"
  | "women"
  | "competition-team"
  | "study-sport"
  | "training-system"
  | "belt-journey";

// Age ranges, session counts/durations, levels, goals, curricula and
// registration requirements have never been confirmed by the academy, so
// every one of those fields is optional and left unset below — never
// filled with a number or claim that hasn't actually been provided.
// See CONTENT_NEEDED.md.
export type Program = {
  slug: ProgramSlug;
  title: Bi;
  shortTitle: Bi;
  heroImage: string;
  heroImageAlt: Bi;
  summary: Bi;
  audience: Bi;
  ageRange?: Bi;
  level?: Bi;
  goals?: Bi[];
  sessionsPerWeek?: Bi;
  sessionDuration?: Bi;
  curriculum?: Bi[];
  requirements?: Bi[];
  isInformational?: boolean;
};

export const programs: Program[] = [
  {
    slug: "kids",
    title: { ar: "برنامج الأطفال", en: "Kids Program" },
    shortTitle: { ar: "الأطفال", en: "Kids" },
    heroImage: "/assets/gallery/gallery-06.jpg",
    heroImageAlt: {
      ar: "طفل يقف على منصة التتويج حاملاً ميدالية ذهبية بين لاعبين بالغين",
      en: "A child standing on the podium holding a gold medal among adult athletes",
    },
    summary: {
      ar: "أولى خطوات الانضباط والثقة، بأسلوب آمن وممتع يبني الجسد والشخصية معًا.",
      en: "The first steps of discipline and confidence — a safe, engaging way to build both body and character.",
    },
    audience: {
      ar: "لكل طفل يحتاج إلى مساحة آمنة لبناء الثقة، التركيز، واحترام القواعد.",
      en: "For every child who needs a safe space to build confidence, focus, and respect for rules.",
    },
  },
  {
    slug: "youth",
    title: { ar: "برنامج الناشئين والشباب", en: "Youth Program" },
    shortTitle: { ar: "الناشئون والشباب", en: "Youth" },
    heroImage: "/assets/gallery/gallery-09.jpg",
    heroImageAlt: {
      ar: "لاعبان شابان يتدربان معًا على حركة رفع الركبة داخل الصالة",
      en: "Two young athletes practicing a knee-raise drill together inside the training hall",
    },
    summary: {
      ar: "المرحلة التي تتحول فيها الأساسيات إلى مهارة حقيقية، واللياقة إلى قوة قتالية.",
      en: "The stage where fundamentals become real skill, and fitness becomes fighting strength.",
    },
    audience: {
      ar: "لمن أنهى المرحلة التأسيسية ويريد تطوير مهاراته القتالية بجدية أكبر.",
      en: "For those who've completed the foundational stage and want to sharpen their fighting skills more seriously.",
    },
  },
  {
    slug: "adults",
    title: { ar: "برنامج البالغين", en: "Adults Program" },
    shortTitle: { ar: "البالغون", en: "Adults" },
    heroImage: "/assets/gallery/gallery-03.jpg",
    heroImageAlt: {
      ar: "لاعب بالغ ينفذ ركلة عالية أثناء التدريب الحر",
      en: "An adult athlete executing a high kick during free sparring",
    },
    summary: {
      ar: "تدريب قتالي حقيقي بمعايير احترافية، لمن يريد اللياقة والقوة والانضباط في آنٍ واحد.",
      en: "Real combat training at a professional standard — for those seeking fitness, strength and discipline together.",
    },
    audience: {
      ar: "للرجال الراغبين في خوض تجربة كيوكوشنكاي كاملة، من اللياقة إلى القتال التنافسي.",
      en: "For men seeking the full Kyokushin experience — from fitness to competitive fighting.",
    },
  },
  {
    slug: "women",
    title: { ar: "برنامج النساء", en: "Women's Program" },
    shortTitle: { ar: "النساء", en: "Women" },
    heroImage: "/assets/gallery/gallery-01.jpg",
    heroImageAlt: {
      ar: "أجواء صالة تدريب الكيوكوشنكاي داخل الأكاديمية",
      en: "The atmosphere of the academy's Kyokushin training hall",
    },
    summary: {
      ar: "مساحة تدريب خاصة تجمع اللياقة، الدفاع عن النفس، والثقة، في بيئة محترمة ومنظّمة.",
      en: "A dedicated training space combining fitness, self-defense and confidence in a respectful, structured environment.",
    },
    audience: {
      ar: "لكل امرأة تبحث عن رياضة قتالية جادة تبني الجسد والثقة والقدرة على حماية النفس.",
      en: "For every woman seeking a serious combat sport that builds the body, confidence, and the ability to protect herself.",
    },
  },
  {
    slug: "competition-team",
    title: { ar: "فريق البطولات", en: "Competition Team" },
    shortTitle: { ar: "فريق البطولات", en: "Competition Team" },
    heroImage: "/assets/gallery/gallery-08.jpg",
    heroImageAlt: {
      ar: "فريق لاعبين يقفون بجانب أربع كؤوس بطولة يرتدون ميدالياتهم",
      en: "A team of athletes standing beside four championship trophies wearing their medals",
    },
    summary: {
      ar: "المسار التنافسي المكثّف لمن أثبت جاهزيته لتمثيل الأكاديمية على المنصات المحلية والدولية.",
      en: "The intensive competitive track for those who've proven readiness to represent the academy on local and international podiums.",
    },
    audience: {
      ar: "للاعبين الذين اجتازوا المستويات التأسيسية وأظهروا الجاهزية البدنية والذهنية للمنافسة.",
      en: "For athletes who've passed foundational levels and shown the physical and mental readiness to compete.",
    },
  },
  {
    slug: "study-sport",
    title: { ar: "برنامج الدراسة والرياضة", en: "Study & Sport Program" },
    shortTitle: { ar: "الدراسة والرياضة", en: "Study & Sport" },
    heroImage: "/assets/gallery/gallery-09.jpg",
    heroImageAlt: {
      ar: "لاعبان شابان يتدربان على الانضباط والتركيز الحركي",
      en: "Two young athletes training on discipline and focused movement",
    },
    summary: {
      ar: "دراسة أفضل… وشخصية أقوى. نظام يجمع بين التحصيل الدراسي والتدريب القتالي وإدارة الوقت.",
      en: "Better studying, a stronger character. A system combining academic performance, combat training, and time management.",
    },
    audience: {
      ar: "للطلاب الذين يريدون تحسين تركيزهم وانضباطهم الدراسي عبر منهج رياضي قتالي منظّم.",
      en: "For students who want to improve their focus and academic discipline through a structured combat-sport method.",
    },
  },
  {
    slug: "training-system",
    title: { ar: "نظام التدريب", en: "Training System" },
    shortTitle: { ar: "نظام التدريب", en: "Training System" },
    heroImage: "/assets/gallery/gallery-10.jpg",
    heroImageAlt: {
      ar: "لاعب ينفذ ركلة أمامية قوية داخل صالة بطولة",
      en: "An athlete delivering a powerful front kick inside a tournament hall",
    },
    summary: {
      ar: "منهجية واحدة تحكم كل برامج الأكاديمية: أساس تقني صلب، إعداد بدني متدرج، وانضباط لا يتزحزح.",
      en: "One methodology governs every academy program: a solid technical base, progressive conditioning, and unwavering discipline.",
    },
    audience: {
      ar: "الإطار الذي تُبنى عليه جميع البرامج، من الأطفال إلى فريق البطولات.",
      en: "The framework underlying every program, from kids to the competition team.",
    },
    isInformational: true,
  },
  {
    slug: "belt-journey",
    title: { ar: "رحلة الأحزمة", en: "Belt Journey" },
    shortTitle: { ar: "رحلة الأحزمة", en: "Belt Journey" },
    heroImage: "/assets/gallery/gallery-01.jpg",
    heroImageAlt: {
      ar: "لاعب راكع بحزام أسود بانتظار نتيجة المباراة",
      en: "An athlete kneeling in a black belt awaiting the match result",
    },
    summary: {
      ar: "كل حزام محطة، وكل محطة اختبار حقيقي للمهارة والانضباط والصبر.",
      en: "Every belt is a milestone, and every milestone is a real test of skill, discipline and patience.",
    },
    audience: {
      ar: "مسار تدرّج الأحزمة المتّبع في نظام الكيوكوشنكاي العالمي، من الحزام الأبيض إلى الأسود.",
      en: "The belt progression followed within the global Kyokushin system, from white belt to black.",
    },
    isInformational: true,
  },
];

export function getProgram(slug: ProgramSlug): Program {
  const program = programs.find((item) => item.slug === slug);
  if (!program) {
    throw new Error(`Unknown program slug: ${slug}`);
  }
  return program;
}

export type BeltRank = {
  name: Bi;
  colorHex: string;
};

// The standard Kyokushin kyu → dan belt progression (general knowledge of
// the style, not an academy-specific claim).
export const beltRanks: BeltRank[] = [
  { name: { ar: "الحزام الأبيض", en: "White Belt" }, colorHex: "#F2EFE8" },
  { name: { ar: "الحزام الأزرق", en: "Blue Belt" }, colorHex: "#2452A6" },
  { name: { ar: "الحزام الأصفر", en: "Yellow Belt" }, colorHex: "#D8B84A" },
  { name: { ar: "الحزام البرتقالي", en: "Orange Belt" }, colorHex: "#C9622A" },
  { name: { ar: "الحزام الأخضر", en: "Green Belt" }, colorHex: "#3E6B3A" },
  { name: { ar: "الحزام البني", en: "Brown Belt" }, colorHex: "#5A3A24" },
  { name: { ar: "الحزام الأسود", en: "Black Belt" }, colorHex: "#111111" },
];
