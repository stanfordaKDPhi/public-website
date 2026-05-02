import Image from "next/image";
import Link from "next/link";

/**
 * One section on `/sisters`: class title, composite (left), roster + CTA (right).
 * Roster uses two columns from `sm` up so long lists stay compact.
 */
export function SistersClassOverview({
  slug,
  label,
  heroSrc,
  heroAlt,
  memberNames,
}: {
  slug: string;
  label: string;
  heroSrc: string;
  heroAlt: string;
  memberNames: readonly string[];
}) {
  const shortName = label.replace(/\s+Class\s*$/i, "").trim();
  const meetLabel = `Meet the ${shortName}s`;

  return (
    <section className="border-b border-[var(--color-compassion)]/10 pb-16 pt-2 last:border-0 last:pb-0">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--color-compassion)]/12 bg-[var(--color-service)] shadow-sm">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            className="object-cover object-[center_40%]"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-6 sm:gap-8">
          <h2 className="w-full max-w-2xl text-center font-[family-name:var(--font-serif)] text-2xl font-semibold text-[var(--color-compassion)] sm:text-3xl">
            {shortName}
          </h2>
          {memberNames.length > 0 ? (
            <ul className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-x-10 gap-y-2.5 text-center font-[family-name:var(--font-serif)] text-base leading-snug text-neutral-900 sm:grid-cols-2 sm:text-lg">
              {memberNames.map((name) => (
                <li key={`${slug}-${name}`}>{name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-neutral-500 sm:text-base">
              Roster coming soon.
            </p>
          )}
          <Link
            href={`/sisters/${slug}`}
            className="inline-flex min-w-[14rem] items-center justify-center rounded bg-neutral-700 px-6 py-2.5 text-center font-[family-name:var(--font-sans-nav)] text-sm font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-neutral-800"
          >
            {meetLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
