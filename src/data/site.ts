// Global, single-source-of-truth constants for the whole site.
// Edit this file to update contact details site-wide.

export const SITE_URL = "https://salihy-kyokushin.academy";

// Set this to the academy's real WhatsApp number (international format, no
// spaces or symbols) to switch every WhatsApp link/button on the site on.
// Left null on purpose: showing a fake number in production is worse than
// showing no WhatsApp entry point at all. Every place that would normally
// offer WhatsApp falls back to Instagram while this stays null.
export const WHATSAPP_NUMBER: string | null = null;

export const WHATSAPP_ENABLED = Boolean(WHATSAPP_NUMBER);

export const INSTAGRAM_URL = "https://www.instagram.com/salihy_kyokushin_academy/";

export function buildWhatsappLink(message: string): string {
  if (!WHATSAPP_NUMBER) return INSTAGRAM_URL;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
