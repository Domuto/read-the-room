import Image from "next/image";
import Link from "next/link";
import { shop } from "@/data/shop";
import AmbientAudio from "@/components/home/AmbientAudio";

const buttonClass =
  "inline-flex min-w-[7.5rem] items-center justify-center whitespace-nowrap rounded-full border border-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:border-ember hover:bg-ember hover:text-ink sm:min-w-0";

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

      {/* Ambient background music with a mute / unmute toggle */}
      <AmbientAudio />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-center px-5 py-5 sm:justify-start sm:px-8">
        <Image
          src="/readtheroom.png"
          alt={`${shop.name} logo`}
          width={260}
          height={70}
          priority
          className="h-12 w-auto sm:h-14"
        />
      </header>

      {/* Bottom-right CTA */}
      <div className="relative z-10 flex flex-1" />

      <nav className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-3 sm:bottom-8 sm:left-auto sm:translate-x-0 sm:justify-end sm:right-8">
        <Link href="/tour" className={buttonClass}>
          3D Tour
        </Link>
        <Link href="/crate" className={buttonClass}>
          The Crate
        </Link>
      </nav>

      <p className="absolute bottom-6 left-5 z-10 hidden max-w-md animate-fade-up text-left font-mono text-sm uppercase tracking-[0.25em] text-paper/70 sm:bottom-8 sm:left-8 sm:block">
        Vinyl & cocktails
      </p>

      {/* Bottom line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
      <footer className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 px-5 pb-2 pt-8 text-center sm:px-8 sm:pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
          Spin something good
        </span>
        <a
          href="https://ouragency.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto mt-0.5 block font-mono text-[7px] uppercase tracking-[0.3em] text-paper/20 transition hover:text-paper/50"
        >
          Website by OurAgency
        </a>
      </footer>
    </main>
  );
}
