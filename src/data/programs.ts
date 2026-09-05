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

export type Program = {
  slug: ProgramSlug;
  title: Bi;
  shortTitle: Bi;
  heroImage: string;
  heroImageAlt: Bi;
  summary: Bi;
  audience: Bi;
  ageRange: Bi;
  level: Bi;
  goals: Bi[];
  sessionsPerWeek: Bi;
  sessionDuration: Bi;
  curriculum: Bi[];
  requirements: Bi[];
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
    ageRange: { ar: "٦ – ١٢ سنة", en: "6 – 12 years" },
    level: { ar: "مبتدئ، بدون خبرة سابقة", en: "Beginner, no prior experience needed" },
    goals: [
      { ar: "بناء الثقة بالنفس والانضباط المبكر", en: "Building early self-confidence and discipline" },
      { ar: "تطوير التوازن والتناسق الحركي", en: "Developing balance and motor coordination" },
      { ar: "تعلّم احترام المدرب والزملاء والقواعد", en: "Learning respect for the coach, peers, and rules" },
      { ar: "تأسيس حركي سليم للانتقال لاحقًا للمنافسات", en: "A sound technical base for future competition" },
    ],
    sessionsPerWeek: { ar: "حصتان إلى ثلاث حصص أسبوعيًا", en: "Two to three sessions per week" },
    sessionDuration: { ar: "٦٠ دقيقة", en: "60 minutes" },
    curriculum: [
      { ar: "أساسيات الوقفات والحركة", en: "Fundamentals of stances and movement" },
      { ar: "الضربات والركلات الأساسية بأسلوب آمن", en: "Basic strikes and kicks taught safely" },
      { ar: "ألعاب حركية لبناء اللياقة والتركيز", en: "Movement-based games for fitness and focus" },
      { ar: "قواعد السلوك والانضباط داخل الصالة", en: "Dojo etiquette and behavioral discipline" },
    ],
    requirements: [
      { ar: "زي تدريب (يُوفَّر التوجيه عند التسجيل)", en: "Training uniform (guidance provided upon registration)" },
      { ar: "موافقة ولي الأمر", en: "Parental consent" },
    ],
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
    ageRange: { ar: "١٣ – ١٧ سنة", en: "13 – 17 years" },
    level: { ar: "مبتدئ إلى متوسط", en: "Beginner to intermediate" },
    goals: [
      { ar: "تطوير القوة والسرعة والتحمل", en: "Developing strength, speed and endurance" },
      { ar: "إتقان تقنيات القتال المتقدمة تدريجيًا", en: "Gradually mastering advanced fighting techniques" },
      { ar: "بناء الانضباط الذهني تحت الضغط", en: "Building mental discipline under pressure" },
      { ar: "التمهيد للمشاركة في أول بطولة", en: "Preparing for a first competitive tournament" },
    ],
    sessionsPerWeek: { ar: "ثلاث حصص أسبوعيًا", en: "Three sessions per week" },
    sessionDuration: { ar: "٧٥ دقيقة", en: "75 minutes" },
    curriculum: [
      { ar: "تقنيات الكوميتيه (Kumite) التدريجية", en: "Progressive Kumite (sparring) techniques" },
      { ar: "الكاتا الأساسية والمتوسطة", en: "Basic and intermediate Kata" },
      { ar: "تمارين قوة وتحمل مخصصة للفئة العمرية", en: "Strength and endurance training suited to the age group" },
      { ar: "مقدمة في قواعد التحكيم والمنافسة", en: "An introduction to competition and refereeing rules" },
    ],
    requirements: [
      { ar: "زي تدريب وحزام حسب المستوى", en: "Training uniform and belt matching current level" },
      { ar: "فحص لياقة أولي عند الحاجة", en: "A basic fitness check-in when needed" },
    ],
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
    ageRange: { ar: "١٨ سنة فما فوق", en: "18 years and above" },
    level: { ar: "جميع المستويات", en: "All levels" },
    goals: [
      { ar: "بناء قوة قتالية ولياقة بدنية عالية", en: "Building combat strength and high physical fitness" },
      { ar: "إتقان الأسلوب الكامل من الأساس إلى القتال المتقدم", en: "Mastering the full style from basics to advanced fighting" },
      { ar: "تطوير الانضباط والصبر تحت الاحتكاك المباشر", en: "Developing discipline and patience under full-contact pressure" },
      { ar: "مسار مفتوح نحو فريق البطولات", en: "An open path toward the Competition Team" },
    ],
    sessionsPerWeek: { ar: "ثلاث حصص أسبوعيًا", en: "Three sessions per week" },
    sessionDuration: { ar: "٩٠ دقيقة", en: "90 minutes" },
    curriculum: [
      { ar: "أساسيات وتقنيات الكيوكوشنكاي الكاملة", en: "Complete Kyokushin fundamentals and techniques" },
      { ar: "كوميتيه احتكاك كامل تدريجي", en: "Progressive full-contact Kumite" },
      { ar: "كاتا متقدمة", en: "Advanced Kata" },
      { ar: "إعداد بدني وقتالي للمنافسات", en: "Physical and combat conditioning for competition" },
    ],
    requirements: [
      { ar: "زي تدريب رسمي", en: "Official training uniform" },
      { ar: "لياقة عامة، بدون شرط خبرة سابقة", en: "General fitness, no prior experience required" },
    ],
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
    ageRange: { ar: "١٦ سنة فما فوق", en: "16 years and above" },
    level: { ar: "جميع المستويات", en: "All levels" },
    goals: [
      { ar: "تعلّم مهارات دفاع عن النفس عملية وفعالة", en: "Learning practical, effective self-defense skills" },
      { ar: "بناء اللياقة والقوة بأسلوب تدريجي", en: "Building fitness and strength progressively" },
      { ar: "تعزيز الثقة بالنفس داخل وخارج الصالة", en: "Boosting self-confidence on and off the mat" },
      { ar: "بيئة تدريب محترمة وداعمة", en: "A respectful and supportive training environment" },
    ],
    sessionsPerWeek: { ar: "حصتان إلى ثلاث حصص أسبوعيًا", en: "Two to three sessions per week" },
    sessionDuration: { ar: "٧٥ دقيقة", en: "75 minutes" },
    curriculum: [
      { ar: "أساسيات الكيوكوشنكاي والدفاع عن النفس", en: "Kyokushin fundamentals and self-defense" },
      { ar: "تمارين لياقة وقوة وظيفية", en: "Functional strength and fitness training" },
      { ar: "تقنيات تحكم ومسافة قتالية", en: "Control and fighting-distance techniques" },
      { ar: "مسار اختياري نحو الأحزمة والمنافسات", en: "An optional path toward belts and competition" },
    ],
    requirements: [
      { ar: "زي تدريب مريح", en: "Comfortable training attire" },
      { ar: "لا حاجة لخبرة سابقة", en: "No prior experience required" },
    ],
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
    ageRange: { ar: "حسب الفئة العمرية للبطولة", en: "According to the tournament's age category" },
    level: { ar: "متقدم، بدعوة من المدرب", en: "Advanced, by coach invitation" },
    goals: [
      { ar: "الإعداد المكثف للبطولات المحلية والدولية", en: "Intensive preparation for local and international championships" },
      { ar: "تطوير الأسلوب القتالي الفردي لكل لاعب", en: "Developing each athlete's individual fighting style" },
      { ar: "بناء العقلية التنافسية وإدارة الضغط", en: "Building a competitive mindset and pressure management" },
      { ar: "تمثيل الأكاديمية والعراق في المحافل الخارجية", en: "Representing the academy and Iraq abroad" },
    ],
    sessionsPerWeek: { ar: "أربع إلى خمس حصص أسبوعيًا", en: "Four to five sessions per week" },
    sessionDuration: { ar: "١٢٠ دقيقة", en: "120 minutes" },
    curriculum: [
      { ar: "تكتيكات قتال متقدمة وتحليل الخصوم", en: "Advanced fight tactics and opponent analysis" },
      { ar: "إعداد بدني عالي الأداء", en: "High-performance physical conditioning" },
      { ar: "محاكاة نزالات بشروط البطولات", en: "Tournament-condition sparring simulations" },
      { ar: "متابعة فردية مع المدرب قبل كل بطولة", en: "One-on-one coaching review before every tournament" },
    ],
    requirements: [
      { ar: "توصية من المدرب المباشر", en: "A recommendation from the primary coach" },
      { ar: "التزام كامل بجدول التدريب المكثف", en: "Full commitment to the intensive training schedule" },
    ],
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
    ageRange: { ar: "١٠ – ١٨ سنة", en: "10 – 18 years" },
    level: { ar: "جميع المستويات", en: "All levels" },
    goals: [
      { ar: "تحسين إدارة الوقت بين الدراسة والتدريب", en: "Improving time management between study and training" },
      { ar: "بناء الانضباط الذاتي والمتابعة المستمرة", en: "Building self-discipline and ongoing accountability" },
      { ar: "تعزيز الثقة والتركيز داخل الصف الدراسي", en: "Boosting confidence and focus inside the classroom" },
      { ar: "متابعة دورية لمستوى الطالب الدراسي والرياضي", en: "Regular tracking of the student's academic and athletic progress" },
    ],
    sessionsPerWeek: { ar: "حصتان أسبوعيًا + متابعة دراسية", en: "Two sessions per week + academic follow-up" },
    sessionDuration: { ar: "٦٠ دقيقة تدريب + متابعة", en: "60-minute training + follow-up" },
    curriculum: [
      { ar: "تدريب كيوكوشنكاي أساسي منتظم", en: "Regular foundational Kyokushin training" },
      { ar: "جلسات إدارة وقت وتنظيم أهداف", en: "Time-management and goal-setting sessions" },
      { ar: "متابعة دورية مع ولي الأمر", en: "Periodic follow-up with the parent or guardian" },
      { ar: "تقييم مستمر للانضباط والالتزام", en: "Ongoing evaluation of discipline and commitment" },
    ],
    requirements: [
      { ar: "موافقة ولي الأمر", en: "Parental consent" },
      { ar: "الالتزام بالحصص الدراسية والتدريبية معًا", en: "Commitment to both academic and training sessions" },
    ],
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
    ageRange: { ar: "لكل الفئات العمرية", en: "For every age group" },
    level: { ar: "من الأساس إلى الاحتراف", en: "From foundations to elite level" },
    goals: [
      { ar: "أساس تقني موحّد قابل للبناء عليه مع كل مستوى", en: "A unified technical base that builds progressively with every level" },
      { ar: "تدرّج بدني آمن يحمي من الإصابات", en: "Safe physical progression that guards against injury" },
      { ar: "انضباط سلوكي وذهني ثابت في كل حصة", en: "Consistent behavioral and mental discipline in every session" },
      { ar: "تقييم دوري للتقدّم الفردي", en: "Periodic evaluation of individual progress" },
    ],
    sessionsPerWeek: { ar: "حسب البرنامج المختار", en: "According to the chosen program" },
    sessionDuration: { ar: "٦٠ – ١٢٠ دقيقة", en: "60 – 120 minutes" },
    curriculum: [
      { ar: "الإحماء وتهيئة الجسم والذهن", en: "Warm-up and physical-mental preparation" },
      { ar: "التقنية: الأساسيات، الكاتا، الكوميتيه", en: "Technique: Kihon, Kata, Kumite" },
      { ar: "الإعداد البدني المتخصص", en: "Specialized physical conditioning" },
      { ar: "الانضباط الختامي ومراجعة الحصة", en: "Closing discipline and session review" },
    ],
    requirements: [
      { ar: "الانتماء لأحد برامج الأكاديمية", en: "Enrollment in one of the academy's programs" },
    ],
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
    ageRange: { ar: "لكل الفئات العمرية", en: "For every age group" },
    level: { ar: "تدرّجي عبر جميع المستويات", en: "Progressive across all levels" },
    goals: [
      { ar: "معيار واضح لقياس التقدّم التقني", en: "A clear standard for measuring technical progress" },
      { ar: "اختبارات دورية بمعايير الكيوكوشنكاي", en: "Periodic testing per Kyokushin standards" },
      { ar: "تحفيز مستمر للاستمرار والالتزام", en: "Ongoing motivation to persist and stay committed" },
    ],
    sessionsPerWeek: { ar: "ضمن حصص البرنامج المسجَّل فيه اللاعب", en: "Within the sessions of the athlete's enrolled program" },
    sessionDuration: { ar: "يُحدَّد يوم الاختبار", en: "Set on the day of testing" },
    curriculum: [
      { ar: "متطلبات تقنية محددة لكل حزام", en: "Specific technical requirements for each belt" },
      { ar: "اختبار كاتا وكوميتيه بحسب المستوى", en: "Kata and Kumite testing appropriate to the level" },
      { ar: "تقييم الانضباط والحضور والالتزام", en: "Evaluation of discipline, attendance and commitment" },
    ],
    requirements: [
      { ar: "استيفاء الحد الأدنى من الحضور قبل التقديم للاختبار", en: "Meeting the minimum attendance requirement before testing" },
    ],
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
// the style, not academy-specific claims).
export const beltRanks: BeltRank[] = [
  { name: { ar: "الحزام الأبيض", en: "White Belt" }, colorHex: "#F2EFE8" },
  { name: { ar: "الحزام الأزرق", en: "Blue Belt" }, colorHex: "#2452A6" },
  { name: { ar: "الحزام الأصفر", en: "Yellow Belt" }, colorHex: "#D8B84A" },
  { name: { ar: "الحزام البرتقالي", en: "Orange Belt" }, colorHex: "#C9622A" },
  { name: { ar: "الحزام الأخضر", en: "Green Belt" }, colorHex: "#3E6B3A" },
  { name: { ar: "الحزام البني", en: "Brown Belt" }, colorHex: "#5A3A24" },
  { name: { ar: "الحزام الأسود", en: "Black Belt" }, colorHex: "#111111" },
];
