import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MemberFlipCard } from "@/components/MemberFlipCard";
import { ClassPageHero } from "@/components/ClassPageHero";
import { PageShell } from "@/components/PageShell";
import { getSisterClassPageData } from "@/data/sisters";
import {
  getSisterClassBySlug,
  sisterClasses,
} from "@/lib/sisterClasses";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return sisterClasses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cls = getSisterClassBySlug(slug);
  if (!cls) {
    return { title: "Sisters | Stanford aKDPhi" };
  }

  return {
    title: `${cls.label} | Stanford aKDPhi`,
    description: `${cls.label} — Stanford alpha Kappa Delta Phi, Zeta Chapter.`,
  };
}

export default async function SisterClassPage({ params }: PageProps) {
  const { slug } = await params;
  const cls = getSisterClassBySlug(slug);
  if (!cls) notFound();

  const data = getSisterClassPageData(slug);

  const heroDisplayTitle =
    data?.heroTitle ?? cls.label.replace(/\s+Class\s*$/i, "").trim();

  if (!data) {
    return (
      <PageShell title={cls.label}>
        <p className="text-neutral-700">
          This class page is ready for content. Add images under{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.88em]">
            public/images/sisters/{slug}/
          </code>
          , then export a page definition from{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.88em]">
            src/data/sisters/classes/{slug}.ts
          </code>{" "}
          (see sibling class files for the pattern).
        </p>
      </PageShell>
    );
  }

  const heroAlt =
    data.heroAlt ?? `${cls.label} class composite — ${data.rushTerm}`;

  return (
    <article className="flex flex-1 flex-col">
      <ClassPageHero
        imageSrc={data.heroImageSrc}
        alt={heroAlt}
        classTitle={heroDisplayTitle}
        rushTerm={data.rushTerm}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-16">
        {data.members.length === 0 ? (
          <p className="font-[family-name:var(--font-sans-nav)] text-neutral-600">
            Add members to the{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.88em]">
              members
            </code>{" "}
            array in{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.88em]">
              src/data/sisters/classes/{slug}.ts
            </code>
            .
          </p>
        ) : (
          <div
            className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,15rem),1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(17.5rem,1fr))] lg:gap-8 lg:[grid-template-columns:repeat(auto-fill,minmax(19rem,1fr))]"
            role="list"
          >
            {data.members.map((member, idx) => (
              <div key={`${member.portraitSrc}-${member.name}-${idx}`} role="listitem">
                <MemberFlipCard member={member} />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
