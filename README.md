# Read the Room — Vinyl & Coffee

A fast, two-page site for the shop, built with **Next.js (App Router) + TypeScript + Tailwind CSS** and tuned for **Vercel**.

- **Landing** (`/`) — a single no-scroll screen with a video background and buttons.
- **The Crate** (`/crate`) — flip through records like a physical crate, with search, genre filters, sort, and a grid view.

Both pages are statically generated, so they load instantly off Vercel's CDN.

---

## 1. Run it locally

You need [Node.js](https://nodejs.org) 18.18+ installed. Then, in this folder:

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. The site hot-reloads as you edit.

To make a production build locally: `npm run build` then `npm start`.

---

## 2. The files you'll actually edit

| What you want to change | File |
| --- | --- |
| Shop name, hours, address, Instagram, menu link | `data/shop.ts` |
| The records in the crate | `data/records.ts` |
| Landing buttons | `app/page.tsx` (the `BUTTONS` array at the top) |
| Brand colors | `tailwind.config.ts` (the `colors` block) |
| Fonts | `app/layout.tsx` |

Everything else (layout, the flip interaction, the modal) just works — but it's all plain, commented code you can open in VS Code and tweak.

---

## 3. Add your hero video

1. Put your video file at **`public/hero.mp4`** (H.264 MP4 plays everywhere).
2. Optional: replace **`public/hero-poster.jpg`** with a still frame — it shows while the video loads.

That's it. The landing page already points at those paths. Keep the file reasonably small (a 5–15s loop, ideally under ~8 MB) so it loads fast and doesn't burn Vercel bandwidth. If you have a big file, compress it first (HandBrake, or `ffmpeg -i in.mov -vf scale=1920:-2 -b:v 2M hero.mp4`).

---

## 4. Add / edit records

Open **`data/records.ts`** and add an object to the `records` array. Newest goes at the **top**:

```ts
{
  id: "artist-title",        // unique, lowercase, no spaces
  artist: "Artist Name",
  title: "Album Title",
  year: 1999,
  genre: "Soul/Funk",        // combine with "/"
  format: "LP",              // LP | 2xLP | EP | 7" | 12"
  price: 38,                 // dollars, no symbol
  condition: "VG+/VG+",      // record-store grading
  image: "/records/your-photo.jpg", // optional — see below
  featured: true,            // optional tag
  // sold: true,             // optional "Sold" overlay
  // notes: "First pressing." // optional line in the detail view
},
```

**Cover images are optional.** Leave `image: ""` and the site auto-generates a clean typographic cover. To use a real photo:

- Drop the image into **`public/records/`** (e.g. `aquemini.jpg`)
- Set `image: "/records/aquemini.jpg"`
- Or paste any image URL (a CDN link works too).

---

## 5. Deploy to Vercel

**Option A — GitHub (recommended):**

1. Create a new repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Read the Room site"
   git branch -M main
   git remote add origin https://github.com/Domuto/read-the-room.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel auto-detects Next.js — just hit **Deploy**. No settings to change.
3. Add your domain under the project's **Settings → Domains**.

**Option B — CLI:**

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

Every push to `main` redeploys automatically.

---

## Tech notes

- Next.js 14 App Router, React 18, TypeScript, Tailwind 3.
- Fonts self-hosted via `next/font` (no layout shift, no external requests at runtime).
- Record covers use lazy-loaded `<img>` so any local path or URL works with zero config.
- Respects reduced-motion and is keyboard-accessible (arrows flip the crate, `↑`/Enter opens a record, Esc closes).
