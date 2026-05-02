import fs from "node:fs";
import path from "node:path";

import { sisterClassPublicDir, toFileSegment } from "./paths";
import type { ClassMemberRecord } from "./types";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/**
 * Looks for `public/images/sisters/<slug>/<#>-firstname-lastname>.<ext>`
 * (any supported image ext, case-insensitive stem + extension).
 * If `imageExt` is set, that file is tried first when present.
 */
export function discoverMemberPortraitSrc(
  slug: string,
  member: Pick<
    ClassMemberRecord,
    "lineNumber" | "firstName" | "lastName" | "imageExt"
  >,
): string {
  const first = toFileSegment(member.firstName);
  const last = toFileSegment(member.lastName);
  const base = `${member.lineNumber}-${first}-${last}`;
  const dir = path.join(process.cwd(), "public", "images", "sisters", slug);

  if (member.imageExt) {
    const forced = `${base}.${member.imageExt}`;
    if (fs.existsSync(path.join(dir, forced))) {
      return `${sisterClassPublicDir(slug)}/${forced}`;
    }
  }

  const found = findPortraitFilename(dir, base);
  if (found) {
    return `${sisterClassPublicDir(slug)}/${found}`;
  }

  return `${sisterClassPublicDir(slug)}/${base}.jpg`;
}

const EXT_ORDER = [".jpg", ".jpeg", ".png", ".webp"] as const;

function findPortraitFilename(dir: string, stem: string): string | null {
  if (!fs.existsSync(dir)) return null;
  const want = stem.toLowerCase();
  const matches: string[] = [];
  for (const f of fs.readdirSync(dir)) {
    const ext = path.extname(f);
    if (!IMAGE_EXT.has(ext.toLowerCase())) continue;
    const name = f.slice(0, -ext.length);
    if (name.toLowerCase() === want) matches.push(f);
  }
  if (matches.length === 0) return null;
  matches.sort((a, b) => extRank(a) - extRank(b));
  return matches[0] ?? null;
}

function extRank(filename: string): number {
  const e = path.extname(filename).toLowerCase();
  const i = EXT_ORDER.indexOf(e as (typeof EXT_ORDER)[number]);
  return i === -1 ? 99 : i;
}
