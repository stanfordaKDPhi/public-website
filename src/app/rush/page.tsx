import type { Metadata } from "next";

import { PageShell } from "@/components/PageShell";
import { RushArchiveGallery } from "@/components/RushArchiveGallery";
import { discoverRushArchive } from "@/data/rush/discoverRushArchive";

export const metadata: Metadata = {
  title: "Rush | Stanford aKDPhi",
  description: "Recruitment information — Stanford aKDPhi Zeta Chapter.",
};

export default function RushPage() {
  const archive = discoverRushArchive();

  return (
    <PageShell title="Rush" wide>
      <div className="space-y-10">
        <div className="space-y-4">
          <p>
            Interested in alpha Kappa Delta Phi at Stanford? This page will
            grow with rush schedules, FAQs, and how to join. Check back for{" "}
            <strong className="font-semibold text-neutral-900">
              2027 RUSH
            </strong>{" "}
            details.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[var(--color-compassion)] sm:text-2xl">
            Past rush
          </h2>
          <p className="text-sm text-neutral-600">
            Check out some of our previous rush week events!
          </p>
          <RushArchiveGallery editions={archive} />
        </div>
      </div>
    </PageShell>
  );
}
