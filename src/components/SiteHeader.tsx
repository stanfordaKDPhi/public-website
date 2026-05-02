"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sisterClasses } from "@/lib/sisterClasses";

const navBeforeSisters = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
] as const;

const navAfterSisters = [
  { label: "RUSH 2026", href: "/rush" },
  { label: "EVENTS", href: "/events" },
  { label: "CONTACT", href: "/contact" },
] as const;

function navLinkClass(active: boolean) {
  return active
    ? "rounded-sm bg-[var(--nav-active-bg)] px-2.5 py-1.5 text-[var(--nav-active-fg)]"
    : "px-2.5 py-1.5 text-[var(--nav-muted)] transition-colors hover:text-[var(--nav-active-fg)]";
}

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
          {navBeforeSisters.map(({ label, href }) => {
            const active =
              href === "/"
                ? path === "/" || path === ""
                : path === href;
            return (
              <Link key={label} href={href} className={navLinkClass(active)}>
                {label}
              </Link>
            );
          })}

          <div className="group relative">
            <Link
              href="/sisters"
              className={navLinkClass(
                path === "/sisters" || path.startsWith("/sisters/"),
              )}
              aria-haspopup="true"
            >
              SISTERS
            </Link>
            <div
              className="pointer-events-none absolute left-1/2 top-full z-50 mt-px hidden min-w-[12.5rem] -translate-x-1/2 border border-[var(--rule)] bg-white py-2 text-left shadow-sm group-hover:pointer-events-auto group-hover:block group-focus-within:pointer-events-auto group-focus-within:block"
              role="menu"
              aria-label="Class pages"
            >
              <ul className="tracking-[0.12em] sm:tracking-[0.14em]">
                {sisterClasses.map(({ slug, label }) => (
                  <li key={slug} role="none">
                    <Link
                      href={`/sisters/${slug}`}
                      role="menuitem"
                      className={`block whitespace-nowrap px-4 py-1.5 text-[0.65rem] sm:text-[0.7rem] ${
                        path === `/sisters/${slug}`
                          ? "bg-[var(--nav-active-bg)] text-[var(--nav-active-fg)]"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-[var(--nav-active-fg)]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {navAfterSisters.map(({ label, href }) => {
            const active = path === href;
            return (
              <Link key={label} href={href} className={navLinkClass(active)}>
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
