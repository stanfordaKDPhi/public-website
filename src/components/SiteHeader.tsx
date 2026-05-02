"use client";

import type { FocusEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
    ? "rounded-md bg-neutral-100 px-3 py-2 text-[0.7rem] font-semibold tracking-[0.14em] text-neutral-900 sm:text-[0.72rem]"
    : "rounded-md px-3 py-2 text-[0.7rem] font-medium tracking-[0.14em] text-[var(--nav-muted)] hover:bg-neutral-50 hover:text-[var(--nav-active-fg)] sm:text-[0.72rem]";
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
  const pathname = usePathname();
  const [sistersOpen, setSistersOpen] = useState(false);
  const sistersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSistersOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!sistersOpen) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const el = sistersRef.current;
      if (el && !el.contains(e.target as Node)) {
        setSistersOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSistersOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sistersOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--rule)] bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-3.5">
        <Link
          href="/"
          className="shrink-0 text-[var(--color-compassion)] hover:opacity-90 sm:min-w-0"
        >
          {/* Fixed rem sizes only — avoid vw/clamp so text does not reflow when scrollbars appear. */}
          <span className="font-site-title text-lg leading-tight tracking-tight sm:text-xl">
            Stanford aKDPhi
          </span>
        </Link>

        <nav
          className="font-[family-name:var(--font-sans-nav)] flex w-full max-w-none flex-wrap items-center justify-start gap-x-0.5 gap-y-1.5 sm:w-auto sm:max-w-[min(100%,42rem)] sm:justify-end sm:gap-x-1"
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

          <div
            ref={sistersRef}
            className="relative"
            onMouseEnter={() => setSistersOpen(true)}
            onMouseLeave={() => setSistersOpen(false)}
            onFocus={() => setSistersOpen(true)}
            onBlur={(e: FocusEvent<HTMLDivElement>) => {
              const next = e.relatedTarget;
              const el = sistersRef.current;
              if (!el) return;
              if (next instanceof Node && el.contains(next)) return;
              setSistersOpen(false);
            }}
          >
            <Link
              href="/sisters"
              className={navLinkClass(
                path === "/sisters" || path.startsWith("/sisters/"),
              )}
              aria-haspopup="true"
              aria-expanded={sistersOpen}
            >
              SISTERS
            </Link>
            <div
              className={`absolute right-0 top-full z-[60] min-w-[12.5rem] pt-1 ${sistersOpen ? "block" : "hidden"}`}
            >
              <div
                className="rounded-md border border-[var(--rule)] bg-white py-2 text-left shadow-md"
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
      </div>
    </header>
  );
}
