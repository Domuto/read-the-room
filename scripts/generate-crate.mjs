/**
 * ════════════════════════════════════════════════════════════════
 *  CRATE GENERATOR
 *
 *  Turns a Discogs "collection" CSV export into data/records.ts.
 *
 *  Usage:
 *    node scripts/generate-crate.mjs [path/to/export.csv]
 *
 *  Defaults to data/collection.csv. Re-run any time you update your
 *  Discogs export — it overwrites data/records.ts.
 *
 *  Discogs exports have NO genre or condition columns, so:
 *    - genre    → auto-classified from label / artist (best effort)
 *    - condition→ defaults to VG+ (edit in data/records.ts if needed)
 *    - price    → from "Collection Price"; blank = omitted → shows "Ask"
 * ════════════════════════════════════════════════════════════════
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const csvPath = resolve(ROOT, process.argv[2] ?? "data/collection.csv");
const outPath = resolve(ROOT, "data/records.ts");

/* ── Minimal RFC-4180 CSV parser (handles quotes + "" escapes) ───── */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

/* ── Small helpers ───────────────────────────────────────────────── */
// Strip Discogs disambiguation suffixes: "Boniface (5)" → "Boniface"
const cleanName = (s) => (s ?? "").replace(/\s*\(\d+\)\s*$/, "").trim();
const firstOf = (s) => cleanName((s ?? "").split(",")[0]);
const clean = (s) => (s ?? "").replace(/\s+/g, " ").trim();

function slug(s) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/g, "");
}

/* ── Physical format (first token of the Discogs format string) ──── */
function physicalFormat(fmt) {
  const first = (fmt ?? "").split(",")[0].trim();
  const map = {
    Cass: "Cassette",
    "8-Trk": "8-Track",
  };
  return map[first] ?? first ?? "12\"";
}

/* ── Genre auto-classification (best effort) ─────────────────────── */
// Known artists win first, then labels, then a format-based fallback.
const ARTIST_GENRE = {
  "afrika bambaataa & soulsonic force": "Electro",
  kraftwerk: "Electro",
  "beastie boys": "Hip-Hop",
  "grandmaster flash": "Hip-Hop",
  "the crash crew": "Hip-Hop",
  "pete rock & c.l. smooth": "Hip-Hop",
  "j dilla": "Hip-Hop",
  "curtis mayfield and ice-t": "Hip-Hop",
  "master p / sleepy brown featuring outkast": "Hip-Hop",
  "808 state": "Techno",
  "robin s.": "House",
  "black box": "House",
  "deee-lite": "House",
  "basement jaxx": "House",
  "reel 2 real": "House",
  raze: "House",
  "steve monroe": "House",
  "house people": "House",
  "thompson & lenoir": "House",
  "planet soul featuring j. cee": "House",
  "nina kraviz": "Techno",
  "ricardo villalobos": "Minimal",
  "laurent garnier": "Techno",
  "cirez d": "Techno",
  "dj misjah": "Techno",
  "kelli hand": "Techno",
  grace: "Trance",
  "jan johnston": "Trance",
  "dutch force": "Trance",
  "whitney houston": "R&B",
  "aretha franklin": "Soul",
  eurythmics: "Pop",
  tlc: "R&B",
  "faith evans": "R&B",
  "mary j. blige": "R&B",
  "jody watley": "R&B",
  "jody watley featuring roy ayers": "House",
  swv: "R&B",
  "evelyn king": "Soul",
  mya: "R&B",
  case: "R&B",
  "adina howard": "R&B",
  "keith sweat": "R&B",
  total: "R&B",
  "total featuring notorious b.i.g.": "R&B",
  "jermaine jackson": "Soul",
  "the players association": "Disco",
  "glenn miller": "Jazz",
  "stephen stills": "Rock",
  loona: "Latin",
  paradisio: "Latin",
  "javier garcia": "Latin",
  "brazilian girls": "Electronic",
};

