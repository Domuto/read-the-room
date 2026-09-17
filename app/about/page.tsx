import PageShell from "@/components/PageShell";
import { shop } from "@/data/shop";

export const metadata = {
  title: `About Us — ${shop.name}`,
  description: `About ${shop.name} — a vinyl record shop and coffee bar in Atlanta.`,
};

export default function AboutPage() {
  return (
    <PageShell label="About Us">
      <h1 className="font-display text-4xl leading-tight text-paper sm:text-6xl">
        About Us
      </h1>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-paper/70 sm:text-lg">
        <p>
          {shop.name} is a vinyl record shop and coffee bar in Atlanta — a room
          for the curious. Dig the crate, grab a coffee, and spin something
          good.
        </p>
        <p>
          We built this place around the idea that great records and great
          company belong together. Whether you&apos;re here to flip through the
          bins, sip a cocktail, or just read the room, there&apos;s always
          something worth listening to.
        </p>
      </div>
    </PageShell>
  );
}
