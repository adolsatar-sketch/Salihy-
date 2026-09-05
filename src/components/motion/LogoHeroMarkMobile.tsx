/**
 * Mobile hero logo — deliberately not LogoHeroMark. That component's
 * SVG-mask/pointer-tracked motion is JS-driven and, on some iOS in-app
 * browsers (WhatsApp/Instagram's WKWebView included), can end up
 * permanently invisible if the JS that's supposed to reveal it never runs
 * cleanly. This renders the same logo asset as a plain, eagerly-loaded
 * `<img>`, visible from the very first paint, animated with CSS keyframes
 * only (see hero-mobile-* in globals.css) — motion never depends on
 * React, Framer Motion, IntersectionObserver, or hover/pointer state.
 */
export function LogoHeroMarkMobile({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative mx-auto w-[78vw] max-w-[360px]">
        <div
          aria-hidden="true"
          className="hero-mobile-logo-glow absolute inset-[-20%] rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--color-active) 55%, transparent) 0%, transparent 70%)" }}
        />
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- plain <img>, must never be gated behind next/image lazy-loading or JS */}
          <img
            src="/assets/logo/logo-full.png"
            alt=""
            className="hero-mobile-logo-img relative z-10 h-auto w-full"
            style={{ opacity: 1, visibility: "visible", transform: "none" }}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          <div
            aria-hidden="true"
            className="hero-mobile-logo-sweep pointer-events-none absolute inset-y-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-bone/30 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
