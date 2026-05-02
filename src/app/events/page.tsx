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
        List philanthropy, socials, info sessions, and other events here. This
        placeholder is ready for your calendar or event cards.
      </p>
    </PageShell>
  );
}
