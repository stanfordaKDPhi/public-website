import type { ReactNode } from "react";

export function PageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-14 sm:py-20">
      <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-[var(--color-compassion)] sm:text-4xl">
        {title}
      </h1>
      <div className="mt-8 font-[family-name:var(--font-sans-nav)] text-base leading-relaxed text-neutral-700">
        {children}
      </div>
    </div>
  );
}