const LABEL_GENRE = {
  // Techno
  "music man records": "Techno",
  "altitude records": "Techno",
  "blow up": "Techno",
  "sonic groove": "Techno",
  "hal 9000": "Techno",
  onitor: "Techno",
  "kronert enterprises": "Techno",
  "mkt records": "Techno",
  mouseville: "Techno",
  "rerun records": "Techno",
  "digital dungeon records": "Techno",
  disturbance: "Techno",
  "scat records": "Techno",
  "spectra records": "Techno",
  "anode records": "Techno",
  "time to impact": "Techno",
  fabric: "Techno",
  "the frigate studios utrecht": "Techno",
  // Trance
  platipus: "Trance",
  nukleuz: "Trance",
  inferno: "Trance",
  "kinetic records": "Trance",
  "sounds good records": "Trance",
  "symbiosis records": "Trance",
  "sunrise recordings": "Trance",
  // Minimal
  rawax: "Minimal",
  "meant records": "Minimal",
  onysia: "Minimal",
  // Electro / IDM
  rephlex: "Electro",
  // Deep House
  "underground quality": "Deep House",
  "ndatl muzik": "Deep House",
  "pacific rhythm": "Deep House",
  "ladeep records": "Deep House",
  "northsouth records": "Deep House",
  "subwax excursions": "Deep House",
  gettraum: "Deep House",
  "chapelle xiv music": "Deep House",
  // Hip-Hop
  "sugar hill records": "Hip-Hop",
  "grand royal": "Hip-Hop",
  "stones throw records": "Hip-Hop",
  "stones throw white label": "Hip-Hop",
  "21st century records": "Hip-Hop",
  // R&B / Soul
  "def soul": "R&B",
  "laface records": "R&B",
  "uptown records": "R&B",
  "bad boy entertainment": "R&B",
  motown: "Soul",
  // Latin
  "h.o.l.a. recordings": "Latin",
  fonovisa: "Latin",
  // Disco / Funk
  vanguard: "Disco",
  starville: "Funk",
  // Other
  polyhymnia: "Soundtrack",
};

function classifyGenre({ artist, label, format }) {
  const a = cleanName(artist).toLowerCase();
  if (ARTIST_GENRE[a]) return ARTIST_GENRE[a];

  const l = firstOf(label).toLowerCase();
  if (LABEL_GENRE[l]) return LABEL_GENRE[l];

  // Format-based fallback — this collection is house-dominant.
  const f = physicalFormat(format);
  if (["LP", "2xLP", "3xLP"].includes(f)) return "Electronic";
  if (f === "Cassette" || f === "8-Track") return "Other";
  return "House";
}

/* ── Build records ───────────────────────────────────────────────── */
const rows = parseCsv(readFileSync(csvPath, "utf8"));
const header = rows[0].map((h) => h.trim());
const idx = (name) => header.indexOf(name);
const iArtist = idx("Artist");
const iTitle = idx("Title");
const iLabel = idx("Label");
const iFormat = idx("Format");
const iReleased = idx("Released");
const iReleaseId = idx("release_id");
const iPrice = idx("Collection Price");
const iNotes = idx("Collection Notes");

// Group by release_id, preferring the row that carries a price.
const groups = new Map();
for (const r of rows.slice(1)) {
  const relId = clean(r[iReleaseId]);
  if (!relId) continue;
  const hasPrice = clean(r[iPrice]) !== "";
  const existing = groups.get(relId);
  if (!existing) groups.set(relId, r);
  else if (hasPrice && clean(existing[iPrice]) === "") groups.set(relId, r);
}

const records = [];
for (const [relId, r] of groups) {
  const artist = clean(cleanName(r[iArtist])) || "Unknown Artist";
  const title = clean(r[iTitle]) || "Untitled";
  const label = clean(firstOf(r[iLabel]));
  const format = physicalFormat(r[iFormat]);
  const yearNum = parseInt(clean(r[iReleased]), 10);
  const year = Number.isFinite(yearNum) && yearNum > 0 ? yearNum : undefined;
  const priceNum = parseInt(clean(r[iPrice]), 10);
  const price = Number.isFinite(priceNum) && priceNum > 0 ? priceNum : undefined;
  const rawNote = clean(r[iNotes]);
  const notes = rawNote && !/^\d+$/.test(rawNote) ? rawNote : undefined;
  const genre = classifyGenre({ artist: r[iArtist], label: r[iLabel], format: r[iFormat] });

  // Use the real Discogs cover if it's been downloaded (see fetch-covers.mjs).
  const image = existsSync(resolve(ROOT, `public/records/${relId}.jpg`))
    ? `/records/${relId}.jpg`
    : undefined;

  records.push({
    id: `${slug(artist)}-${relId}`,
    artist,
    title,
    year,
    genre,
    format,
    price,
    condition: "VG+",
    label: label || undefined,
    image,
    notes,
  });
}

