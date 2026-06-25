import { CrateRecord, coverColor } from "@/data/records";

/**
 * Renders the front of a record.
 * - If the record has an `image`, show it.
 * - Otherwise generate a clean typographic cover from the metadata,
 *   so the crate looks intentional even before you add photos.
 *
 * `large` bumps the type sizes for the detail / front-of-crate view.
 */
export default function Cover({
  record,
  large = false,
}: {
  record: CrateRecord;
  large?: boolean;
}) {
  if (record.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={record.image}
        alt={`${record.artist} — ${record.title}`}
        loading="lazy"
        draggable={false}
        className={`h-full w-full object-cover ${
          record.sold ? "grayscale" : ""
        }`}
      />
    );
  }

  const bg = coverColor(record.id);

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-4 sm:p-5"
      style={{ background: bg }}
    >
      <span
        className={`relative z-10 font-mono uppercase tracking-[0.18em] text-black/55 ${
          large ? "text-xs" : "text-[10px]"
        }`}
      >
        {record.genre}
      </span>

      <div className="relative z-10">
        <p
          className={`font-display font-extrabold leading-[0.95] text-black/85 ${
            large ? "text-3xl sm:text-4xl" : "text-lg"
          }`}
        >
          {record.artist}
        </p>
        <p
          className={`mt-1 font-mono text-black/55 ${
            large ? "text-sm" : "text-[11px]"
          }`}
        >
          {record.title}
        </p>
      </div>

      {/* groove rings — the recurring "record" motif */}
      <div
        className={`pointer-events-none absolute rounded-full border border-black/10 ${
          large ? "-right-20 -top-20 h-60 w-60" : "-right-12 -top-12 h-40 w-40"
        }`}
      />
      <div
        className={`pointer-events-none absolute rounded-full border border-black/10 ${
          large ? "-right-32 -top-32 h-96 w-96" : "-right-20 -top-20 h-64 w-64"
        }`}
      />
    </div>
  );
}
