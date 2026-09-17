import PageShell from "@/components/PageShell";
import ContactForm from "@/components/ContactForm";
import { shop } from "@/data/shop";

export const metadata = {
  title: `Contact — ${shop.name}`,
  description: `Get in touch with ${shop.name} in Atlanta.`,
};

export default function ContactPage() {
  return (
    <PageShell label="Contact">
      <h1 className="font-display text-4xl leading-tight text-paper sm:text-6xl">
        Contact
      </h1>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-paper/70 sm:text-lg">
        <p>
          Questions, bookings, or just want to say hello? Reach out — we&apos;d
          love to hear from you.
        </p>
      </div>

      <dl className="mt-10 space-y-6">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
            Instagram
          </dt>
          <dd className="mt-1">
            <a
              href={shop.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-paper transition hover:text-ember"
            >
              {shop.handle}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
            Location
          </dt>
          <dd className="mt-1">
            <a
              href={shop.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-paper transition hover:text-ember"
            >
              {shop.address}
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
