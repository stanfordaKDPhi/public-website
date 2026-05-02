import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "About | Stanford aKDPhi",
  description: "Learn about alpha Kappa Delta Phi at Stanford — Zeta Chapter.",
};

const ABOUT_HERO_SRC =
  "/images/photos/aKDPhi2026-biglittlereveals-group.JPG";

const boardCabinet2026 = [
  { role: "President", names: "Angie Zhang" },
  { role: "Vice President of Internal Affairs", names: "Nancy Zhang" },
  { role: "Vice President of External Affairs", names: "Katy Zhang" },
  { role: "Vice President of Service", names: "Angela Zhang" },
  { role: "New Member Educators", names: "Lauren Yu, Ally Kim and Emily Lim" },
  { role: "Secretary", names: "Alyna Lu" },
  { role: "Treasurers", names: "Hallie Xu" },
  { role: "Rush Chairs", names: "Myan Ngo and Christina Duong" },
  { role: "Sisterhood Chairs", names: "Iona Xia and Jolie Li" },
  { role: "Alumnae Relations Chair", names: "Gabi Guidero" },
  { role: "Cultural Chairs", names: "Luluka Aibyek and Grace Zhao" },
  { role: "Publicity Chair", names: "Emily Lim" },
  { role: "Fundraising Chair", names: "Erika Li" },
] as const;

/** Matches `main` padding in `layout.tsx` so the hero can sit flush under the fixed header. */
const MAIN_TOP_OFFSET = "-mt-[7.25rem] sm:-mt-16";

export default function AboutPage() {
  return (
    <article className={`flex flex-1 flex-col ${MAIN_TOP_OFFSET}`}>
      <section
        className="relative min-h-[min(65vh,720px)] w-full shrink-0 sm:min-h-[min(68vh,760px)]"
        aria-label="About hero"
      >
        <Image
          src={ABOUT_HERO_SRC}
          alt="Stanford aKDPhi sisters at Big Little Reveals"
          fill
          priority
          className="object-cover object-[center_72%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-black/30"
          aria-hidden
        />
        {/* Title sits on the lower band of the frame (where the group is) — still centered horizontally. */}
        <div className="absolute inset-0 flex items-end justify-center px-6 pb-[min(22vh,10rem)] sm:pb-[min(26vh,12rem)]">
          <h1 className="text-center font-[family-name:var(--font-serif)] text-[clamp(2.25rem,7vw,3.75rem)] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]">
            About
          </h1>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl flex-1 px-6 pb-14 pt-8 sm:pb-20 sm:pt-10">
        <div className="font-[family-name:var(--font-sans-nav)] text-base leading-relaxed text-neutral-700">
          <p>
            alpha Kappa Delta Phi (aKDPhi) is Stanford&apos;s only and the
            world&apos;s first, largest, and most established Asian American
            interest sorority, with over 68 chapters and 9,000 initiated
            sisters. aKDPhi was first established in 1989, and the Zeta Chapter
            at Stanford University was established in 1993. Our sorority strives
            to promote sisterhood, scholarship, leadership, and Asian awareness in
            the university and the community, while encouraging the expression
            of the individual. We seek to empower ourselves as women, be an
            active force within the community, and support each other in
            achieving personal and collective goals.
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
        </div>
      </div>
    </article>
  );
}
