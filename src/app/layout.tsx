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
  if (seg === 'en') {
    document.documentElement.lang = 'en';
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
        {children}
      </body>
    </html>
  );
}
