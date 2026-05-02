import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
]);

export type RushArchiveImage = {
  src: string;
  alt: string;
  /** Rush term for hover / lightbox (e.g. "Spring 2026"). From folder name or parsed filename. */
  quarter: string;
};

export type RushArchiveEdition = {
  slug: string;
  title: string;
  images: RushArchiveImage[];
};

const SEASON_ORDER: Record<string, number> = {
  winter: 0,
  spring: 1,
  summer: 2,
  fall: 3,
};

/**
 * Try to read a rush quarter from a loose image filename (no folder), e.g.
 * `spring-2026-poster.jpg`, `rush_2025_winter.png`, `2024-spring-flyer.webp`.
 */
function quarterFromBasename(fileName: string): string | null {
  const base = fileName.replace(/\.[^.]+$/i, "");
  const cap = (w: string) =>
    w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

  let m = base.match(
    /(spring|summer|fall|winter)[-_\s]+(20\d{2}|19\d{2})\b/i,
  );
  if (m) return `${cap(m[1])} ${m[2]}`;

  m = base.match(/\b(20\d{2}|19\d{2})[-_\s]+(spring|summer|fall|winter)\b/i);
  if (m) return `${cap(m[2])} ${m[1]}`;

  const year = base.match(/\b(20\d{2}|19\d{2})\b/);
  const season = base.match(/\b(spring|summer|fall|winter)\b/i);
  if (year && season) return `${cap(season[1])} ${year[1]}`;

  if (year) return year[1];

  return null;
}

function slugToTitle(slug: string): string {
  const cap = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  let m = slug.match(/^(\d{4})[-_](spring|summer|fall|winter)\b/i);
  if (m) return `${cap(m[2])} ${m[1]}`;

  m = slug.match(/^(spring|summer|fall|winter)[-_](\d{4})\b/i);
  if (m) return `${cap(m[1])} ${m[2]}`;

  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Higher = more recent. Sort editions with `(b, a) => key(b) - key(a)`.
 * Loose files in `__root__` always rank last.
 */
function editionSortKey(slug: string): number {
  if (slug === "__root__") return Number.MIN_SAFE_INTEGER;

  let m = slug.match(/^(\d{4})[-_](spring|summer|fall|winter)\b/i);
  if (m) {
    const year = parseInt(m[1], 10);
    const season = m[2].toLowerCase();
    return year * 10 + (SEASON_ORDER[season] ?? 0);
  }

  m = slug.match(/^(spring|summer|fall|winter)[-_](\d{4})\b/i);
  if (m) {
    const year = parseInt(m[2], 10);
    const season = m[1].toLowerCase();
    return year * 10 + (SEASON_ORDER[season] ?? 0);
  }

  const looseYear = slug.match(/\b(19|20)\d{2}\b/);
  if (looseYear) {
    const year = parseInt(looseYear[0], 10);
    const seasonWord = slug.match(/(spring|summer|fall|winter)/i);
    const s = seasonWord
      ? (SEASON_ORDER[seasonWord[1].toLowerCase()] ?? 9)
      : 9;
    return year * 10 + s;
  }

  return 0;
}

function listImagesInDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: "base" }));
}

/**
 * Reads `public/images/rush/` at build time.
 *
 * **Per-term folders** (recommended): each subdirectory becomes one section, e.g.
 * `public/images/rush/2025-spring/`, `spring-2025/`, or `2024-winter/` — all images inside are shown.
 *
 * **Loose files** in the rush root are grouped into a single section. Each image gets a **quarter** label for
 * hover/lightbox: parsed from the filename when possible (`spring-2026-poster.jpg`, `2025-winter.png`, etc.),
 * otherwise `"Past rush"`. Prefer dated subfolders (`2026-spring/`) for a clear section title and quarter.
 */
export function discoverRushArchive(): RushArchiveEdition[] {
  const base = path.join(process.cwd(), "public", "images", "rush");
  if (!fs.existsSync(base)) return [];

  const dirents = fs.readdirSync(base, { withFileTypes: true });
  const editions: RushArchiveEdition[] = [];

  const subdirs = dirents.filter((d) => d.isDirectory());
  for (const d of subdirs) {
    const slug = d.name;
    if (slug.startsWith(".")) continue;

    const files = listImagesInDir(path.join(base, slug));
    if (files.length === 0) continue;

    const title = slugToTitle(slug);
    editions.push({
      slug,
      title,
      images: files.map((f) => ({
        src: `/images/rush/${slug}/${encodeURIComponent(f)}`,
        alt: `${title} rush — ${f.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}`,
        quarter: title,
      })),
    });
  }

  const rootFiles = dirents
    .filter(
      (d) => d.isFile() && IMAGE_EXT.has(path.extname(d.name).toLowerCase()),
    )
    .map((d) => d.name)
    .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: "base" }));

  if (rootFiles.length > 0) {
    const title =
      editions.length > 0 ? "More rush photos" : "Rush highlights";
    editions.push({
      slug: "__root__",
      title,
      images: rootFiles.map((f) => ({
        src: `/images/rush/${encodeURIComponent(f)}`,
        alt: `Rush — ${f.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}`,
        quarter: quarterFromBasename(f) ?? "Past rush",
      })),
    });
  }

  editions.sort((a, b) => {
    const diff = editionSortKey(b.slug) - editionSortKey(a.slug);
    if (diff !== 0) return diff;
    return b.slug.localeCompare(a.slug, undefined, { sensitivity: "base" });
  });
  return editions;
}
