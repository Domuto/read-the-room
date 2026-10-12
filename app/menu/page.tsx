import PageShell from "@/components/PageShell";
import { menu } from "@/data/menu";
import { shop } from "@/data/shop";

export const metadata = {
  alternates: { canonical: "/menu" },
  title: `Menu — ${shop.name}`,
  description: `Song-named cocktails, bites and coffee at ${shop.name}, a vinyl record bar on the BeltLine in Old Fourth Ward, Atlanta.`,
};

export default function MenuPage() {
  return (
    <PageShell label="Menu">
      <h1 className="font-display text-4xl leading-tight text-paper sm:text-6xl">
        Menu
      </h1>
      <p className="mt-8 text-base leading-relaxed text-paper/70 sm:text-lg">
        Song-named cocktails, bites and coffee — poured slow, served with the
        record of the night.
      </p>

      {menu.length === 0 ? (
        <p className="mt-12 border-l-2 border-ember pl-5 text-base leading-relaxed text-paper/70 sm:text-lg">
          The full menu is on its way. Follow{" "}
          <a
            href={shop.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper underline decoration-paper/30 underline-offset-4 transition hover:text-ember"
          >
            {shop.handle}
          </a>{" "}
          for what&apos;s pouring.
        </p>
      ) : (
        <div className="mt-12 space-y-14">
          {menu.map((section) => (
            <section key={section.title}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
                {section.title}
              </h2>
              {section.blurb && (
                <p className="mt-2 text-sm text-haze">{section.blurb}</p>
              )}
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-6 py-4"
                  >
                    <div>
                      <h3 className="font-display text-xl text-paper">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-paper/60">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.price && (
                      <span className="shrink-0 font-mono text-sm text-paper/80">
                        {item.price}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}
