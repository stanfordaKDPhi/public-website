/**
 * “Alpha {Greek letter} Class” — route slugs under `/sisters/<slug>/`.
 * Page copy and rosters live in `src/data/sisters/classes/<slug>.ts` (see `registry.ts`).
 * Images: `public/images/sisters/<slug>/` (hero + `#-firstname-lastname` portraits: `.jpg`, `.jpeg`, `.png`, or `.webp` — detected at build).
 */
const GREEK_THROUGH_OMICRON = [
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "Omicron",  
] as const;

function toSlug(segment: string) {
  return segment.toLowerCase().replace(/\s+/g, "-");
}

export type SisterClass = {
  slug: string;
  label: string;
};

export const sisterClasses: readonly SisterClass[] = GREEK_THROUGH_OMICRON.map(
  (letter) => {
    const label = `Alpha ${letter} Class`;
    const slug = `alpha-${toSlug(letter)}`;
    return { slug, label };
  },
);

export function getSisterClassBySlug(slug: string): SisterClass | undefined {
  return sisterClasses.find((c) => c.slug === slug);
}
