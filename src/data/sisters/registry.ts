/**
 * Wire each slug to its module in `classes/`. Set the export in that file from `null`
 * to a `SisterClassPageDef` when the folder under `public/images/sisters/<slug>/` is ready.
 *
 * Route slugs are defined in `src/lib/sisterClasses.ts` (keep them in sync).
 */
import { alphaIotaClassPage } from "./classes/alpha-iota";
import { alphaKappaClassPage } from "./classes/alpha-kappa";
import { alphaLambdaClassPage } from "./classes/alpha-lambda";
import { alphaMuClassPage } from "./classes/alpha-mu";
import { alphaNuClassPage } from "./classes/alpha-nu";
import { alphaOmicronClassPage } from "./classes/alpha-omicron";
import { alphaXiClassPage } from "./classes/alpha-xi";
import { resolveSisterClassPage } from "./resolve";
import type { SisterClassPageData, SisterClassPageDef } from "./types";

const defsBySlug: Record<string, SisterClassPageDef | null> = {
  "alpha-iota": alphaIotaClassPage,
  "alpha-kappa": alphaKappaClassPage,
  "alpha-lambda": alphaLambdaClassPage,
  "alpha-mu": alphaMuClassPage,
  "alpha-nu": alphaNuClassPage,
  "alpha-xi": alphaXiClassPage,
  "alpha-omicron": alphaOmicronClassPage,
};

export function getSisterClassPageData(
  slug: string,
): SisterClassPageData | undefined {
  const def = defsBySlug[slug];
  if (def == null) return undefined;
  return resolveSisterClassPage(slug, def);
}
