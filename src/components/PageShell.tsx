import type { ReactNode } from "react";

export function PageShell({
  title,
  children,
  wide,
}: {
  title: string;
  children: ReactNode;
  /** Wider content column (e.g. image galleries). */
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full flex-1 px-6 py-14 sm:py-20 ${wide ? "max-w-6xl" : "max-w-3xl"}`}
    >
      <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-[var(--color-compassion)] sm:text-4xl">
        {title}
      </h1>
      <div className="mt-8 font-[family-name:var(--font-sans-nav)] text-base leading-relaxed text-neutral-700">
        {children}
      </div>
    </div>
  );
}
