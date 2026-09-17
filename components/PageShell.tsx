import Link from "next/link";
import { shop } from "@/data/shop";

// Shared frame for the simple content pages (About, Contact, Private Events).
export default function PageShell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-ink">
      {/* Sticky top bar */}
      <header className="z-40 border-b border-line bg-ink/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-paper/80 transition hover:text-ember"
          >
            ← {shop.name}
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-haze">
            {label}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-8 sm:py-24">
        {children}
      </main>

      <footer className="border-t border-line px-5 py-6 text-center sm:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
          {shop.tagline}
        </span>
      </footer>
    </div>
  );
}