// Newest first (by Discogs release id as a stable proxy — highest = newest).
records.sort((a, b) => Number(b.id.split("-").pop()) - Number(a.id.split("-").pop()));

/* ── Emit data/records.ts ────────────────────────────────────────── */
const q = (s) => JSON.stringify(s);
function emitRecord(r) {
  const lines = [
    `    id: ${q(r.id)},`,
    `    artist: ${q(r.artist)},`,
    `    title: ${q(r.title)},`,
    r.year !== undefined ? `    year: ${r.year},` : null,
    `    genre: ${q(r.genre)},`,
    `    format: ${q(r.format)},`,
    r.price !== undefined ? `    price: ${r.price},` : null,
    `    condition: ${q(r.condition)},`,
    r.label ? `    label: ${q(r.label)},` : null,
    r.image ? `    image: ${q(r.image)},` : null,
    r.notes ? `    notes: ${q(r.notes)},` : null,
  ].filter(Boolean);
  return `  {\n${lines.join("\n")}\n  }`;
}

const uniqueGenres = [...new Set(records.map((r) => r.genre))].sort();

const file = `/**
 * ════════════════════════════════════════════════════════════════
 *  THE CRATE — your record inventory
 *
 *  ⚠️  THIS FILE IS GENERATED from data/collection.csv by
 *      scripts/generate-crate.mjs. Re-running the script overwrites it.
 *      You can still hand-edit records below (add photos, mark sold,
 *      fix a genre) — just know a regen will replace your edits.
 *
 *  COVER IMAGES (optional):
 *    - Drop a photo into  /public/records/   (e.g. moments-in-time.jpg)
 *    - Then set           image: "/records/moments-in-time.jpg"
 *    - Or paste any image URL into \`image\`.
 *    - Leave \`image\` empty and a clean typographic cover is generated
 *      automatically from the artist + title.
 *
 *  Auto-classified genres in this crate:
 *    ${uniqueGenres.join(", ")}
 * ════════════════════════════════════════════════════════════════
 */

export type Format =
  | "LP"
  | "2xLP"
  | "3xLP"
  | "EP"
  | '7"'
  | '10"'
  | '12"'
  | '2x12"'
  | '3x12"'
  | "Cassette"
  | "8-Track";

export type CrateRecord = {
  id: string; // unique, lowercase, no spaces — used internally
  artist: string;
  title: string;
  year?: number;
  genre: string; // use "/" to combine, e.g. "Soul/Funk"
  format: Format;
  price?: number; // dollars, no symbol — omit for "Ask"
  condition: string; // record-store grading, e.g. "NM/VG+"
  label?: string; // record label / imprint
  image?: string; // "/records/file.jpg" or a full URL — or leave "" for an auto cover
  featured?: boolean; // shows a "Featured" tag
  sold?: boolean; // shows a "Sold" overlay and hides the price
  notes?: string; // a short line shown in the detail view (pressing, reissue, etc.)
};

export const records: CrateRecord[] = [
${records.map(emitRecord).join(",\n")},
];

/**
 * Deterministic warm gradient for the auto-generated covers.
 * Same record always gets the same color so the crate looks stable.
 */
const COVER_SWATCHES = [
  "linear-gradient(135deg,#e7c9a9,#c9a37c)",
  "linear-gradient(135deg,#d8b08c,#b78c66)",
  "linear-gradient(135deg,#e3b7a0,#c58f77)",
  "linear-gradient(135deg,#cdbf9a,#a69d72)",
  "linear-gradient(135deg,#dfa98f,#bb7d63)",
  "linear-gradient(135deg,#bfc3a0,#949a74)",
  "linear-gradient(135deg,#e0c08a,#bd985c)",
  "linear-gradient(135deg,#d6a9a0,#b07f78)",
];

export function coverColor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return COVER_SWATCHES[h % COVER_SWATCHES.length];
}
`;

writeFileSync(outPath, file);
console.log(
  `Wrote ${records.length} records → data/records.ts\nGenres: ${uniqueGenres.join(", ")}`
);
