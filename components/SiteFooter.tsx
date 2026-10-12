import Link from "next/link";
import { shop } from "@/data/shop";

const linkClass = "transition hover:text-ember";

// Shared footer: name/address/phone as real text, plus nav and Instagram.
export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <address className="not-italic">
          <p className="font-display text-lg font-bold text-paper">
            {shop.name}
          </p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-haze">
            {shop.street}
            <br />
            {shop.city}, {shop.region} {shop.postalCode}
            <br />
            <a href={shop.phoneHref} className={linkClass}>
              {shop.phone}
            </a>
          </p>
        </address>

        <nav
          aria-label="Footer"
          className="flex flex-wrap content-start gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-paper/80 sm:max-w-sm sm:justify-end"
        >
          <Link href="/menu" className={linkClass}>
            Menu
          </Link>
          <Link href="/events" className={linkClass}>
            Events
          </Link>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <Link href="/private-events" className={linkClass}>
            Private Events
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
          <Link href="/visit" className={linkClass}>
            Visit
          </Link>
          <Link href="/crate" className={linkClass}>
            The Crate
          </Link>
          <a
            href={shop.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Instagram
          </a>
          <a
            href={shop.maps}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Directions
          </a>
        </nav>
      </div>
      <p className="border-t border-line px-5 py-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
        {shop.tagline}
      </p>
    </footer>
  );
}
