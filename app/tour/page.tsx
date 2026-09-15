import Link from "next/link";
import { shop } from "@/data/shop";

export const metadata = {
  title: `3D Tour — ${shop.name}`,
  description: "Step inside the shop with an interactive 3D walkthrough.",
};

// Matterport space embedded in-page so it never sends visitors off-site.
const MATTERPORT_SRC =
  "https://my.matterport.com/show/?m=6CMHTFhFgNo&play=1&qs=1";

export default function TourPage() {
  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-ink">
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
            3D Tour
          </span>
        </div>
      </header>

      {/* Embedded walkthrough fills the rest of the viewport */}
      <div className="relative flex-1">
        <iframe
          title={`${shop.name} — 3D Tour`}
          src={MATTERPORT_SRC}
          className="absolute inset-0 h-full w-full border-0"
          allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
          allowFullScreen
        />
      </div>
    </div>
  );
}
