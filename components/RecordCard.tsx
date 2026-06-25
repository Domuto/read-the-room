"use client";

import { CrateRecord } from "@/data/records";
import Cover from "./Cover";

export default function RecordCard({
  record,
  onClick,
}: {
  record: CrateRecord;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group block w-full text-left focus:outline-none"
      aria-label={`${record.artist} — ${record.title}`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-panel shadow-lg shadow-black/30 ring-1 ring-line transition duration-300 group-hover:-translate-y-1 group-hover:ring-ember/40 group-focus-visible:ring-ember">
        <div className="h-full w-full transition duration-500 group-hover:scale-[1.03]">
          <Cover record={record} />
        </div>

        {record.featured && !record.sold && (
          <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-gold backdrop-blur">
            Featured
          </span>
        )}

        {record.sold && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink/55">
            <span className="rotate-[-8deg] border-2 border-paper/80 px-4 py-1 font-mono text-sm uppercase tracking-[0.3em] text-paper/90">
              Sold
            </span>
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-semibold leading-tight text-paper">
            {record.title}
          </p>
          <p className="truncate text-sm text-haze">{record.artist}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-ember">
          {record.sold ? "—" : `$${record.price}`}
        </span>
      </div>

      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-haze/70">
        {record.format} · {record.condition}
        {record.year ? ` · ${record.year}` : ""}
      </p>
    </button>
  );
}
