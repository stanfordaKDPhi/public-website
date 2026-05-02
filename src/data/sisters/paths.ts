import type { ClassMemberRecord } from "./types";

/** Folder name must match the route slug, e.g. `alpha-nu`. */
export function sisterClassPublicDir(slug: string) {
  return `/images/sisters/${slug}`;
}

export function toFileSegment(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** Default portrait URL (`.jpg`) — build uses `discoverPortrait.ts` to pick an existing file. */
export function memberPortraitPath(
  slug: string,
  member: Pick<
    ClassMemberRecord,
    "lineNumber" | "firstName" | "lastName" | "imageExt"
  >,
) {
  const ext = member.imageExt ?? "jpg";
  const first = toFileSegment(member.firstName);
  const last = toFileSegment(member.lastName);
  return `${sisterClassPublicDir(slug)}/${member.lineNumber}-${first}-${last}.${ext}`;
}

/** Hero / class composite: any filename you set in the class data file. */
export function classHeroPath(slug: string, heroImageFile: string) {
  const file = heroImageFile.replace(/^\/+/, "");
  return `${sisterClassPublicDir(slug)}/${file}`;
}
