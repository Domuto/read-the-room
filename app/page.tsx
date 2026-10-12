import Image from "next/image";
import Link from "next/link";
import { shop } from "@/data/shop";
import AmbientAudio from "@/components/home/AmbientAudio";
import MobileMenu from "@/components/home/MobileMenu";
import NewsletterSignup from "@/components/NewsletterSignup";

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

      {/* Hamburger menu for phones (top nav is hidden below sm).
          Kept outside the header so its overlay isn't trapped under the
          header's z-10 stacking context. */}
      <MobileMenu />

      {/* Screen-reader and search-engine indexable content.
          Keeps the visual landing page minimal while providing rich context
          and crawlable links for SEO without altering visual appearance. */}
      <div className="sr-only">
        <h1>
          {shop.name} — Vinyl Record Bar &amp; Cocktail Lounge on the BeltLine
          in Old Fourth Ward, Atlanta
        </h1>
        <p>
          Welcome to {shop.name}, an intimate hi-fi vinyl listening bar and
          cocktail lounge located at {shop.address} in Atlanta, Georgia. Situated
          along the Eastside Trail of the Atlanta BeltLine, {shop.name} pairs
          analog sound, curated record crates, song-named craft cocktails,
          bites, and coffee in a warm, low-lit space built for music lovers.
        </p>

        <section>
          <h2>Analog Sound &amp; The Vinyl Experience</h2>
          <p>
            At {shop.name}, the needle drops and the drinks pour slow. Our
            listening room features a high-fidelity analog sound system spinning
            records all night long, spanning classic soul, funk, jazz, rare
            groove, disco, rhythm &amp; blues, and golden era hip-hop. Whether
            you are settling into a booth for a full album side or browsing our
            physical bins, every evening is tuned to the room.
          </p>
        </section>

        <section>
          <h2>The Crate &amp; 3D Virtual Tour</h2>
          <p>
            Explore our collection online through The Crate, a digital
            record-flipping experience where you can browse vinyl pressings,
            condition ratings, and featured titles before your visit. You can
            also take our interactive 3D virtual tour to preview our bar
            seating, listening booths, and analog DJ booth.
          </p>
        </section>

        <section>
          <h2>Cocktails, Bites &amp; Daytime Coffee</h2>
          <p>
            Our bar program celebrates classic records with handcrafted
            cocktails named after timeless songs and legendary artists. We also
            serve natural wines, local craft beers, zero-proof mocktails, light
            bites, and daytime coffee for those looking to work or unwind with a
            soundtrack.
          </p>
        </section>

        <section>
          <h2>Hours &amp; Location</h2>
          <p>
            Visit us in Old Fourth Ward at {shop.address}.
            Our opening hours are:
          </p>
          <ul>
            <li>Wednesday: 12:00 PM – 10:00 PM</li>
            <li>Thursday: 12:00 PM – 2:00 AM</li>
            <li>Friday &amp; Saturday: 12:00 PM – 2:30 AM</li>
            <li>Sunday: 12:00 PM – 10:00 PM</li>
            <li>Monday &amp; Tuesday: Closed</li>
          </ul>
          <p>
            Phone: <a href={shop.phoneHref}>{shop.phone}</a>
          </p>
        </section>

        <nav aria-label="Explore Read the Room">
          <h2>Site Navigation</h2>
          <ul>
            <li>
              <Link href="/menu">Cocktail, Coffee &amp; Food Menu</Link>
            </li>
            <li>
              <Link href="/events">Upcoming Events &amp; DJ Lineups</Link>
            </li>
            <li>
              <Link href="/about">
                About Read the Room — Our Story &amp; Space
              </Link>
            </li>
            <li>
              <Link href="/private-events">
                Private Events &amp; Space Buyouts
              </Link>
            </li>
            <li>
              <Link href="/contact">Contact Information &amp; Inquiries</Link>
            </li>
            <li>
              <Link href="/visit">
                Visit Us — Address, Hours &amp; Directions
              </Link>
            </li>
            <li>
              <Link href="/crate">The Crate — Browse Vinyl Records</Link>
            </li>
            <li>
              <Link href="/tour">3D Virtual Tour of the Lounge</Link>
            </li>
            <li>
              <a
                href={shop.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow @readtheroom.atl on Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-center px-5 py-5 sm:px-8 lg:justify-between">
        <Image
          src="/readtheroom.png"
          alt={`${shop.name} logo`}
          width={260}
          height={70}
          priority
          className="h-12 w-auto sm:h-14"
        />
        <nav className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-6 lg:static lg:mr-16 lg:flex lg:translate-y-0">
          <Link
            href="/menu"
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 transition hover:text-paper/80"
          >
            Menu
          </Link>
          <Link
            href="/events"
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 transition hover:text-paper/80"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 transition hover:text-paper/80"
          >
            About
          </Link>
          <Link
            href="/private-events"
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 transition hover:text-paper/80"
          >
            Private Events
          </Link>
          <Link
            href="/contact"
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 transition hover:text-paper/80"
          >
            Contact
          </Link>
          <Link
            href="/visit"
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 transition hover:text-paper/80"
          >
            Visit
          </Link>
          <a
            href={shop.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40 transition hover:text-paper/80"
          >
            Instagram
          </a>
        </nav>
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

      {/* Mobile newsletter signup, sits above the Tour / Crate buttons.
          Centering uses -translate-x-1/2 (a transform); keep animate-fade-up
          on the inner element so its transform doesn't override the centering. */}
      <div className="absolute bottom-32 left-1/2 z-20 -translate-x-1/2 sm:hidden">
        <NewsletterSignup className="animate-fade-up" />
      </div>

      {/* Desktop: tagline + newsletter signup, bottom-left */}
      <div className="absolute bottom-8 left-8 z-20 hidden max-w-md animate-fade-up flex-col gap-3 sm:flex">
        <p className="text-left font-mono text-sm uppercase tracking-[0.25em] text-paper/70">
          Vinyl & cocktails
        </p>
        <NewsletterSignup />
      </div>

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
