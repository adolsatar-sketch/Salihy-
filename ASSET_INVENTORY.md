# Asset Inventory

Every image in `public/assets` is real academy material — no stock photography
and no AI-generated imagery is used anywhere on the site. This file documents
where each file lives, what it is, and where it is used across the site so a
new asset can be slotted into the correct role later.

All images are served through `next/image`, which automatically generates
optimized AVIF/WebP variants at request time (configured in `next.config.ts`)
while the original files in `public/assets` stay untouched.

## Logo (`public/assets/logo/`)

| File | Description | Used in |
|---|---|---|
| `logo.png` | Small transparent mark (white dragon + red brush ring, no wordmark) | Header logo, page-transition overlay, favicon-style usage |
| `logo-full.png` | Full lock-up on black: dragon mark + "SALIHY / KYOKUSHIN / ACADEMY" wordmark | Intro splash reference, Open Graph share image |
| `logo-mark.png` | Red brush-ring only, transparent background | Intro splash animation, decorative watermark (CTA chapter, Academy "photos coming soon" panel, loading state) |

## Gallery photography (`public/assets/gallery/`)

Each photo is tagged by category in `src/data/gallery.ts` and reused across
the site where its content matches the narrative beat of that section —
never cropped to hide or alter a person's face, never stretched.

| File | Content | Primary role on the site |
|---|---|---|
| `gallery-01.jpg` | Athlete kneeling in white gi + black belt, awaiting a match result | Home "Discipline" chapter, Women's Program hero, Belt Journey hero, Gallery ("behind the scenes") |
| `gallery-02.jpg` | Two athletes in white gi holding a 2nd-place trophy and medals | Home "Achievements" teaser, Achievements archive (local, silver), Champions |
| `gallery-03.jpg` | High head-kick during free sparring, green-pillared gym | Home Hero background, Adults Program hero, Gallery (fights) |
| `gallery-04.jpg` | Archival, grainy photo of two athletes sparring | Home "The Beginning" chapter (treated as monochrome archive), Coach timeline (first milestone), Gallery (legacy) |
| `gallery-05.jpg` | Podium shot, Iraqi flag, "1st International Saffron Kyokushin Championship" banner (Karabük, Turkey) | Home Achievements teaser, Achievements archive (international gold), Coach timeline, News post, Champions |
| `gallery-06.jpg` | Four athletes incl. a child on a Turkish federation podium (Budokaido Championship, Tokat) | Home "Fighter to Coach" chapter, Achievements archive, Coach timeline, Champions, News post, Kids Program hero |
| `gallery-07.jpg` | Coach standing beside an athlete holding a trophy | Coach page portrait/hero, Home "Fighter to Coach" chapter |
| `gallery-08.jpg` | Four athletes with medals beside four podium trophies (1st–4th place) | Home "Fighter to Coach" chapter, Achievements archive (team), Competition Team Program hero |
| `gallery-09.jpg` | Two athletes partner-drilling a knee-raise | Home "The Fighter" full-bleed alt use, Youth Program hero, Study & Sport Program hero, Training System reference, Gallery (training) |
| `gallery-10.jpg` | Dynamic front kick in a tournament hall with spectators | Home "The Fighter" full-bleed chapter, Training System hero, Gallery (fights) |

## Assets intentionally not yet added

- **Facility / interior photography** — the Academy page reserves a clearly
  labeled panel ("Facility photos coming soon") rather than using a stand-in
  photo. Replace it with real interior shots by editing
  `src/app/[locale]/academy/page.tsx`.
- **Video footage** — `src/data/videos.ts` is intentionally empty; the Videos
  page renders an honest "coming soon" state with a link to Instagram until
  real, non-stock clips are supplied. Add entries to that file once MP4/WebM
  files are placed under `public/assets/videos/`.
