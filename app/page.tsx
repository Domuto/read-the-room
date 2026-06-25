import Link from "next/link";
import { shop } from "@/data/shop";

const buttonClass =
  "rounded-full border border-paper/30 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:border-ember hover:bg-ember hover:text-ink";

export default function Home() {
  return (
    <main className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-ink">
      {/* ── VIDEO BACKGROUND ──────────────────────────────────────
          Drop your file at  /public/hero.mp4  (and optionally a still
          frame at /public/hero-poster.jpg). Until then, the warm
          gradient below shows on its own. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
        >
          <source src="/readtheroom.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80">
          {shop.handle}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80">
          {shop.hours}
        </span>
      </header>

      {/* Center */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <p className="mt-6 max-w-md animate-fade-up font-mono text-sm uppercase tracking-[0.25em] text-paper/70">
          {shop.tagline}
        </p>

        <nav className="mt-10 flex items-center justify-center">
          <Link href="/crate" className={buttonClass}>
            The Crate
          </Link>
        </nav>
      </div>

      {/* Bottom line */}
      <footer className="relative z-10 px-5 py-6 text-center sm:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
          Spin something good
        </span>
      </footer>
    </main>
  );
}
