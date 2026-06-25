/**
 * ════════════════════════════════════════════════════════════════
 *  THE CRATE — your record inventory
 *
 *  This is the ONLY file you edit to add / remove / update records.
 *  Add a new object to the `records` array below. The newest records
 *  go at the TOP (the "Just In" sort keeps this order).
 *
 *  COVER IMAGES (optional):
 *    - Drop a photo into  /public/records/   (e.g. aquemini.jpg)
 *    - Then set           image: "/records/aquemini.jpg"
 *    - Or paste any image URL (Shopify CDN, etc.) into `image`.
 *    - Leave `image` empty ("") and a clean typographic cover is
 *      generated automatically from the artist + title.
 * ════════════════════════════════════════════════════════════════
 */

export type Format = "LP" | "2xLP" | "EP" | '7"' | '12"';

export type CrateRecord = {
  id: string; // unique, lowercase, no spaces — used internally
  artist: string;
  title: string;
  year?: number;
  genre: string; // use "/" to combine, e.g. "Soul/Funk"
  format: Format;
  price: number; // dollars, no symbol
  condition: string; // record-store grading, e.g. "NM/VG+"
  image?: string; // "/records/file.jpg" or a full URL — or leave "" for an auto cover
  featured?: boolean; // shows a "Featured" tag
  sold?: boolean; // shows a "Sold" overlay and hides the price
  notes?: string; // a short line shown in the detail view (pressing, reissue, etc.)
};

export const records: CrateRecord[] = [
  {
    id: "outkast-aquemini",
    artist: "OutKast",
    title: "Aquemini",
    year: 1998,
    genre: "Hip-Hop",
    format: "2xLP",
    price: 45,
    condition: "NM/NM",
    image: "",
    featured: true,
    notes: "Atlanta staple. Gatefold reissue, plays clean.",
  },
  {
    id: "dangelo-voodoo",
    artist: "D'Angelo",
    title: "Voodoo",
    year: 2000,
    genre: "Soul/R&B",
    format: "2xLP",
    price: 60,
    condition: "NM/VG+",
    image: "",
    featured: true,
  },
  {
    id: "alice-coltrane-journey",
    artist: "Alice Coltrane",
    title: "Journey in Satchidananda",
    year: 1971,
    genre: "Jazz",
    format: "LP",
    price: 55,
    condition: "VG+/VG+",
    image: "",
    featured: true,
    notes: "Spiritual jazz cornerstone.",
  },
  {
    id: "goodie-mob-soul-food",
    artist: "Goodie Mob",
    title: "Soul Food",
    year: 1995,
    genre: "Hip-Hop",
    format: "2xLP",
    price: 50,
    condition: "NM/NM",
    image: "",
    notes: "Dungeon Family. ATL forever.",
  },
  {
    id: "fela-zombie",
    artist: "Fela Kuti",
    title: "Zombie",
    year: 1976,
    genre: "Afrobeat/Funk",
    format: "LP",
    price: 42,
    condition: "VG+/VG",
    image: "",
  },
  {
    id: "floating-points-promises",
    artist: "Floating Points, Pharoah Sanders & LSO",
    title: "Promises",
    year: 2021,
    genre: "Electronic/Jazz",
    format: "LP",
    price: 35,
    condition: "M/M",
    image: "",
    featured: true,
    notes: "Sealed copy.",
  },
  {
    id: "curtis-superfly",
    artist: "Curtis Mayfield",
    title: "Super Fly",
    year: 1972,
    genre: "Soul/Funk",
    format: "LP",
    price: 38,
    condition: "VG+/VG+",
    image: "",
  },
  {
    id: "erykah-mamas-gun",
    artist: "Erykah Badu",
    title: "Mama's Gun",
    year: 2000,
    genre: "Soul/R&B",
    format: "2xLP",
    price: 48,
    condition: "NM/NM",
    image: "",
  },
  {
    id: "tribe-low-end",
    artist: "A Tribe Called Quest",
    title: "The Low End Theory",
    year: 1991,
    genre: "Hip-Hop",
    format: "LP",
    price: 40,
    condition: "VG+/VG+",
    image: "",
  },
  {
    id: "moodymann-silent",
    artist: "Moodymann",
    title: "Silentintroduction",
    year: 1997,
    genre: "House/Electronic",
    format: "2xLP",
    price: 65,
    condition: "NM/VG+",
    image: "",
    notes: "Detroit deep house classic.",
  },
  {
    id: "donny-live",
    artist: "Donny Hathaway",
    title: "Live",
    year: 1972,
    genre: "Soul",
    format: "LP",
    price: 30,
    condition: "VG+/VG",
    image: "",
  },
  {
    id: "isaac-hot-buttered",
    artist: "Isaac Hayes",
    title: "Hot Buttered Soul",
    year: 1969,
    genre: "Soul/Funk",
    format: "LP",
    price: 36,
    condition: "VG/VG",
    image: "",
  },
  {
    id: "aretha-amazing-grace",
    artist: "Aretha Franklin",
    title: "Amazing Grace",
    year: 1972,
    genre: "Gospel/Soul",
    format: "2xLP",
    price: 44,
    condition: "VG+/VG+",
    image: "",
  },
  {
    id: "sade-diamond-life",
    artist: "Sade",
    title: "Diamond Life",
    year: 1984,
    genre: "Soul/Pop",
    format: "LP",
    price: 28,
    condition: "VG/VG",
    image: "",
    notes: "180g reissue.",
  },
  {
    id: "jdilla-donuts",
    artist: "J Dilla",
    title: "Donuts",
    year: 2006,
    genre: "Hip-Hop",
    format: "2xLP",
    price: 0,
    condition: "NM/NM",
    image: "",
    sold: true,
  },
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
