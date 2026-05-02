import type { RushArchiveEdition } from "@/data/rush/discoverRushArchive";

import { RushArchiveLightbox } from "@/components/RushArchiveLightbox";

export function RushArchiveGallery({
  editions,
}: {
  editions: RushArchiveEdition[];
}) {
  if (editions.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[var(--color-compassion)]/25 bg-[var(--color-service)]/60 px-4 py-6 text-center text-sm text-neutral-600">
        Past rush photos will appear here once you add images under{" "}
        <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-xs text-neutral-800">
          public/images/rush/
        </code>
        — one folder per rush (for example{" "}
        <code className="font-mono text-xs">2025-spring</code>
        ). Folders are ordered with the most recent rush first.
      </p>
    );
  }

  return <RushArchiveLightbox editions={editions} />;
}
