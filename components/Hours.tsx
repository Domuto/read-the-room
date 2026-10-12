import { shop } from "@/data/shop";

// Opening hours as text; falls back to Instagram until hours are confirmed.
export default function Hours({ className = "" }: { className?: string }) {
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
        <li key={h.days}>
          {h.days}: {h.time}
        </li>
      ))}
    </ul>
  );
}
