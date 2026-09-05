import type { Bi } from "@/lib/utils";

// The academy's confirmed Study + Training program for primary-school
// members. Every string here is verbatim/direct from the academy owner —
// no subjects, teachers, schedule, or fees are invented. `image` stays
// optional and unset until a real photo of this program is provided; the
// section renders fully typographic until then.
export const studyProgramCopy: {
  eyebrow: Bi;
  chapterTitle: Bi;
  headline: Bi;
  supportingLine: Bi;
  body: Bi;
  closingLine: Bi;
  image?: string;
} = {
  eyebrow: { ar: "الدراسة والتدريب", en: "STUDY + TRAINING", tr: "EĞİTİM + ANTRENMAN" },
  chapterTitle: { ar: "مساران. مستقبل واحد.", en: "TWO PATHS. ONE FUTURE.", tr: "İKİ YOL. TEK GELECEK." },
  headline: {
    ar: "الدراسة لا تتوقف عند باب الأكاديمية.",
    en: "Education does not stop at the academy door.",
    tr: "Eğitim, akademinin kapısında durmaz.",
  },
  supportingLine: {
    ar: "عقلٌ يتقدّم. جسدٌ ينضبط.",
    en: "A focused mind. A disciplined body.",
    tr: "Gelişen bir zihin. Disiplinli bir beden.",
  },
  body: {
    ar: "في أكاديمية صالحي، لا يحتاج المشترك أن يختار بين دراسته وتدريبه. برنامج مخصص لطلبة المرحلة الابتدائية، من الصف الأول إلى الصف السادس، يساعدهم على متابعة وإكمال الدراسة الخاصة بالمدرسة بالتوازي مع تدريب الكيوكوشنكاي، حتى يبقى مستواهم الدراسي حاضراً إلى جانب تطورهم الرياضي.",
    en: "At Salihy Academy, members do not have to choose between education and training. This program supports primary school students from Grade 1 through Grade 6 in following and completing their school studies alongside Kyokushinkai training, helping them maintain their academic level while continuing their athletic development.",
    tr: "Salihy Akademisi'nde öğrenciler eğitimleri ile antrenmanları arasında seçim yapmak zorunda kalmaz. Bu program, 1. sınıftan 6. sınıfa kadar olan ilkokul öğrencilerinin okul çalışmalarını takip edip tamamlamalarına ve aynı zamanda Kyokushinkai antrenmanlarına devam etmelerine yardımcı olur.",
  },
  closingLine: {
    ar: "يُكمل دراسته. يبدأ تدريبه. ويتقدم في المسارين.",
    en: "Complete the lesson. Begin the training. Move forward in both.",
    tr: "Dersini tamamla. Antrenmanına başla. İkisinde de ilerle.",
  },
};

export type StudyPathItemKey = "study" | "training" | "balance";

export type StudyPathItem = {
  key: StudyPathItemKey;
  label: Bi;
  description: Bi;
};

export const studyPathItems: StudyPathItem[] = [
  {
    key: "study",
    label: { ar: "الدراسة", en: "STUDY", tr: "EĞİTİM" },
    description: {
      ar: "متابعة وإكمال الدراسة المطلوبة من المدرسة.",
      en: "Following and completing school studies.",
      tr: "Okul çalışmalarını takip etmek ve tamamlamak.",
    },
  },
  {
    key: "training",
    label: { ar: "التدريب", en: "TRAINING", tr: "ANTRENMAN" },
    description: {
      ar: "مواصلة تدريب الكيوكوشنكاي داخل الأكاديمية.",
      en: "Continuing Kyokushinkai training at the academy.",
      tr: "Akademide Kyokushinkai antrenmanlarına devam etmek.",
    },
  },
  {
    key: "balance",
    label: { ar: "التوازن", en: "BALANCE", tr: "DENGE" },
    description: {
      ar: "الجمع بين الالتزام الدراسي والانضباط الرياضي في مكان واحد.",
      en: "Bringing academic commitment and athletic discipline together.",
      tr: "Eğitim sorumluluğunu ve sportif disiplini bir araya getirmek.",
    },
  },
];

export type StudyGrade = {
  number: string;
  label: Bi;
};

// The six confirmed primary grades this program covers — nothing beyond
// what the academy stated (no subjects, no age numbers).
export const studyGrades: StudyGrade[] = [
  { number: "01", label: { ar: "الأول الابتدائي", en: "Grade 1", tr: "1. Sınıf" } },
  { number: "02", label: { ar: "الثاني الابتدائي", en: "Grade 2", tr: "2. Sınıf" } },
  { number: "03", label: { ar: "الثالث الابتدائي", en: "Grade 3", tr: "3. Sınıf" } },
  { number: "04", label: { ar: "الرابع الابتدائي", en: "Grade 4", tr: "4. Sınıf" } },
  { number: "05", label: { ar: "الخامس الابتدائي", en: "Grade 5", tr: "5. Sınıf" } },
  { number: "06", label: { ar: "السادس الابتدائي", en: "Grade 6", tr: "6. Sınıf" } },
];
