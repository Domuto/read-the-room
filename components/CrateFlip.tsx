"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CrateRecord } from "@/data/records";
import Cover from "./Cover";

/**
 * Flip through records like digging a physical crate.
 *  - ← / →  flip            (or click a side record, or use the arrows)
 *  - ↑ / Enter  pull it out  (opens the detail view)
 *  - swipe left / right on touch
 *
 * `paused` stops keyboard handling while a modal is open.
 */
export default function CrateFlip({
  records,
  onOpen,
  paused = false,
}: {
  records: CrateRecord[];
  onOpen: (record: CrateRecord) => void;
  paused?: boolean;
}) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Reset to the first record whenever the deck changes (search/filter/sort).
  useEffect(() => {
    setActive(0);
  }, [records]);

  const count = records.length;

  const next = useCallback(() => {
    setActive((i) => (count ? (i + 1) % count : 0));
  }, [count]);

  const prev = useCallback(() => {
    setActive((i) => (count ? (i - 1 + count) % count : 0));
  }, [count]);

  // Keyboard navigation
  useEffect(() => {
    if (paused || count === 0) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowUp" || e.key === "Enter") {
        e.preventDefault();
        onOpen(records[active]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paused, count, next, prev, onOpen, records, active]);

  if (count === 0) return null;

  const current = records[active];

  return (
    <div className="flex flex-col items-center">
      {/* The crate */}
      <div
        className="relative h-[300px] w-full sm:h-[380px]"
        style={{ perspective: "1400px" }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (dx > 45) prev();
          else if (dx < -45) next();
          touchStartX.current = null;
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {records.map((r, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            if (abs > 3) return null;

            const isFront = offset === 0;
            const translateX = offset * 58;
            const translateZ = -abs * 130;
            const rotateY = offset * -22;
            const scale = 1 - abs * 0.07;

            return (
              <button
                key={r.id}
                onClick={() => (isFront ? onOpen(r) : setActive(i))}
                tabIndex={isFront ? 0 : -1}
                aria-hidden={!isFront}
                aria-label={
                  isFront
                    ? `Open ${r.artist} — ${r.title}`
                    : `Flip to ${r.artist} — ${r.title}`
                }
                className="absolute h-[230px] w-[230px] overflow-hidden rounded-sm shadow-2xl shadow-black/50 ring-1 ring-line transition-all duration-500 ease-out will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ember sm:h-[300px] sm:w-[300px]"
                style={{
                  transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: 100 - abs,
                  opacity: abs > 2 ? 0.35 : 1,
                  cursor: isFront ? "pointer" : "pointer",
                }}
              >
                <Cover record={r} large={isFront} />
                {!isFront && (
                  <div className="absolute inset-0 bg-ink/55" />
                )}
                {r.featured && isFront && !r.sold && (
                  <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-gold backdrop-blur">
                    Featured
                  </span>
                )}
                {r.sold && isFront && (
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/55">
                    <span className="rotate-[-8deg] border-2 border-paper/80 px-5 py-1.5 font-mono text-base uppercase tracking-[0.3em] text-paper/90">
                      Sold
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Now-playing caption for the front record */}
      <div className="mt-8 flex w-full max-w-lg items-center justify-between gap-4">
        <button
          onClick={prev}
          aria-label="Previous record"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-paper/70 transition hover:border-ember hover:text-ember"
        >
          <span className="text-lg">←</span>
        </button>

        <button
          onClick={() => onOpen(current)}
          className="min-w-0 flex-1 text-center"
        >
          <p className="truncate font-display text-xl font-bold text-paper">
            {current.title}
          </p>
          <p className="truncate text-sm text-haze">{current.artist}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ember">
            {current.sold ? "Sold" : `$${current.price}`} · {current.condition}
          </p>
        </button>

        <button
          onClick={next}
          aria-label="Next record"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-paper/70 transition hover:border-ember hover:text-ember"
        >
          <span className="text-lg">→</span>
        </button>
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-haze/60">
        {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        <span className="mx-2 text-haze/30">·</span>
        <span className="hidden sm:inline">← → flip · ↑ open</span>
        <span className="sm:hidden">swipe · tap to open</span>
      </p>
    </div>
  );
}
