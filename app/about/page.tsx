import Image from "next/image";
import PageShell from "@/components/PageShell";
import { shop } from "@/data/shop";

export const metadata = {
  title: `About Us — ${shop.name}`,
  description: `About ${shop.name} — a vinyl record bar and cocktail lounge in Atlanta.`,
};

const details = [
  {
    k: "The Bar",
    v: "Low light, stiff pours, and a house list built around the night.",
  },
  {
    k: "The Crate",
    v: "Records worth flipping for — dug deep, spun loud, all night long.",
  },
  {
    k: "The Room",
    v: "Analog sound, warm company, and no reason to look at your phone.",
  },
];

export default function AboutPage() {
  return (
    <PageShell label="About Us">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ember">
        {shop.tagline}
      </p>

      <h1 className="mt-5 font-display text-5xl leading-[0.95] text-paper sm:text-7xl">
        A room built for
        <span className="block text-ember">the late set.</span>
      </h1>

      <figure className="mt-10 overflow-hidden rounded-xl border border-line">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/records/IMG_7899.JPG"
            alt={`Inside ${shop.name}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </figure>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-paper/75 sm:text-xl">
        <p>
          <span className="font-display text-paper">{shop.name}</span> is a
          vinyl record bar and cocktail lounge in Atlanta — a dim, warm room
          where the needle drops and the drinks pour slow. Dig the crate, order
          something strong, and stay for the whole side.
        </p>
        <p>
          We built this place around a simple idea: great records and a great
          cocktail belong in the same room. Whether you&apos;re here to flip
          through the bins, chase a new favorite pressing, or just sink into a
          booth and read the room — there&apos;s always something worth
          hearing.
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        {details.map((d) => (
          <div key={d.k} className="bg-panel p-6 sm:p-7">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
              {d.k}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-paper/70">{d.v}</p>
          </div>
        ))}
      </div>

      <p className="mt-14 border-l-2 border-ember pl-5 font-display text-2xl leading-snug text-paper/90 sm:text-3xl">
        Vinyl on the platter. A cocktail in hand. Nowhere else to be.
      </p>
    </PageShell>
  );
}
