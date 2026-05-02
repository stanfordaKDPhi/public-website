"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import type {
  RushArchiveEdition,
  RushArchiveImage,
} from "@/data/rush/discoverRushArchive";

/** Match `MemberFlipCard` footprint — polaroid-style frame + 7:8 image area. */
const rushThumbFrame =
  "rounded-sm border border-[var(--color-compassion)]/15 bg-[var(--color-service)] shadow-[0_10px_28px_-6px_rgba(0,0,0,0.2),0_2px_6px_rgba(0,0,0,0.06)]";

const rushThumbGrid =
  "grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,15rem),1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(17.5rem,1fr))] lg:gap-8 lg:[grid-template-columns:repeat(auto-fill,minmax(19rem,1fr))]";

export function RushArchiveLightbox({
  editions,
}: {
  editions: RushArchiveEdition[];
}) {
  const [active, setActive] = useState<RushArchiveImage | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogLabelId = useId();

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  return (
    <>
      <div className="space-y-14">
        {editions.map((edition) => (
          <section
            key={edition.slug}
            aria-labelledby={`rush-edition-${edition.slug}`}
            className="scroll-mt-8"
          >
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-[var(--color-compassion)]/15 pb-3">
              <h2
                id={`rush-edition-${edition.slug}`}
                className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[var(--color-compassion)] sm:text-2xl"
              >
                {edition.title}
              </h2>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {edition.images.length}{" "}
                {edition.images.length === 1 ? "photo" : "photos"}
              </p>
            </div>

            <ul
              className={`${rushThumbGrid} min-w-0`}
              role="list"
            >
              {edition.images.map((img) => (
                <li key={img.src} className="min-w-0" role="listitem">
                  <button
                    type="button"
                    onClick={() => setActive(img)}
                    className={`group relative aspect-[7/8] w-full min-w-0 cursor-zoom-in overflow-hidden text-left outline-none ring-offset-2 transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--color-compassion)] ${rushThumbFrame}`}
                    aria-haspopup="dialog"
                    aria-label={`Open full size — ${img.quarter}: ${img.alt}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- fills fixed aspect like member cards */}
                    <img
                      src={img.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/0 px-2 transition-colors duration-150 group-hover:bg-black/50 group-focus-visible:bg-black/50 sm:px-3"
                      aria-hidden
                    >
                      <span
                        className="max-w-full text-center font-[family-name:var(--font-serif)] text-base font-semibold leading-tight text-white opacity-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-lg"
                      >
                        {img.quarter}
                      </span>
                      <span className="text-center text-[0.65rem] font-medium tracking-wide text-white/90 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-xs">
                        Click to expand
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex cursor-default flex-col items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogLabelId}
          onClick={close}
        >
          <h2 id={dialogLabelId} className="sr-only">
            {active.quarter} — full size photo
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute right-4 top-4 z-[60] flex h-11 min-w-11 items-center justify-center rounded-full border border-white/30 bg-black/50 px-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close full size image"
          >
            Close
          </button>
          <div
            className="flex max-h-[min(92vh,1200px)] w-fit max-w-[min(100vw-2rem,1400px)] flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[min(85vh,1120px)] w-auto max-w-full object-contain"
            />
            <p className="text-center font-[family-name:var(--font-serif)] text-base font-semibold text-white/95 sm:text-lg">
              {active.quarter}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
