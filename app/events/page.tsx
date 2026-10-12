import Link from "next/link";
import PageShell from "@/components/PageShell";
import { events } from "@/data/events";
import { shop } from "@/data/shop";

export const metadata = {
  alternates: { canonical: "/events" },
  title: `Events & DJ Nights — ${shop.name}`,
  description: `DJ nights, listening parties and events at ${shop.name}, a vinyl record bar on the BeltLine in Old Fourth Ward, Atlanta.`,
};

// Re-render hourly so past events drop off without a redeploy.
export const revalidate = 3600;

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function EventsPage() {
  // Compare as ISO strings so server timezone can't hide today's events.
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <PageShell label="Events">
      <h1 className="font-display text-4xl leading-tight text-paper sm:text-6xl">
        Events &amp; DJ Nights
      </h1>
      <p className="mt-8 text-base leading-relaxed text-paper/70 sm:text-lg">
        Vinyl DJs, listening parties and late sets at {shop.name}, on the
        BeltLine in Old Fourth Ward.
      </p>

      {upcoming.length === 0 ? (
        <p className="mt-12 border-l-2 border-ember pl-5 text-base leading-relaxed text-paper/70 sm:text-lg">
          The next lineup is being booked. Follow{" "}
          <a
            href={shop.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper underline decoration-paper/30 underline-offset-4 transition hover:text-ember"
          >
            {shop.handle}
          </a>{" "}
          for dates, or{" "}
          <Link
            href="/private-events"
            className="text-paper underline decoration-paper/30 underline-offset-4 transition hover:text-ember"
          >
            host your own night
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {upcoming.map((e) => (
            <li key={`${e.date}-${e.title}`} className="py-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">
                {formatDate(e.date)}
                {e.time && ` · ${e.time}`}
              </p>
              <h2 className="mt-2 font-display text-2xl text-paper">
                {e.title}
              </h2>
              {e.dj && <p className="mt-1 text-sm text-haze">with {e.dj}</p>}
              {e.description && (
                <p className="mt-3 text-sm leading-relaxed text-paper/70">
                  {e.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
