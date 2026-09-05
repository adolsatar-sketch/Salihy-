import type { Bi } from "@/lib/utils";

export type FaqItem = {
  question: Bi;
  answer: Bi;
};

export const faqItems: FaqItem[] = [
  {
    question: {
      ar: "ما هو الحد الأدنى للعمر للانضمام إلى الأكاديمية؟",
      en: "What is the minimum age to join the academy?",
    },
    answer: {
      ar: "يبدأ برنامج الأطفال من سن السادسة، مع برامج مخصصة لكل مرحلة عمرية حتى البالغين. تواصل معنا لمعرفة البرنامج الأنسب لعمر طفلك.",
      en: "The Kids Program starts at age six, with dedicated programs for every stage up to adults. Contact us to find the right fit for your child's age.",
    },
  },
  {
    question: {
      ar: "هل أحتاج إلى خبرة سابقة في فنون القتال؟",
      en: "Do I need previous martial arts experience?",
    },
    answer: {
      ar: "لا. معظم برامجنا مصممة لتستقبل المبتدئين تمامًا، ويُبنى المستوى تدريجيًا تحت إشراف مباشر من المدرب.",
      en: "No. Most of our programs are designed for complete beginners, with your level built progressively under the coach's direct supervision.",
    },
  },
  {
    question: {
      ar: "كيف يمكنني حجز حصة تجريبية؟",
      en: "How can I book a trial class?",
    },
    answer: {
      ar: "يمكنك تعبئة نموذج التسجيل من صفحة التسجيل، أو التواصل مباشرة عبر واتساب وسيتم تحديد موعد الحصة التجريبية معك.",
      en: "You can fill out the form on the Registration page, or reach out directly via WhatsApp to schedule your trial class.",
    },
  },
  {
    question: {
      ar: "هل توجد حصص مخصصة للنساء؟",
      en: "Are there dedicated classes for women?",
    },
    answer: {
      ar: "نعم، تتوفر حصص مخصصة للنساء ضمن بيئة تدريب محترمة ومنظّمة. راجع صفحة برنامج النساء لمزيد من التفاصيل.",
      en: "Yes, dedicated women's classes are available in a respectful, structured environment. See the Women's Program page for more details.",
    },
  },
  {
    question: {
      ar: "ما هو الزي والمعدات المطلوبة للبدء؟",
      en: "What uniform or gear do I need to start?",
    },
    answer: {
      ar: "يكفي حضور ملابس رياضية مريحة للحصة الأولى. بعد التسجيل، يوجَّه كل طالب لتوفير زي التدريب (الكيوغي) المناسب لمستواه.",
      en: "Comfortable athletic wear is enough for your first class. After enrolling, each student is guided to get the appropriate training uniform (gi) for their level.",
    },
  },
  {
    question: {
      ar: "متى تُقام اختبارات ترقية الأحزمة؟",
      en: "When are belt promotion tests held?",
    },
    answer: {
      ar: "تُحدَّد اختبارات الأحزمة دوريًا وفق تقييم المدرب لجاهزية كل طالب. راجع صفحة رحلة الأحزمة للاطلاع على المسار الكامل.",
      en: "Belt tests are scheduled periodically based on the coach's assessment of each student's readiness. See the Belt Journey page for the full path.",
    },
  },
  {
    question: {
      ar: "أين تقع الأكاديمية وما هي أيام التدريب؟",
      en: "Where is the academy located and what are the training days?",
    },
    answer: {
      ar: "تقع الأكاديمية في بغداد – الصليخ – شارع الـ600 – مقابل الكوخ. التدريب متاح أيام السبت والاثنين والأربعاء. راجع صفحة التواصل والموقع للتفاصيل والخريطة.",
      en: "The academy is located in Baghdad – Al-Sulaikh – 600 Street – opposite Al-Koukh. Training runs on Saturdays, Mondays and Wednesdays. See the Contact & Location page for details and the map.",
    },
  },
  {
    question: {
      ar: "هل يشارك طلاب الأكاديمية في بطولات فعلية؟",
      en: "Do academy students compete in real tournaments?",
    },
    answer: {
      ar: "نعم، لدى الأكاديمية مسار واضح من التدريب الأساسي إلى فريق البطولات، بمشاركات محلية ودولية موثقة في صفحة الإنجازات.",
      en: "Yes, the academy has a clear path from foundational training to the Competition Team, with local and international appearances documented on the Achievements page.",
    },
  },
];
