# Salihy Kyokushin Academy — Website

A bilingual (Arabic RTL / English LTR), multi-page Next.js site for Salihy
Kyokushin Academy in Baghdad: the coach's story, the academy's achievements
and programs, a champions archive, a photo gallery, registration, and
contact — built as one continuous cinematic experience rather than a
generic sports-club template.

## Tech stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** for styling and design tokens
- **Framer Motion** for scroll reveals and the page-transition system
- No external CMS — all content lives in typed data files under `src/data/`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to the
Arabic homepage at `/ar` (English lives at `/en`).

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint
```

## Before launch — things to edit

1. **WhatsApp number** — `src/data/site.ts`, the `WHATSAPP_NUMBER` constant.
   Every WhatsApp link/button on the site reads from this single value.
2. **Coach profile** — `src/data/coach.ts`. Fields left as bracketed
   placeholders (`[الاسم الكامل]`, `[السنة]`, …) are intentional: real,
   unconfirmed details were never invented. Replace them once confirmed.
3. **Achievements & counters** — `src/data/achievements.ts`. Same rule:
   placeholders like `[السنة]` or `[العدد]` mark data that should be
   confirmed and typed in — never guessed.
4. **Champions** — `src/data/champions.ts` (names/ages are placeholders;
   photos are real).
5. **Site URL** — `src/data/site.ts`, `SITE_URL`, used for canonical URLs,
   the sitemap and Open Graph tags.
6. **Google Maps embed** — `src/data/contact.ts`, `mapQuery` (a plain
   address string; swap for exact coordinates once available).

See `ASSET_INVENTORY.md` for what every image is and where it's used, and
which assets (facility photos, video footage) are intentionally not yet
included.

## Project structure

```
src/
  app/
    [locale]/            # every page, under /ar or /en
      programs/[slug]/   # the 8 program pages share one template
      news/[slug]/
      layout.tsx          # header, footer, transitions, intro splash
      not-found.tsx / loading.tsx / error.tsx
    sitemap.ts / robots.ts
  components/
    home/                # the 10 homepage "chapters"
    transitions/          # intro splash + custom page-transition system
    achievements/ champions/ gallery/ programs/ registration/ legacy/ faq/ videos/
    layout/ ui/
  data/                  # every piece of site content, one file per concern
  i18n/                  # locale config + ar/en UI dictionary
  lib/                   # small shared helpers (routes, i18n text, utils)
public/assets/
  logo/                  # the three logo variants
  gallery/               # real academy photography
```

## Adding content

- **A new achievement**: add an entry to the `achievements` array in
  `src/data/achievements.ts`. It appears in the Achievements archive and its
  filters automatically.
- **A new champion**: add an entry to `champions` in `src/data/champions.ts`.
- **A gallery photo**: drop the file in `public/assets/gallery/` and add an
  entry to `galleryItems` in `src/data/gallery.ts` (include its real pixel
  width/height so the masonry layout doesn't shift).
- **A video**: drop MP4/WebM files in `public/assets/videos/` and add an
  entry to `videos` in `src/data/videos.ts` — the Videos page switches from
  its "coming soon" state automatically once the array isn't empty.
- **A news post**: add an entry to `newsPosts` in `src/data/news.ts`; it gets
  its own page at `/[locale]/news/[slug]` automatically.
- **A program**: add an entry to `programs` in `src/data/programs.ts`, then
  add its slug to `programRoutes` in `src/lib/routes.ts` so it appears in
  navigation.

## Internationalization

Arabic (`/ar`, RTL, default) and English (`/en`, LTR) share the exact same
route structure — the language switch in the header swaps only the locale
segment of the current URL, so it never drops the visitor back to the
homepage. UI strings live in `src/i18n/dictionaries.ts`; page content lives
in `src/data/*.ts` as `{ ar, en }` pairs (see the `Bi` type in
`src/lib/utils.ts`).

## The intro & page transitions

- The cinematic intro (logo draw-in) plays once per browser session
  (`sessionStorage`), auto-dismisses after ~3.5s, and has a visible skip
  button. It never blocks first paint — see the inline boot script in
  `src/app/layout.tsx` and `src/components/transitions/IntroSplash.tsx`.
- In-app navigation goes through `TransitionLink`
  (`src/components/transitions/TransitionLink.tsx`), which plays a brand-red
  circular wipe (`TransitionProvider.tsx`) using only CSS `clip-path` and
  Framer Motion — no WebGL, so there's no fallback burden and it stays light
  on Android GPUs. Browser Back/Forward and `prefers-reduced-motion` both
  skip straight to a plain, fast cross-fade.

## Deployment

This is a standard Next.js app (no static export) — deploy it anywhere that
runs Node (Vercel, a Node server, Docker, etc.):

```bash
npm run build
npm start
```

Set `SITE_URL` in `src/data/site.ts` to the production domain before the
final build so canonical URLs, `sitemap.xml`, and Open Graph tags are
correct.
