# Design tokens — Stanford aKDPhi

Single reference for colors and typography. **Implementation:** CSS variables live in `src/app/globals.css` (`@theme` + `:root`); fonts are wired in `src/app/layout.tsx` where a Google-hosted option exists.

## Primary color palette

| Token        | Hex       | Use cases (suggested)                          |
| ------------ | --------- | ---------------------------------------------- |
| **Compassion** | `#5A357F` | Primary brand, logo, key headings, links      |
| **Sisterhood** | `#B577BC` | Accents, hover states, highlights             |
| **Leadership** | `#CCBDE5` | Soft fills, nav active pill, dividers         |
| **Service**    | `#EDE9F4` | Section backgrounds, cards, subtle panels      |
| **Purpose**    | `#FFFFFF` | Page background, negative space               |

**CSS:** `var(--color-compassion)`, `var(--color-sisterhood)`, …

## Secondary color palette

| Token           | Hex       | Use cases (suggested)                    |
| --------------- | --------- | ---------------------------------------- |
| **Friendship**  | `#FCDEDD` | Warm callouts, gentle emphasis           |
| **Authenticity** | `#FFD080` | Badges, CTAs, highlights                |
| **Scholarship** | `#BBD8D0` | Info blocks, quotes, alternate bands     |
| **Integrity**   | `#1C3360` | Deep text, footer, high-contrast UI      |

**CSS:** `var(--color-friendship)`, … `var(--color-integrity)`

## Typography

| Role                         | Font                      | Notes |
| ---------------------------- | ------------------------- | ----- |
| Headline display             | **Eckhart Headline Bold** | Self-hosted: place licensed **`EckhartHeadline-Bold.woff2`** in `public/fonts/`. `@font-face` is injected from `src/app/layout.tsx` (URL respects `NEXT_PUBLIC_BASE_PATH`). Site wordmark uses class `font-site-title` in `SiteHeader`. |
| Secondary + body             | **Greycliff CF**          | Commercial; same as above → `--font-body`. |
| Other headline display       | **eloved Script Bold**    | Script/display; use sparingly; self-host or licensed kit → `--font-script-display`. |
| Greek — serif                | **GFS Didot**             | Loaded with `next/font/google` as the main `--font-serif` stack today. |
| Greek — sans                 | **Trivia Sans**           | Commercial; add when licensed → `--font-greek-sans`. |

**Current build:**

- Site title wordmark: **Eckhart Headline Bold** when `public/fonts/EckhartHeadline-Bold.woff2` is present; otherwise the stack falls back to **GFS Didot**.
- Serif / Greek serif path: **GFS Didot** (Google Fonts) via `--font-serif`.
- Body / UI sans path: **DM Sans** as a stand-in for Greycliff CF via `--font-sans-nav` (swap in Greycliff when you add files).

## Tailwind v4

Brand colors are exposed on the theme (e.g. `bg-compassion`, `text-integrity`). Prefer tokens over one-off hex values in components.

## Adding other commercial fonts

1. Place `.woff2` files under `public/fonts/` (or use a hosted CSS kit).
2. Prefer `@font-face` in `src/app/layout.tsx` (same pattern as Eckhart) so asset URLs pick up `NEXT_PUBLIC_BASE_PATH` on GitHub Pages.
3. Point existing CSS variables in `globals.css` at the new `font-family` names.
