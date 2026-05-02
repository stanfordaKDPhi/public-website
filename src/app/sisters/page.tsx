import type { Metadata } from "next";

import { PageShell } from "@/components/PageShell";
import { SistersClassOverview } from "@/components/SistersClassOverview";
import {
  getSisterClassPageData,
  sisterPlaceholderPortrait,
} from "@/data/sisters";
import { sisterClasses } from "@/lib/sisterClasses";

export const metadata: Metadata = {
  title: "Sisters | Stanford aKDPhi",
  description: "Meet the sisters of Stanford aKDPhi — Zeta Chapter.",
};

export default function SistersPage() {
  return (
    <PageShell title="Sisters" wide>
      <p className="mx-auto mb-14 max-w-2xl text-center font-[family-name:var(--font-sans-nav)] text-base leading-relaxed text-neutral-700 sm:mb-16 sm:text-lg">
        Each class has its own composite, roster, and member cards. Browse
        everyone here, then use the button to open the full class page.
      </p>

      <div>
        {sisterClasses.map((cls) => {
          const data = getSisterClassPageData(cls.slug);
          const heroSrc = data?.heroImageSrc ?? sisterPlaceholderPortrait;
          const heroAlt =
            data?.heroAlt ??
            `${cls.label} — class composite (add photos under public/images/sisters/${cls.slug}/)`;
          const memberNames = data?.members.map((m) => m.name) ?? [];

          return (
            <SistersClassOverview
              key={cls.slug}
              slug={cls.slug}
              label={cls.label}
              heroSrc={heroSrc}
              heroAlt={heroAlt}
              memberNames={memberNames}
            />
          );
        })}
      </div>
    </PageShell>
  );
}
