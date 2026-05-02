import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/PageShell";
import { sisterClasses } from "@/lib/sisterClasses";

export const metadata: Metadata = {
  title: "Sisters | Stanford aKDPhi",
  description: "Meet the sisters of Stanford aKDPhi — Zeta Chapter.",
};

export default function SistersPage() {
  return (
    <PageShell title="Sisters">
      <p>
        Browse each class below. Add roster photos, composites, and highlights
        on the individual class pages.
      </p>
      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {sisterClasses.map(({ slug, label }) => (
          <li key={slug}>
            <Link
              href={`/sisters/${slug}`}
              className="text-[var(--color-compassion)] underline-offset-2 hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
