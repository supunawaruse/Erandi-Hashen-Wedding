# Wedding Invitation — React + Vite

A single-page wedding invitation site: a "tap to open" landing gate, hero,
couple intro, wedding details, RSVP form (wired to a Google Sheet), a live
countdown, and footer. Gold-and-white theme throughout, with soft
scroll-reveal animations.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
```

## Customize

Everything you need to personalize lives in `src/data/weddingData.js`:
names, parents' names, event date/venue, the note from the couple, contact
numbers, and social links.

Colors and fonts are defined as CSS variables at the top of `src/index.css`
(`--ink`, `--ivory`, `--gold`, etc.) — change them there to re-theme the
whole site at once.

## Tap-to-open landing screen

`src/components/Opener.jsx` shows a full-screen cover with the couple's
names and a "Tap to Open" prompt before the rest of the invitation
mounts. Tapping (or pressing Enter/Space) fades it out and reveals the
page underneath. It reuses the same monogram component as the hero.

## RSVP → Google Sheet

The RSVP form posts straight to your Google Sheet via a small Apps Script
web app — see **[`apps-script/README.md`](./apps-script/README.md)** for
the step-by-step setup against your spreadsheet. Short version:

1. Paste `apps-script/Code.gs` into your spreadsheet's Extensions > Apps
   Script, and deploy it as a web app.
2. Copy `.env.example` to `.env` and set `VITE_RSVP_SCRIPT_URL` to the
   deployed web app URL.
3. `npm run build` / `npm run dev`.

Until `VITE_RSVP_SCRIPT_URL` is set, submissions just log to the console
and still show the thank-you screen, so the form is safe to demo without
the sheet hooked up.

## Adding photos

The layout has no photos by default. To add a cover image, portrait, or
gallery, drop images into `src/assets/` (or `public/`) and reference them
from the relevant component.
