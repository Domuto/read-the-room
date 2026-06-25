"use client";

import { useMemo, useState } from "react";
import { CrateRecord } from "@/data/records";
import CrateFlip from "./CrateFlip";
import RecordCard from "./RecordCard";
import RecordModal from "./RecordModal";

type SortKey = "new" | "priceAsc" | "priceDesc" | "artist";
type View = "crate" | "grid";

export default function CrateClient({ records }: { records: CrateRecord[] }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<SortKey>("new");
  const [view, setView] = useState<View>("crate");
  const [active, setActive] = useState<CrateRecord | null>(null);

  // Unique genre list, split on "/"
  const genres = useMemo(() => {
    const set = new Set<string>();
    records.forEach((r) =>
      r.genre.split("/").forEach((g) => set.add(g.trim()))
    );
    return ["All", ...Array.from(set).sort()];
  }, [records]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = records.filter((r) => {
      const matchesQuery =
        !q ||
        r.artist.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q);
      const matchesGenre =
        genre === "All" || r.genre.toLowerCase().includes(genre.toLowerCase());
      return matchesQuery && matchesGenre;
    });

    if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "artist")
      list = [...list].sort((a, b) => a.artist.localeCompare(b.artist));

    return list;
  }, [records, query, genre, sort]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8">
      {/* Controls */}
      <div className="mb-12 flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artist or title…"
            className="w-full rounded-full border border-line bg-panel px-5 py-3 font-mono text-sm text-paper outline-none transition placeholder:text-haze/50 focus:border-ember sm:max-w-xs"
            aria-label="Search records"
          />

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            {/* Sort */}
            <div className="flex items-center gap-2 font-mono text-xs text-haze">
              <span className="hidden uppercase tracking-widest sm:inline">
                Sort
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-line bg-panel px-4 py-2 text-paper outline-none focus:border-ember"
                aria-label="Sort records"
              >
                <option value="new">Just In</option>
                <option value="priceAsc">Price ↑</option>
                <option value="priceDesc">Price ↓</option>
                <option value="artist">Artist A–Z</option>
              </select>
            </div>

            {/* View toggle */}
            <div className="flex rounded-full border border-line p-1 font-mono text-[11px] uppercase tracking-widest">
              <button
                onClick={() => setView("crate")}
                className={`rounded-full px-3 py-1.5 transition ${
                  view === "crate"
                    ? "bg-ember text-ink"
                    : "text-haze hover:text-paper"
                }`}
              >
                Crate
              </button>
              <button
                onClick={() => setView("grid")}
                className={`rounded-full px-3 py-1.5 transition ${
                  view === "grid"
                    ? "bg-ember text-ink"
                    : "text-haze hover:text-paper"
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Genre chips */}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`shrink-0 rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest transition ${
                genre === g
                  ? "border-ember bg-ember text-ink"
                  : "border-line text-haze hover:border-paper/40 hover:text-paper"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-xl text-paper">Nothing matches that.</p>
          <p className="mt-2 font-mono text-sm text-haze">
            Clear the search or pick another genre.
          </p>
        </div>
      ) : view === "crate" ? (
        <div className="pt-4">
          <CrateFlip
            records={filtered}
            onOpen={setActive}
            paused={active !== null}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((r) => (
            <RecordCard key={r.id} record={r} onClick={() => setActive(r)} />
          ))}
        </div>
      )}

      <RecordModal record={active} onClose={() => setActive(null)} />
    </section>
  );
}
