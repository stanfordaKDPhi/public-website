import Image from "next/image";

export function ClassPageHero({
  imageSrc,
  alt,
  classTitle,
  rushTerm,
}: {
  imageSrc: string;
  alt: string;
  classTitle: string;
  rushTerm: string;
}) {
  return (
    <section className="relative w-full min-h-[min(52vh,640px)] sm:min-h-[min(58vh,720px)]">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority
        className="object-cover object-[center_45%]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/15"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-end justify-end px-8 pb-10 pt-24 text-right text-white sm:px-14 sm:pb-14">
        <div className="max-w-xl font-[family-name:var(--font-serif)] drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]">
          <p className="text-[clamp(2rem,5.5vw,3.35rem)] font-semibold leading-tight tracking-wide">
            {classTitle}
          </p>
          <p className="mt-2 text-[clamp(1.05rem,2.5vw,1.35rem)] font-medium tracking-wide text-white/95">
            {rushTerm}
          </p>
        </div>
      </div>
    </section>
  );
}
