I want to modify only the Services page so that:

The service boxes scroll horizontally from right to left.

The scrolling should happen when the user scrolls vertically (scroll-triggered horizontal movement).

The rest of the website UI must remain completely unchanged.

No global CSS, layout, or shared components should be modified.

The effect must be isolated strictly to the Services page.

The design, styling, spacing, and responsiveness of the service cards must remain exactly the same.

The animation should be smooth and performant.

It must work properly on desktop and mobile.

Important:

Do NOT modify the header, footer, navbar, or global layout.

Do NOT change styles used on other pages.

Scope all CSS and JS only to the Services page component/section.# Cinematic Archive — Photography Portfolio

Minimal, cinematic one‑page portfolio built with React + Vite. Features a motion hero collage, About section with framed images, a categorized Gallery, Services, and Contact — all stacked as a smooth scrolling landing page.

## Features

- Cinematic hero collage with subtle motion
- Solid black theme with balanced spacing
- About section: framed images + fluid typography
- Gallery with simple category filters
- Services and Contact (form + map) sections
- Smooth scroll navigation; responsive layout across devices

## Quick Start

Prerequisites: Node.js 18+ recommended

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

## Project Structure (top‑level)

- App.tsx — app shell, theme, section order
- index.html / index.tsx — Vite entry, Tailwind via CDN
- components/
   - FragmentGrid.tsx — hero collage layout and motion
   - GridPanel.tsx — individual hero tiles (drift/pan animations)
   - FilmOverlay.tsx — optional overlays (currently disabled for flat black)
   - NavBar/Footer (if present) — navigation + footer
- pages/
   - Home.tsx — wraps the hero
   - About.tsx — framed images + copy, fluid scaling
   - Gallery.tsx — categorized image grid
   - Services.tsx — service cards
   - Contact.tsx — form + map

## Customize Images & Text

- Hero images: edit URLs in components/FragmentGrid.tsx (`image` props of `GridPanel`).
- About images: edit URLs in pages/About.tsx (left portrait and lower image). Frames are separate thin borders; images sit inside and should not cover the white outline.
- Gallery images: edit the `images` array in pages/Gallery.tsx. Tiles use centered `object-contain` to avoid cropping.
- Copy: edit headings and paragraphs directly in pages/About.tsx, Services.tsx, Contact.tsx.

## Styling & Behavior

- Theme: dark, solid black background (set in App.tsx and section components).
- Motion: hero tiles use gentle drift/pan; other sections are static.
- Responsiveness: layout, typography, and spacing use fluid units (`clamp`) and Tailwind classes.

## Deployment

Any static host works (Vercel, Netlify, GitHub Pages). Build first, then deploy the `dist/` folder.

```bash
npm run build
# deploy the dist/ folder to your host of choice
```

## Notes

- If images appear cropped in the hero, that is intentional (full‑bleed `object-cover`). For non‑cropped tiles, switch to `object-contain` in `GridPanel.tsx`.
- To adjust spacing or proportions, tweak clamp ranges in pages/About.tsx and grid spans in components/FragmentGrid.tsx.
