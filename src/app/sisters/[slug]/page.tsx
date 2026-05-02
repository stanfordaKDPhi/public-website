import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/PageShell";
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

  return (
    <PageShell title={cls.label}>
      <p>
        Add class composite, roster, and highlights for {cls.label} here. This
        placeholder keeps the route ready for real content.
      </p>
    </PageShell>
  );
}
