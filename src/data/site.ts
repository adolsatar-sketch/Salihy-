// Global, single-source-of-truth constants for the whole site.
// Edit this file to update contact details site-wide.

export const SITE_URL = "https://salihy-kyokushin.academy";

// No real WhatsApp number has been provided yet. Keep this `null` — never
// a placeholder/example number — until the academy gives a real one; every
// WhatsApp link/button on the site reads WHATSAPP_ENABLED and hides itself
// entirely while this stays null. See CONTENT_NEEDED.md.
export const WHATSAPP_NUMBER: string | null = null;
export const WHATSAPP_ENABLED = Boolean(WHATSAPP_NUMBER);

export const INSTAGRAM_URL = "https://www.instagram.com/salihy_kyokushin_academy/";

export const WAZE_URL = "https://waze.com/ul/hsvztcz6b9";

export function buildWhatsappLink(message: string): string {
  if (!WHATSAPP_NUMBER) return INSTAGRAM_URL;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
