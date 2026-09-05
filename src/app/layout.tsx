import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://salihy-kyokushin.academy"),
  title: {
    default: "Salihy Kyokushin Academy",
    template: "%s | Salihy Kyokushin Academy",
  },
};

// Runs before hydration so the intro overlay (or its absence) never flashes.
const introBootScript = `
try {
  var seen = sessionStorage.getItem('salihy-intro-seen');
  document.documentElement.dataset.intro = seen ? 'done' : 'pending';
} catch (e) {
  document.documentElement.dataset.intro = 'done';
}
try {
  var seg = window.location.pathname.split('/')[1];
  if (seg === 'en' || seg === 'tr') {
    document.documentElement.lang = seg;
    document.documentElement.dir = 'ltr';
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body className={`${fontVariables} bg-obsidian text-bone antialiased`}>
        {/* Guarantees the logo is on screen from the very first paint, even
            before React hydrates — the intro's own animated version
            (shimmer, wordmark, skip button) is entirely JS-driven and
            can't render until hydration completes, which on a slow
            connection could otherwise leave a genuinely blank black
            screen for a real, visible stretch of time. Pure HTML/CSS,
            hidden the instant data-intro flips to "done" (by the boot
            script above for returning visitors, or by IntroSplash once it
            finishes) — and force-hidden by pure CSS after 2.3s regardless,
            so it can never outlive the real intro or hang if JS fails. */}
        <div id="intro-static" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- must render in the raw server HTML with zero JS/next/image machinery, guaranteed visible at first paint */}
          <img src="/assets/logo/logo-full.png" alt="" />
        </div>
        {children}
      </body>
    </html>
  );
}
