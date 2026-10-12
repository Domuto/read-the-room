import PageShell from "@/components/PageShell";
import ContactForm from "@/components/ContactForm";
import Hours from "@/components/Hours";
import { shop } from "@/data/shop";

export const metadata = {
  alternates: { canonical: `${shop.url}/contact` },
  title: `Contact — ${shop.name}`,
  description: `Contact information, address, phone number, and hours for ${shop.name}, a vinyl record bar on the BeltLine in Old Fourth Ward, Atlanta.`,
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact — ${shop.name}`,
  url: `${shop.url}/contact`,
  description: `Get in touch with ${shop.name} in Atlanta. Find our address, phone number, hours, and send a message.`,
  mainEntity: {
    "@type": "BarOrPub",
    name: shop.name,
    url: shop.url,
    telephone: shop.phone,
    hasMap: shop.maps,
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.street,
      addressLocality: shop.city,
      addressRegion: shop.region,
      postalCode: shop.postalCode,
      addressCountry: "US",
    },
    openingHoursSpecification: shop.hours
      .filter((h) => h.opens !== h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.schemaDays,
        opens: h.opens,
        closes: h.closes,
      })),
  },
};

export default function ContactPage() {
  return (
    <PageShell label="Contact">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <h1 className="font-display text-4xl leading-tight text-paper sm:text-6xl">
        Contact
      </h1>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-paper/70 sm:text-lg">
        <p>
          Questions, bookings, or just want to say hello? Reach out — we&apos;d
          love to hear from you.
        </p>
      </div>

      <dl className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
            Address &amp; Directions
          </dt>
          <dd className="mt-2 text-base text-paper">
            <address className="not-italic leading-relaxed text-paper/85">
              <p>{shop.street}</p>
              <p>
                {shop.city}, {shop.region} {shop.postalCode}
              </p>
              <p className="font-mono text-xs text-haze">{shop.neighborhood}</p>
            </address>
            <p className="mt-2">
              <a
                href={shop.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-wider text-ember underline underline-offset-4 transition hover:text-paper"
              >
                Open in Google Maps &rarr;
              </a>
            </p>
          </dd>
        </div>

        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
            Hours
          </dt>
          <dd className="mt-2 text-base text-paper">
            <Hours className="space-y-1.5" />
          </dd>
        </div>

        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
            Phone
          </dt>
          <dd className="mt-2">
            <a
              href={shop.phoneHref}
              className="text-base text-paper transition hover:text-ember"
            >
              {shop.phone}
            </a>
          </dd>
        </div>

        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
            Instagram
          </dt>
          <dd className="mt-2">
            <a
              href={shop.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-paper transition hover:text-ember"
            >
              {shop.handle}
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-12 border-t border-line pt-10">
        <h2 className="font-display text-2xl text-paper sm:text-3xl">
          Send a message
        </h2>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
}
