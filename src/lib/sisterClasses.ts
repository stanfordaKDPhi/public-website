/** “Alpha {Greek letter} Class”; slugs live under `/sisters/`. */
const GREEK_THROUGH_OMICRON = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
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
