import type { Metadata } from "next";
import { Fragment } from "react";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About | Stanford aKDPhi",
  description: "Learn about alpha Kappa Delta Phi at Stanford — Zeta Chapter.",
};

const boardCabinet2026 = [
  { role: "President", names: "Emily Lim" },
  { role: "Vice President of Internal Affairs", names: "Katy Zhang" },
  { role: "Vice President of External Affairs", names: "Lauren Yu" },
  { role: "Vice President of Service", names: "Angela Zhang" },
  { role: "New Member Educators", names: "Priyanka Gupta and Sarah Jacob" },
  { role: "Secretary", names: "Erika Li" },
  { role: "Treasurers", names: "Alison Kim and Myan Ngo" },
  { role: "Rush Chairs", names: "Alice Chen and An Doan" },
  { role: "Sisterhood Chairs", names: "Alyna Lu and Angelina Zhang" },
  { role: "Alumnae Relations Chair", names: "Lauren Yu" },
  { role: "Cultural Chairs", names: "Alyna Lu and Myan Ngo" },
  { role: "Publicity Chair", names: "Sherry Yan" },
  {
    role: "Fundraising Chair",
    names: "Angelina Zhang and Ninjin 'Jinnie' Bayarjargal",
  },
] as const;

export default function AboutPage() {
  return (
    <PageShell title="About">
      <p>
        alpha Kappa Delta Phi (aKDPhi) is Stanford&apos;s only and the world&apos;s
        first, largest, and most established Asian American interest sorority,
        with over 68 chapters and 9,000 initiated sisters. aKDPhi was first
        established in 1989, and the Zeta Chapter at Stanford University was
        established in 1993. Our sorority strives to promote sisterhood,
        scholarship, leadership, and Asian awareness in the university and the
        community, while encouraging the expression of the individual. We seek
        to empower ourselves as women, be an active force within the community,
        and support each other in achieving personal and collective goals.
      </p>

      <section
        aria-labelledby="executive-board-heading"
        className="mt-12 border-t border-[var(--rule)] pt-12"
      >
        <h2
          id="executive-board-heading"
          className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[var(--color-compassion)] sm:text-3xl"
        >
          Executive Board and Cabinet 2026
        </h2>
        <dl className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-[minmax(13rem,max-content)_1fr]">
          {boardCabinet2026.map(({ role, names }) => (
            <Fragment key={role}>
              <dt className="font-semibold text-neutral-800">{role}</dt>
              <dd className="text-neutral-700">{names}</dd>
            </Fragment>
          ))}
        </dl>
      </section>
    </PageShell>
  );
}
