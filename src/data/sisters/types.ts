/**
 * Sister class pages: one module per slug under `classes/`, registered in `registry.ts`.
 *
 * Images live under `public/images/sisters/<slug>/`:
 * - Class composite: whatever `heroImageFile` names (e.g. `class-composite.jpg`).
 * - Members: `<#>-<firstname>-<lastname>.<ext>` (see `paths.ts`).
 */

export type ClassMemberRecord = {
  lineNumber: number | string;
  firstName: string;
  lastName: string;
  /** Optional: force this extension if that file exists (otherwise any .jpg/.jpeg/.png/.webp on disk is picked at build time). */
  imageExt?: "jpg" | "jpeg" | "png" | "webp";
  /** Use only if the file does not follow the standard naming pattern. */
  portraitOverride?: string;
  nickname?: string;
  big?: string;
  majorMinor?: string;
  talkToMeAbout?: string;
};

export type SisterClassPageDef = {
  /** File inside `public/images/sisters/<slug>/` */
  heroImageFile: string;
  heroAlt?: string;
  rushTerm: string;
  heroTitle?: string;
  members: ClassMemberRecord[];
};

/** Resolved shape consumed by React components (absolute public paths). */
export type ClassMemberBio = {
  portraitSrc: string;
  lineNumber?: number | string;
  name: string;
  nickname?: string;
  big?: string;
  majorMinor?: string;
  talkToMeAbout?: string;
};

export type SisterClassPageData = {
  heroImageSrc: string;
  heroAlt?: string;
  rushTerm: string;
  heroTitle?: string;
  members: ClassMemberBio[];
};
