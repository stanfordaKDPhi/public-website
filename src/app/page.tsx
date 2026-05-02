import Image from "next/image";

export default function Home() {
  return (
    <section className="relative min-h-[min(72vh,820px)] w-full flex-1">
      <Image
        src="/hero.jpg"
        alt="Stanford aKDPhi sisters on campus"
        fill
        priority
        className="object-cover object-[center_42%]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-14 text-center sm:pb-20">
        <div className="font-[family-name:var(--font-serif)] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
          <p className="text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-tight">
            alpha Kappa Delta Phi
          </p>
          <p className="mt-3 text-[clamp(1.1rem,2.8vw,1.5rem)] font-medium tracking-wide">
            Stanford University
          </p>
          <p className="mt-1 text-[clamp(1.05rem,2.5vw,1.4rem)] font-medium tracking-wide">
            Zeta Chapter
          </p>
        </div>
      </div>
    </section>
  );
}
