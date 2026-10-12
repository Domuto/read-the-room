import Link from "next/link";
import PageShell from "@/components/PageShell";
import Hours from "@/components/Hours";
import { shop } from "@/data/shop";

export const metadata = {
  alternates: { canonical: "/visit" },
  title: `Visit — ${shop.name}`,
  description: `Find ${shop.name}, a vinyl record bar on the BeltLine in Old Fourth Ward, Atlanta: address, phone, hours and directions.`,
};

export default function VisitPage() {
  return (
    <PageShell label="Visit">
      <h1 className="font-display text-4xl leading-[1.05] text-paper sm:text-6xl">
        A vinyl record bar on the BeltLine in{" "}
        <span className="text-ember">Old Fourth Ward.</span>
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-paper/75">
        {shop.name} pairs a crate of records worth flipping with song-named
        cocktails, bites and coffee. Dig a record, order something strong, and
        stay for the whole side.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.2em]">
        {[
          { href: "/menu", label: "Menu" },
          { href: "/events", label: "Events" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex items-center justify-center rounded-full border border-paper/30 px-6 py-3 text-paper transition hover:border-ember hover:bg-ember hover:text-ink"
          >
            {l.label}
          </Link>
        ))}
        <a
          href={shop.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-paper/30 px-6 py-3 text-paper transition hover:border-ember hover:bg-ember hover:text-ink"
        >
          Instagram
        </a>
      </div>

      <h2 className="mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
        Find us
      </h2>
      <address className="mt-4 space-y-2 not-italic text-paper/80">
        <p>
          {shop.street}
          <br />
          {shop.city}, {shop.region} {shop.postalCode}
        </p>
        <p>
          <a href={shop.phoneHref} className="transition hover:text-ember">
            {shop.phone}
          </a>
        </p>
        <Hours />
        <p>
          <a
            href={shop.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-paper/30 underline-offset-4 transition hover:text-ember"
          >
            Get directions
          </a>
        </p>
      </address>

      <iframe
        title={`Map to ${shop.name}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(shop.address)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="mt-10 h-80 w-full rounded-xl border border-line"
      />
    </PageShell>
  );
}
