import type { Locale } from "./config";

export type Dictionary = {
  meta: { siteName: string };
  nav: {
    home: string;
    coach: string;
    legacy: string;
    achievements: string;
    academy: string;
    programs: string;
    champions: string;
    gallery: string;
    videos: string;
    news: string;
    faq: string;
    registration: string;
    contact: string;
    menu: string;
    close: string;
    language: string;
  };
  programsNav: {
    kids: string;
    youth: string;
    adults: string;
    women: string;
    competitionTeam: string;
    studySport: string;
    trainingSystem: string;
    beltJourney: string;
  };
  common: {
    exploreJourney: string;
    bookTrial: string;
    whatsappContact: string;
    readMore: string;
    viewAll: string;
    register: string;
    backToTop: string;
    skipIntro: string;
    loading: string;
    scrollDown: string;
    close: string;
    next: string;
    previous: string;
    all: string;
    year: string;
    location: string;
    category: string;
    result: string;
    individual: string;
    team: string;
    gold: string;
    silver: string;
    bronze: string;
    insideIraq: string;
    outsideIraq: string;
    coachAchievement: string;
    studentAchievement: string;
    addressLabel: string;
    hoursLabel: string;
    scheduleLabel: string;
    sendWhatsapp: string;
    formSuccessTitle: string;
    formSuccessBody: string;
    required: string;
    notFoundTitle: string;
    notFoundBody: string;
    backHome: string;
    errorTitle: string;
    errorBody: string;
    tryAgain: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ar: {
    meta: {
      siteName: "أكاديمية صالحي للكيوكوشنكاي",
    },
    nav: {
      home: "الرئيسية",
      coach: "المدرب",
      legacy: "المسيرة",
      achievements: "الإنجازات",
      academy: "الأكاديمية",
      programs: "البرامج",
      champions: "الأبطال",
      gallery: "الصور",
      videos: "الفيديوهات",
      news: "الأخبار",
      faq: "الأسئلة الشائعة",
      registration: "التسجيل",
      contact: "التواصل",
      menu: "القائمة",
      close: "إغلاق",
      language: "EN",
    },
    programsNav: {
      kids: "الأطفال",
      youth: "الناشئون والشباب",
      adults: "البالغون",
      women: "النساء",
      competitionTeam: "فريق البطولات",
      studySport: "الدراسة والرياضة",
      trainingSystem: "نظام التدريب",
      beltJourney: "رحلة الأحزمة",
    },
    common: {
      exploreJourney: "اكتشف الرحلة",
      bookTrial: "احجز حصة تجريبية",
      whatsappContact: "تواصل عبر واتساب",
      readMore: "اقرأ المزيد",
      viewAll: "عرض الكل",
      register: "سجّل الآن",
      backToTop: "العودة للأعلى",
      skipIntro: "تخطي المقدمة",
      loading: "جارٍ التحميل",
      scrollDown: "مرّر للأسفل",
      close: "إغلاق",
      next: "التالي",
      previous: "السابق",
      all: "الكل",
      year: "السنة",
      location: "المكان",
      category: "الفئة",
      result: "المركز",
      individual: "فردي",
      team: "فريق",
      gold: "ذهبية",
      silver: "فضية",
      bronze: "برونزية",
      insideIraq: "داخل العراق",
      outsideIraq: "خارج العراق",
      coachAchievement: "بطولة المدرب",
      studentAchievement: "بطولة الطلاب",
      addressLabel: "العنوان",
      hoursLabel: "أوقات التواجد",
      scheduleLabel: "جدول التدريب",
      sendWhatsapp: "إرسال عبر واتساب",
      formSuccessTitle: "تم استلام طلبك",
      formSuccessBody:
        "شكرًا لك. تم تجهيز رسالتك، أرسلها عبر واتساب لإتمام التسجيل وسيتواصل معك فريق الأكاديمية.",
      required: "هذا الحقل مطلوب",
      notFoundTitle: "الصفحة غير موجودة",
      notFoundBody: "يبدو أن هذا المسار خرج عن الحلبة. عد إلى الرئيسية لمتابعة الرحلة.",
      backHome: "العودة إلى الرئيسية",
      errorTitle: "حدث خطأ غير متوقع",
      errorBody: "واجهنا عائقًا مؤقتًا. حاول مرة أخرى أو عد إلى الرئيسية.",
      tryAgain: "حاول مرة أخرى",
    },
  },
  en: {
    meta: {
      siteName: "Salihy Kyokushin Academy",
    },
    nav: {
      home: "Home",
      coach: "The Coach",
      legacy: "Legacy",
      achievements: "Achievements",
      academy: "The Academy",
      programs: "Programs",
      champions: "Champions",
      gallery: "Gallery",
      videos: "Videos",
      news: "News",
      faq: "FAQ",
      registration: "Registration",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
      language: "AR",
    },
    programsNav: {
      kids: "Kids",
      youth: "Youth",
      adults: "Adults",
      women: "Women",
      competitionTeam: "Competition Team",
      studySport: "Study & Sport",
      trainingSystem: "Training System",
      beltJourney: "Belt Journey",
    },
    common: {
      exploreJourney: "Explore the Journey",
      bookTrial: "Book a Trial Class",
      whatsappContact: "Contact via WhatsApp",
      readMore: "Read More",
      viewAll: "View All",
      register: "Register Now",
      backToTop: "Back to top",
      skipIntro: "Skip Intro",
      loading: "Loading",
      scrollDown: "Scroll",
      close: "Close",
      next: "Next",
      previous: "Previous",
      all: "All",
      year: "Year",
      location: "Location",
      category: "Category",
      result: "Result",
      individual: "Individual",
      team: "Team",
      gold: "Gold",
      silver: "Silver",
      bronze: "Bronze",
      insideIraq: "Inside Iraq",
      outsideIraq: "Outside Iraq",
      coachAchievement: "Coach's Achievement",
      studentAchievement: "Student's Achievement",
      addressLabel: "Address",
      hoursLabel: "Hours",
      scheduleLabel: "Training Schedule",
      sendWhatsapp: "Send via WhatsApp",
      formSuccessTitle: "Your request is ready",
      formSuccessBody:
        "Thank you. Your message has been prepared — send it via WhatsApp to complete your registration and our team will get back to you.",
      required: "This field is required",
      notFoundTitle: "Page not found",
      notFoundBody: "This path stepped outside the ring. Head back home to continue the journey.",
      backHome: "Back to Home",
      errorTitle: "Something went wrong",
      errorBody: "We hit a temporary obstacle. Try again or return home.",
      tryAgain: "Try Again",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
