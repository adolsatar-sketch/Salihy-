import type Lenis from "lenis";

// A tiny escape hatch so components outside SmoothScrollProvider (the menu,
// modals) can pause/resume the single shared Lenis instance instead of
// fighting it with `document.body.style.overflow`. Locking scroll via
// `overflow: hidden` while Lenis is also driving `window.scrollTo` on every
// animation frame confuses Lenis's internal scroll-limit accounting and was
// observed resetting its target back near 0 — `lenis.stop()`/`start()` is
// the library's own supported way to pause it instead.
let current: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  current = instance;
}

export function stopLenisScroll() {
  current?.stop();
}

export function startLenisScroll() {
  current?.start();
}

export function hasLenisInstance() {
  return current !== null;
}
