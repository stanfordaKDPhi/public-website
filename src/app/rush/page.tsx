import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Rush | Stanford aKDPhi",
  description: "Recruitment information — Stanford aKDPhi Zeta Chapter.",
};

export default function RushPage() {
  return (
    <PageShell title="Rush">
      <p>
        Replace this with rush schedule, FAQs, and how to join. Placeholder
        content for now.
      </p>
    </PageShell>
  );
}
