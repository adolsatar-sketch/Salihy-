import { buildWhatsappLink, WHATSAPP_ENABLED } from "@/data/site";
import type { Locale } from "@/i18n/config";

export function WhatsAppButton({ locale }: { locale: Locale }) {
  if (!WHATSAPP_ENABLED) return null;

  const message =
    locale === "ar"
      ? "السلام عليكم، أود الاستفسار عن التسجيل في أكاديمية صالحي."
      : "Hello, I'd like to ask about registering at Salihy Academy.";

  return (
    <a
      href={buildWhatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={locale === "ar" ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
      data-cursor-hover
      className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-active text-bone shadow-[0_8px_30px_rgba(178,15,32,0.45)] transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4.02 8.38 4.02 15c0 2.22.6 4.3 1.65 6.09L4 29l8.12-1.62A11.94 11.94 0 0 0 16.02 27C22.65 27 28 21.62 28 15S22.65 3 16.02 3Zm0 21.8a9.7 9.7 0 0 1-4.95-1.36l-.35-.21-4.82.96.98-4.7-.23-.36A9.75 9.75 0 1 1 25.78 15 9.78 9.78 0 0 1 16.02 24.8Zm5.35-7.3c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.94-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.17-.24-.57-.48-.5-.66-.5-.17 0-.37-.02-.56-.02-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.06 3.14 5 4.4.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34Z" />
      </svg>
    </a>
  );
}
