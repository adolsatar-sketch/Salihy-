// Global, single-source-of-truth constants for the whole site.
// Edit this file to update contact details site-wide.

export const SITE_URL = "https://salihy-kyokushin.academy";

// TODO: replace with the academy's real WhatsApp number (international format, no spaces or symbols)
// before launch. Every WhatsApp link and button on the site reads from this single constant.
export const WHATSAPP_NUMBER = "9647700000000";

export const INSTAGRAM_URL = "https://www.instagram.com/salihy_kyokushin_academy/";

export function buildWhatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
