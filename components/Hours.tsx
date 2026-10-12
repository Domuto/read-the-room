import { shop } from "@/data/shop";

// Opening hours as text; falls back to Instagram if hours are empty.
export default function Hours({ className = "space-y-1 text-sm" }: { className?: string }) {
  if (shop.hours.length === 0) {
    return (
      <p className={className}>
        Hours posted on{" "}
        <a
          href={shop.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-paper/30 underline-offset-4 transition hover:text-ember"
        >
          Instagram
        </a>
      </p>
    );
  }
  return (
    <ul className={className}>
      {shop.hours.map((h) => (
        <li key={h.days} className="flex max-w-xs items-baseline justify-between gap-4">
          <span className="text-paper/90">{h.days}</span>
          <span
            className={
              h.time === "Closed"
                ? "font-mono text-xs text-haze"
                : "font-mono text-xs text-paper/70"
            }
          >
            {h.time}
          </span>
        </li>
      ))}
    </ul>
  );
}
