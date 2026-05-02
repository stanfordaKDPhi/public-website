"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SISTERS", href: "/sisters" },
  { label: "RUSH 2026", href: "/rush" },
  { label: "EVENTS", href: "/events" },
  { label: "CONTACT", href: "/contact" },
] as const;

function usePathWithoutBase() {
  const pathname = usePathname();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!base || !pathname.startsWith(base)) {
    return pathname || "/";
  }
  const rest = pathname.slice(base.length) || "/";
  return rest.startsWith("/") ? rest : `/${rest}`;
}

export function SiteHeader() {
  const path = usePathWithoutBase();

  return (
    <header className="border-b border-[var(--rule)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-2 pt-14 sm:pt-16">
        <Link
          href="/"
          className="text-[var(--color-compassion)] transition-opacity hover:opacity-90"
        >
          <span className="font-site-title text-[1.85rem] leading-none tracking-tight sm:text-[2.1rem]">
            Stanford aKDPhi
          </span>
        </Link>
      </div>

      {/* Full-bleed rule lines with nav “break” in the middle */}
      <div className="flex w-full items-center">
        <div className="h-px min-h-px flex-1 bg-[var(--rule)]" aria-hidden />
        <nav
          className="font-[family-name:var(--font-sans-nav)] flex max-w-[min(100%,52rem)] flex-wrap items-center justify-center gap-x-0.5 gap-y-2 bg-white px-3 py-1 text-[0.62rem] font-medium tracking-[0.16em] sm:gap-x-2 sm:px-6 sm:text-[0.68rem] sm:tracking-[0.18em]"
          aria-label="Main"
        >
          {navItems.map(({ label, href }) => {
            const active =
              href === "/"
                ? path === "/" || path === ""
                : path === href;
            return (
              <Link
                key={label}
                href={href}
                className={
                  active
                    ? "rounded-sm bg-[var(--nav-active-bg)] px-2.5 py-1.5 text-[var(--nav-active-fg)]"
                    : "px-2.5 py-1.5 text-[var(--nav-muted)] transition-colors hover:text-[var(--nav-active-fg)]"
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="h-px min-h-px flex-1 bg-[var(--rule)]" aria-hidden />
      </div>

      <div className="h-5 sm:h-6" aria-hidden />
    </header>
  );
}
