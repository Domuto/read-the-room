import Link from "next/link";
import { records } from "@/data/records";
import { shop } from "@/data/shop";
import CrateClient from "@/components/CrateClient";

export const metadata = {
  title: `The Crate — ${shop.name}`,
  description: "Browse the records currently in the shop.",
};

export default function CratePage() {
  const available = records.filter((r) => !r.sold).length;

  return (
    <div className="min-h-[100dvh] bg-ink">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-paper/80 transition hover:text-ember"
          >
            ← {shop.name}
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-haze">
            {available} in the crate
          </span>
        </div>
      </header>

      {/* Intro */}
      <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember">
          Now in-store
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-paper sm:text-6xl">
          The Crate
        </h1>
        <p className="mt-4 max-w-xl text-haze">
          Everything on the shelves right now. Flip through it like you would in
          person — then come pull the record you want.
        </p>
      </div>

      <div className="mt-10">
        <CrateClient records={records} />
      </div>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="font-display text-lg font-bold text-paper">
              {shop.name}
            </p>
            <p className="mt-1 font-mono text-xs text-haze">
              {shop.address} · {shop.hours}
            </p>
          </div>
          <div className="flex gap-5">
            <a
              href={shop.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-paper/80 transition hover:text-ember"
            >
              Instagram
            </a>
            <a
              href={shop.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-paper/80 transition hover:text-ember"
            >
              Directions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
