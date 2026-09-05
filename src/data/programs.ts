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
    title: { ar: "برنامج الأطفال", en: "Kids Program", tr: "Çocuk Programı" },
    shortTitle: { ar: "الأطفال", en: "Kids", tr: "Çocuklar" },
    heroImage: "/assets/gallery/gallery-06.jpg",
    heroImageAlt: {
      ar: "طفل يقف على منصة التتويج حاملاً ميدالية ذهبية بين لاعبين بالغين",
      en: "A child standing on the podium holding a gold medal among adult athletes",
      tr: "Yetişkin sporcuların arasında podyumda altın madalya tutan bir çocuk",
    },
    summary: {
      ar: "أولى خطوات الانضباط والثقة، بأسلوب آمن وممتع يبني الجسد والشخصية معًا.",
      en: "The first steps of discipline and confidence — a safe, engaging way to build both body and character.",
      tr: "Disiplin ve özgüvenin ilk adımları — hem bedeni hem karakteri birlikte inşa eden güvenli ve keyifli bir yöntem.",
    },
    audience: {
      ar: "لكل طفل يحتاج إلى مساحة آمنة لبناء الثقة، التركيز، واحترام القواعد.",
      en: "For every child who needs a safe space to build confidence, focus, and respect for rules.",
      tr: "Özgüven, odaklanma ve kurallara saygı geliştirmek için güvenli bir alana ihtiyaç duyan her çocuk için.",
    },
  },
  {
    slug: "youth",
    title: { ar: "برنامج الناشئين والشباب", en: "Youth Program", tr: "Gençlik Programı" },
    shortTitle: { ar: "الناشئون والشباب", en: "Youth", tr: "Gençlik" },
    heroImage: "/assets/gallery/gallery-09.jpg",
    heroImageAlt: {
      ar: "لاعبان شابان يتدربان معًا على حركة رفع الركبة داخل الصالة",
      en: "Two young athletes practicing a knee-raise drill together inside the training hall",
      tr: "Antrenman salonunda iki genç sporcunun birlikte diz kaldırma egzersizi yapması",
    },
    summary: {
      ar: "المرحلة التي تتحول فيها الأساسيات إلى مهارة حقيقية، واللياقة إلى قوة قتالية.",
      en: "The stage where fundamentals become real skill, and fitness becomes fighting strength.",
      tr: "Temellerin gerçek beceriye, fiziksel uygunluğun ise mücadele gücüne dönüştüğü aşama.",
    },
    audience: {
      ar: "لمن أنهى المرحلة التأسيسية ويريد تطوير مهاراته القتالية بجدية أكبر.",
      en: "For those who've completed the foundational stage and want to sharpen their fighting skills more seriously.",
      tr: "Temel aşamayı tamamlamış ve mücadele becerilerini daha ciddi bir şekilde geliştirmek isteyenler için.",
    },
  },
  {
    slug: "adults",
    title: { ar: "برنامج البالغين", en: "Adults Program", tr: "Yetişkin Programı" },
    shortTitle: { ar: "البالغون", en: "Adults", tr: "Yetişkinler" },
    heroImage: "/assets/gallery/gallery-03.jpg",
    heroImageAlt: {
      ar: "لاعب بالغ ينفذ ركلة عالية أثناء التدريب الحر",
      en: "An adult athlete executing a high kick during free sparring",
      tr: "Serbest idman sırasında yüksek tekme atan yetişkin bir sporcu",
    },
    summary: {
      ar: "تدريب قتالي حقيقي بمعايير احترافية، لمن يريد اللياقة والقوة والانضباط في آنٍ واحد.",
      en: "Real combat training at a professional standard — for those seeking fitness, strength and discipline together.",
      tr: "Profesyonel standartlarda gerçek mücadele antrenmanı — fitness, güç ve disiplini bir arada arayanlar için.",
    },
    audience: {
      ar: "للرجال الراغبين في خوض تجربة كيوكوشنكاي كاملة، من اللياقة إلى القتال التنافسي.",
      en: "For men seeking the full Kyokushin experience — from fitness to competitive fighting.",
      tr: "Fitness'tan rekabetçi mücadeleye kadar tam bir Kyokushin deneyimi arayan erkekler için.",
    },
  },
  {
    slug: "women",
    title: { ar: "برنامج النساء", en: "Women's Program", tr: "Kadın Programı" },
    shortTitle: { ar: "النساء", en: "Women", tr: "Kadınlar" },
    heroImage: "/assets/gallery/gallery-01.jpg",
    heroImageAlt: {
      ar: "أجواء صالة تدريب الكيوكوشنكاي داخل الأكاديمية",
      en: "The atmosphere of the academy's Kyokushin training hall",
      tr: "Akademinin Kyokushin antrenman salonunun atmosferi",
    },
    summary: {
      ar: "مساحة تدريب خاصة تجمع اللياقة، الدفاع عن النفس، والثقة، في بيئة محترمة ومنظّمة.",
      en: "A dedicated training space combining fitness, self-defense and confidence in a respectful, structured environment.",
      tr: "Fitness, kendini savunma ve özgüveni saygılı ve düzenli bir ortamda bir araya getiren özel bir antrenman alanı.",
    },
    audience: {
      ar: "لكل امرأة تبحث عن رياضة قتالية جادة تبني الجسد والثقة والقدرة على حماية النفس.",
      en: "For every woman seeking a serious combat sport that builds the body, confidence, and the ability to protect herself.",
      tr: "Bedeni, özgüveni ve kendini koruma becerisini geliştiren ciddi bir mücadele sporu arayan her kadın için.",
    },
  },
  {
    slug: "competition-team",
    title: { ar: "فريق البطولات", en: "Competition Team", tr: "Turnuva Takımı" },
    shortTitle: { ar: "فريق البطولات", en: "Competition Team", tr: "Turnuva Takımı" },
    heroImage: "/assets/gallery/gallery-08.jpg",
    heroImageAlt: {
      ar: "فريق لاعبين يقفون بجانب أربع كؤوس بطولة يرتدون ميدالياتهم",
      en: "A team of athletes standing beside four championship trophies wearing their medals",
      tr: "Madalyalarını takmış bir sporcu takımının dört şampiyonluk kupasının yanında durması",
    },
    summary: {
      ar: "المسار التنافسي المكثّف لمن أثبت جاهزيته لتمثيل الأكاديمية على المنصات المحلية والدولية.",
      en: "The intensive competitive track for those who've proven readiness to represent the academy on local and international podiums.",
      tr: "Akademiyi yerel ve uluslararası podyumlarda temsil etmeye hazır olduğunu kanıtlayanlar için yoğun rekabet yolu.",
    },
    audience: {
      ar: "للاعبين الذين اجتازوا المستويات التأسيسية وأظهروا الجاهزية البدنية والذهنية للمنافسة.",
      en: "For athletes who've passed foundational levels and shown the physical and mental readiness to compete.",
      tr: "Temel seviyeleri geçmiş ve rekabet için fiziksel ve zihinsel hazırlığını göstermiş sporcular için.",
    },
  },
  {
    slug: "study-sport",
    title: { ar: "برنامج الدراسة والتدريب", en: "Study & Training Program", tr: "Eğitim ve Antrenman Programı" },
    shortTitle: { ar: "الدراسة والتدريب", en: "Study & Training", tr: "Eğitim ve Antrenman" },
    heroImage: "/assets/gallery/gallery-09.jpg",
    heroImageAlt: {
      ar: "لاعبان شابان يتدربان على الانضباط والتركيز الحركي",
      en: "Two young athletes training on discipline and focused movement",
      tr: "Disiplin ve odaklanmış hareket üzerine antrenman yapan iki genç sporcu",
    },
    summary: {
      ar: "لا يحتاج المشترك أن يختار بين دراسته وتدريبه. مساران يتقدّمان معًا.",
      en: "Members don't have to choose between their education and their training. Two paths, moving forward together.",
      tr: "Öğrenciler eğitimleri ile antrenmanları arasında seçim yapmak zorunda kalmaz. İki yol, birlikte ilerler.",
    },
    audience: {
      ar: "لطلبة المرحلة الابتدائية من الصف الأول إلى الصف السادس، لمتابعة وإكمال الدراسة المدرسية بالتوازي مع تدريب الكيوكوشنكاي.",
      en: "For primary school students from Grade 1 through Grade 6, to follow and complete their schoolwork alongside Kyokushin training.",
      tr: "1. sınıftan 6. sınıfa kadar ilkokul öğrencileri için; okul çalışmalarını Kyokushin antrenmanıyla birlikte takip edip tamamlamak amacıyla.",
    },
    goals: [
      {
        ar: "الدراسة — متابعة وإكمال الدراسة المطلوبة من المدرسة.",
        en: "Study — Following and completing school studies.",
        tr: "Eğitim — Okul çalışmalarını takip etmek ve tamamlamak.",
      },
      {
        ar: "التدريب — مواصلة تدريب الكيوكوشنكاي داخل الأكاديمية.",
        en: "Training — Continuing Kyokushinkai training at the academy.",
        tr: "Antrenman — Akademide Kyokushinkai antrenmanlarına devam etmek.",
      },
      {
        ar: "التوازن — الجمع بين الالتزام الدراسي والانضباط الرياضي في مكان واحد.",
        en: "Balance — Bringing academic commitment and athletic discipline together.",
        tr: "Denge — Eğitim sorumluluğunu ve sportif disiplini bir araya getirmek.",
      },
    ],
  },
  {
    slug: "training-system",
    title: { ar: "نظام التدريب", en: "Training System", tr: "Antrenman Sistemi" },
    shortTitle: { ar: "نظام التدريب", en: "Training System", tr: "Antrenman Sistemi" },
    heroImage: "/assets/gallery/gallery-10.jpg",
    heroImageAlt: {
      ar: "لاعب ينفذ ركلة أمامية قوية داخل صالة بطولة",
      en: "An athlete delivering a powerful front kick inside a tournament hall",
      tr: "Bir turnuva salonunda güçlü bir ön tekme vuran sporcu",
    },
    summary: {
      ar: "منهجية واحدة تحكم كل برامج الأكاديمية: أساس تقني صلب، إعداد بدني متدرج، وانضباط لا يتزحزح.",
      en: "One methodology governs every academy program: a solid technical base, progressive conditioning, and unwavering discipline.",
      tr: "Akademinin tüm programlarına tek bir metodoloji hâkimdir: sağlam bir teknik temel, kademeli kondisyon ve sarsılmaz disiplin.",
    },
    audience: {
      ar: "الإطار الذي تُبنى عليه جميع البرامج، من الأطفال إلى فريق البطولات.",
      en: "The framework underlying every program, from kids to the competition team.",
      tr: "Çocuklardan turnuva takımına kadar tüm programların temelini oluşturan çerçeve.",
    },
    isInformational: true,
  },
  {
    slug: "belt-journey",
    title: { ar: "رحلة الأحزمة", en: "Belt Journey", tr: "Kuşak Yolculuğu" },
    shortTitle: { ar: "رحلة الأحزمة", en: "Belt Journey", tr: "Kuşak Yolculuğu" },
    heroImage: "/assets/gallery/gallery-01.jpg",
    heroImageAlt: {
      ar: "لاعب راكع بحزام أسود بانتظار نتيجة المباراة",
      en: "An athlete kneeling in a black belt awaiting the match result",
      tr: "Maç sonucunu bekleyen, siyah kuşaklı diz çökmüş bir sporcu",
    },
    summary: {
      ar: "كل حزام محطة، وكل محطة اختبار حقيقي للمهارة والانضباط والصبر.",
      en: "Every belt is a milestone, and every milestone is a real test of skill, discipline and patience.",
      tr: "Her kuşak bir dönüm noktasıdır ve her dönüm noktası beceri, disiplin ve sabrın gerçek bir sınavıdır.",
    },
    audience: {
      ar: "مسار تدرّج الأحزمة المتّبع في نظام الكيوكوشنكاي العالمي، من الحزام الأبيض إلى الأسود.",
      en: "The belt progression followed within the global Kyokushin system, from white belt to black.",
      tr: "Beyaz kuşaktan siyah kuşağa kadar, küresel Kyokushin sisteminde izlenen kuşak ilerleme yolu.",
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
  { name: { ar: "الحزام الأبيض", en: "White Belt", tr: "Beyaz Kuşak" }, colorHex: "#F2EFE8" },
  { name: { ar: "الحزام الأزرق", en: "Blue Belt", tr: "Mavi Kuşak" }, colorHex: "#2452A6" },
  { name: { ar: "الحزام الأصفر", en: "Yellow Belt", tr: "Sarı Kuşak" }, colorHex: "#D8B84A" },
  { name: { ar: "الحزام البرتقالي", en: "Orange Belt", tr: "Turuncu Kuşak" }, colorHex: "#C9622A" },
  { name: { ar: "الحزام الأخضر", en: "Green Belt", tr: "Yeşil Kuşak" }, colorHex: "#3E6B3A" },
  { name: { ar: "الحزام البني", en: "Brown Belt", tr: "Kahverengi Kuşak" }, colorHex: "#5A3A24" },
  { name: { ar: "الحزام الأسود", en: "Black Belt", tr: "Siyah Kuşak" }, colorHex: "#111111" },
];
