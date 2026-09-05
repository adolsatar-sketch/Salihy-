/**
 * The five stops the background walks through as the page scrolls
 * 0% -> 100%: near-black, black with a faint rust cast, charcoal with a
 * dark red glow at the midpoint, deep rust, then gradually back to black.
 * Framer Motion's useTransform natively interpolates between color
 * strings, so these feed directly into a useScroll()/useTransform() pair
 * — see AmbientBackground.tsx — for a genuinely continuous mix between
 * stops, not a per-section snap.
 */
export const SCROLL_COLOR_STOPS = ["#050505", "#1a0a0a", "#241010", "#180a0c", "#050505"] as const;
export const SCROLL_COLOR_OFFSETS = [0, 0.25, 0.5, 0.75, 1] as const;
