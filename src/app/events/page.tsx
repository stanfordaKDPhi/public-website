import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Events | Stanford aKDPhi",
  description: "Upcoming and past events — Stanford aKDPhi Zeta Chapter.",
};

export default function EventsPage() {
  return (
    <PageShell title="Events">
      <p>
        Check back later to see the list of events we've hosted in the past, and upcoming ones!
      </p>
    </PageShell>
  );
}
