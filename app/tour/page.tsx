import Link from "next/link";
import { shop } from "@/data/shop";

export const metadata = {
  title: `3D Tour — ${shop.name}`,
  description: "Step inside the shop with an interactive 3D walkthrough.",
};

// Matterport space embedded in-page so it never sends visitors off-site.
// Params strip the built-in chrome: hl=0 hides the highlight reel, brand=0 hides
// the logo/branding, mls=1 removes the Matterport link, help/title/mt hide the
// help, title and floor UI, and dh=0 skips the dollhouse intro.
const MATTERPORT_SRC =
  "https://my.matterport.com/show/?m=6CMHTFhFgNo&play=1&qs=1&hl=0&brand=0&mls=1&help=0&title=0&mt=0&dh=0";

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
        {/* Masks the non-interactive "Powered by Matterport" logo in the corner. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 h-14 w-52 bg-ink"
        />
      </div>
    </div>
  );
}
