import type { Bi } from "@/lib/utils";

export type FaqItem = {
  question: Bi;
  answer: Bi;
};

// Answers avoid any specific age range, schedule, or day/hour claim that
// hasn't been confirmed by the academy — see CONTENT_NEEDED.md for what's
// still needed to fill those in properly.
export const faqItems: FaqItem[] = [
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
      ar: "يمكنك تعبئة نموذج التسجيل من صفحة التسجيل، أو التواصل معنا مباشرة لتحديد موعد الحصة التجريبية.",
      en: "You can fill out the form on the Registration page, or reach out to us directly to schedule your trial class.",
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
      ar: "أين تقع الأكاديمية؟",
      en: "Where is the academy located?",
    },
    answer: {
      ar: "تقع الأكاديمية في بغداد – الصليخ – شارع الـ600 – مقابل الكوخ. راجع صفحة التواصل والموقع للتفاصيل والخريطة.",
      en: "The academy is located in Baghdad – Al-Sulaikh – 600 Street – opposite Al-Koukh. See the Contact & Location page for details and the map.",
    },
  },
];
