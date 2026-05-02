import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact | Stanford aKDPhi",
  description: "Get in touch with Stanford aKDPhi — Zeta Chapter.",
};

export default function ContactPage() {
  return (
    <PageShell title="Contact">
      <p>
        Add email, Instagram, and other contact details here. Placeholder
        content for now.
      </p>
    </PageShell>
  );
}
