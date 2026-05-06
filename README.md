# JGC Secure Console · Interactive Portfolio

Single-page recruiter-friendly portfolio framed as a **minimal SOC-style console**: typed `start` (or tap **START**), brief boot sequence, then an **interactive “threat topology” map** backed by SVG and Framer Motion. On small screens the map folds into **stacked cards** instead of pretending the graph is usable on a phone.

## Stack

- Next.js (App Router) + TypeScript  
- Tailwind CSS  
- Framer Motion  
- Lucide Icons  

No Three.js, no audio, no heavy mapping SDKs.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run build   # production check
npm start       # serve the build
```

## Deploy on Vercel

1. Push this repo to GitHub (or connect your Git provider).  
2. Import the project in [Vercel](https://vercel.com) with the default Next.js preset.  
3. Build command: `npm run build`, output: `.next`.  

Environment variables are **not** required for the static experience.

## Customize your content

All portfolio copy, graph nodes, tour steps, and outbound links are centralized in:

- `lib/data.ts`

Update `QUICK_LINKS` (LinkedIn slug, email, WhatsApp `wa.me` number, GitHub) and the structured sections (`DEV_PROJECTS`, `SECURITY_LABS`, `EXPERIENCE`, etc.) in one place.

### CV download

Add your résumé as:

- `public/cv.pdf`

The Quick Access bar links to `/cv.pdf`. Until the file exists, the link will 404 locally and in production.

## UX map

| Phase | What happens |
| --- | --- |
| **Intro** | Full-screen terminal with `start` / START button, boot lines, profile dump, exit animation. |
| **Main** | SVG network map (desktop) or card list (mobile), side panel for details, live log widget, guided tour, quick actions. |

## Component map

- `components/TerminalIntro.tsx` — landing console + boot.  
- `components/ThreatMap.tsx` — SVG topology + responsive list fallback.  
- `components/SidePanel.tsx` — motion drawer / briefing cards.  
- `components/LiveLogs.tsx` — corner log widget after boot.  
- `components/QuickAccess.tsx` — CV/GitHub/LinkedIn/email/WhatsApp shortcuts.  
- `components/GuidedTour.tsx` — ~60s automated walkthrough (`GUIDED_TOUR_STEPS` in data).  

## Licensing

Personal portfolio template — reuse with attribution appreciated.
