"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { useCallback, useId, useState } from "react";

import { MemberBioFields } from "@/components/MemberBioContent";
import type { ClassMemberBio } from "@/data/sisters";

const polaroidFrame =
  "rounded-sm border border-[var(--color-compassion)]/15 bg-[var(--color-service)] shadow-[0_10px_28px_-6px_rgba(0,0,0,0.2),0_2px_6px_rgba(0,0,0,0.06)]";

const captionSans =
  "font-[family-name:var(--font-sans-nav)] text-neutral-900";

/** Front-of-card caption — compassion #5A357F */
const frontCaption =
  "font-[family-name:var(--font-sans-nav)] text-[var(--color-compassion)]";

/**
 * Fixed aspect for every card: height tracks grid column width so all members match.
 * Slightly wider than tall (~1:1.12) so the polaroid does not read as a tall strip.
 */
const CARD_ASPECT = "aspect-[7/8]";

export function MemberFlipCard({ member }: { member: ClassMemberBio }) {
  const [flipped, setFlipped] = useState(false);
  const id = useId();
  const labelId = `${id}-label`;

  const hasLine =
    member.lineNumber != null && String(member.lineNumber).trim() !== "";

  const toggle = useCallback(() => {
    setFlipped((v) => !v);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <div className="w-full [perspective:1400px]">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={flipped}
        aria-labelledby={labelId}
        aria-label={
          flipped
            ? `Show photo for ${member.name}`
            : `Show details for ${member.name}`
        }
        className={`relative w-full ${CARD_ASPECT} cursor-pointer select-none outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[var(--color-compassion)]`}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <div
          className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]"
          style={{
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front — Polaroid */}
          <div
            className={`absolute inset-0 flex flex-col overflow-hidden [backface-visibility:hidden] ${polaroidFrame}`}
          >
            <div className="flex min-h-0 flex-1 flex-col px-3 pb-2 pt-3 sm:px-3.5 sm:pt-4">
              <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-t-sm bg-[var(--color-service)]">
                <Image
                  src={member.portraitSrc}
                  alt={member.name}
                  fill
                  sizes="(max-width:640px) 90vw, (max-width:1024px) 35vw, 260px"
                  className="object-cover object-top"
                />
              </div>

              <div className="shrink-0 space-y-1 px-2 pb-1 pt-3 text-center">
                <p
                  id={labelId}
                  className={`text-[0.95rem] font-semibold leading-tight sm:text-base ${frontCaption}`}
                >
                  {member.name}
                </p>
                {hasLine ? (
                  <p
                    className={`text-sm tabular-nums sm:text-[0.95rem] ${frontCaption} font-medium`}
                  >
                    #{member.lineNumber}
                  </p>
                ) : null}
              </div>
            </div>
            <p className="shrink-0 pb-2 text-center text-[0.6rem] font-medium tracking-wide text-[var(--color-compassion)]/70 sm:text-[0.65rem]">
              Tap to flip
            </p>
          </div>

          {/* Back — same footprint */}
          <div
            className={`absolute inset-0 flex flex-col overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] ${polaroidFrame}`}
          >
            <div className="flex min-h-0 flex-1 flex-col bg-[var(--color-service)] px-3 pb-2 pt-4 sm:px-4 sm:pt-5">
              <p
                className={`shrink-0 border-b border-[var(--color-compassion)]/12 pb-2.5 text-center text-[0.95rem] font-semibold sm:text-base ${captionSans}`}
              >
                {member.name}
              </p>
              <div className="min-h-0 flex-1 overflow-y-auto py-3 pr-0.5 sm:py-4">
                <MemberBioFields member={member} />
              </div>
            </div>
            <p className="shrink-0 pb-2 text-center text-[0.6rem] font-medium tracking-wide text-neutral-500/90 sm:text-[0.65rem]">
              Tap to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
