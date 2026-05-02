import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Sisters | Stanford aKDPhi",
  description: "Meet the sisters of Stanford aKDPhi — Zeta Chapter.",
};

export default function SistersPage() {
  return (
    <PageShell title="Sisters">
      <p>
        Add roster photos, officer bios, or class years here. This is filler
        text you can replace with real content.
      </p>
    </PageShell>
  );
}
