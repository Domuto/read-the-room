/**
 * ════════════════════════════════════════════════════════════════
 *  COVER FETCHER
 *
 *  Downloads the real Discogs cover art for every record in the crate
 *  into public/records/<release_id>.jpg, then re-run the generator
 *  (node scripts/generate-crate.mjs) to wire the images in.
 *
 *  Usage:
 *    node scripts/fetch-covers.mjs
 *
 *  - Reads release ids straight from data/records.ts.
 *  - Resumable: skips covers already downloaded, so you can re-run.
 *  - Polite: throttled well under Discogs' unauth rate limit, with
 *    429 back-off. Uses the public release endpoint (no token needed).
 * ════════════════════════════════════════════════════════════════
 */

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/records");
const UA = "ReadTheRoom/1.0 +https://readtheroom.atl";
const DELAY_MS = 2500; // ~24 req/min, under Discogs' 25/min unauth cap

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Pull the release id (last "-<digits>" segment) from each record id.
const src = readFileSync(resolve(ROOT, "data/records.ts"), "utf8");
const ids = [...src.matchAll(/id: "([^"]+)"/g)]
  .map((m) => m[1].split("-").pop())
  .filter((x) => /^\d+$/.test(x));
const releaseIds = [...new Set(ids)];

mkdirSync(OUT_DIR, { recursive: true });

async function fetchJson(url, tries = 4) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status === 429) {
      const wait = Number(res.headers.get("retry-after")) * 1000 || 60000;
      console.log(`  429 rate-limited → waiting ${Math.round(wait / 1000)}s`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
  throw new Error("rate-limited (gave up)");
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`img HTTP ${res.status}`);
  const type = res.headers.get("content-type") || "";
  if (!type.startsWith("image/")) throw new Error(`not an image (${type})`);
  const buf = Buffer.from(await res.arrayBuffer());
  // JPEG (ffd8) or PNG (8950) magic bytes only.
  const ok = (buf[0] === 0xff && buf[1] === 0xd8) || (buf[0] === 0x89 && buf[1] === 0x50);
  if (!ok || buf.length < 1000) throw new Error("bad image bytes");
  writeFileSync(dest, buf);
  return buf.length;
}

let downloaded = 0;
let skipped = 0;
let noImage = 0;
let failed = 0;

console.log(`Fetching covers for ${releaseIds.length} releases…\n`);

for (let i = 0; i < releaseIds.length; i++) {
  const relId = releaseIds[i];
  const dest = resolve(OUT_DIR, `${relId}.jpg`);
  const tag = `[${i + 1}/${releaseIds.length}] ${relId}`;

  if (existsSync(dest) && statSync(dest).size > 1000) {
    skipped++;
    continue;
  }

  try {
    const data = await fetchJson(`https://api.discogs.com/releases/${relId}`);
    const imgs = data.images || [];
    const primary = imgs.find((im) => im.type === "primary") || imgs[0];
    if (!primary?.uri) {
      noImage++;
      console.log(`${tag} — no image on Discogs`);
    } else {
      const bytes = await download(primary.uri, dest);
      downloaded++;
      console.log(`${tag} ✓ ${(bytes / 1024).toFixed(0)}KB`);
    }
  } catch (err) {
    failed++;
    console.log(`${tag} ✗ ${err.message}`);
  }

  await sleep(DELAY_MS);
}

console.log(
  `\nDone. downloaded=${downloaded} skipped=${skipped} no-image=${noImage} failed=${failed}`
);
