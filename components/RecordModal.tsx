"use client";

import { useEffect } from "react";
import { CrateRecord } from "@/data/records";
import { shop } from "@/data/shop";
import Cover from "./Cover";

export default function RecordModal({
  record,
  onClose,
}: {
  record: CrateRecord | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (record) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [record, onClose]);

  if (!record) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${record.artist} — ${record.title}`}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl animate-fade-up overflow-y-auto rounded-t-2xl border border-line bg-panel sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-paper/80 backdrop-blur transition hover:bg-ink hover:text-ember"
        >
          ✕
        </button>

        <div className="grid sm:grid-cols-2">
          <div className="relative aspect-square">
            <Cover record={record} large />
          </div>

          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                {record.genre}
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-paper sm:text-3xl">
                {record.title}
              </h2>
              <p className="mt-1 text-haze">
                {record.artist}
                {record.year ? ` · ${record.year}` : ""}
              </p>
            </div>

            {/* Catalog spec — styled like a record-store sticker */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line font-mono text-xs">
              <Spec label="Format" value={record.format} />
              <Spec label="Condition" value={record.condition} />
              <Spec
                label="Price"
                value={record.sold ? "Sold" : `$${record.price}`}
                accent={!record.sold}
              />
              <Spec label="Year" value={record.year ? String(record.year) : "—"} />
            </dl>

            {record.notes && (
              <p className="text-sm leading-relaxed text-haze">{record.notes}</p>
            )}

            <div className="mt-auto pt-2">
              {record.sold ? (
                <div className="rounded-full border border-line px-5 py-3 text-center font-mono text-xs uppercase tracking-widest text-haze">
                  No longer in the crate
                </div>
              ) : (
                <a
                  href={shop.instagramDM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full bg-ember px-5 py-3 text-center font-mono text-xs uppercase tracking-widest text-ink transition hover:bg-gold"
                >
                  DM {shop.handle} to hold
                </a>
              )}
              <p className="mt-3 text-center font-mono text-[11px] text-haze/70">
                Available in store · {shop.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-panel px-4 py-3">
      <dt className="text-[10px] uppercase tracking-widest text-haze/70">
        {label}
      </dt>
      <dd className={`mt-1 text-sm ${accent ? "text-ember" : "text-paper"}`}>
        {value}
      </dd>
    </div>
  );
}
