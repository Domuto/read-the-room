import PageShell from "@/components/PageShell";
import PrivateEventForm from "@/components/PrivateEventForm";
import { shop } from "@/data/shop";

export const metadata = {
  title: `Private Events — ${shop.name}`,
  description: `Host your private event at ${shop.name} in Atlanta.`,
};

export default function PrivateEventsPage() {
  return (
    <PageShell label="Private Events">
      <h1 className="font-display text-4xl leading-tight text-paper sm:text-6xl">
        Private Events
      </h1>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-paper/70 sm:text-lg">
        <p>
          Looking for a space with character? {shop.name} is available for
          private events — listening parties, launches, birthdays, and
          after-hours gatherings, all soundtracked by vinyl.
        </p>
        <p>
          Tell us what you have in mind and we&apos;ll help you build the night
          around it, from the crate to the cocktails.
        </p>
      </div>

      <div className="mt-12 border-t border-line pt-10">
        <h2 className="font-display text-2xl text-paper sm:text-3xl">
          Inquire
        </h2>
        <div className="mt-6">
          <PrivateEventForm />
        </div>
      </div>
    </PageShell>
  );
}
