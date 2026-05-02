This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Host on GitHub Pages

This app is built as a static export (`output: "export"`) and deployed with GitHub Actions.

1. Push this repository to GitHub (default branch `main` or `master`).
2. In the repo on GitHub: **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. The workflow **Deploy to GitHub Pages** runs on push; the site appears at `https://<user>.github.io/<repo>/` for normal repositories, or at the root URL if the repository name ends with `.github.io`.

To preview locally with the same base path as production (replace `your-repo`):

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo npm run build && npx serve out
```

For local development, omit `NEXT_PUBLIC_BASE_PATH` and use `npm run dev` as usual.

## Custom domain (Namecheap → GitHub Pages)

You can point **stanfordakdphi.org** at this site without Vercel. Hosting stays on **GitHub Pages** (free for public repos); Namecheap only provides DNS.

### 1. GitHub repository settings

1. **Settings → Pages → Custom domain** — enter `stanfordakdphi.org` and save. (Add `www.stanfordakdphi.org` too if you want both; GitHub can redirect one to the other.)
2. After the domain is verified, turn on **Enforce HTTPS** when GitHub offers it.
3. **Settings → Secrets and variables → Actions → Variables** — add a repository variable:
   - **Name:** `USE_GITHUB_PAGES_SUBPATH`
   - **Value:** `false`  
   This makes the Next.js build use **no** `/repo-name` prefix, which is required for a custom domain served at the site root. Leave this unset only if you still rely on `https://<user>.github.io/<repo>/` without a custom domain.

Trigger a new deploy (empty commit push or **Actions → workflow → Run workflow**) after changing the variable.

### 2. Namecheap DNS (Domain list → Manage → Advanced DNS)

Use your GitHub **username** or **organization** slug in the CNAME target: `YOURUSER.github.io` or `YOURORG.github.io` (replace below with the one that owns the repo).

| Type | Host | Value | TTL |
|------|------|--------|-----|
| **A Record** | `@` | `185.199.108.153` | Automatic |
| **A Record** | `@` | `185.199.109.153` | Automatic |
| **A Record** | `@` | `185.199.110.153` | Automatic |
| **A Record** | `@` | `185.199.111.153` | Automatic |
| **CNAME Record** | `www` | `YOURUSER.github.io` (or `YOURORG.github.io`) | Automatic |

Remove any conflicting **URL Redirect** or old **A/CNAME** rows for `@` / `www` if Namecheap added defaults.

DNS can take a short time to propagate. GitHub’s [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) has the same IP list and troubleshooting if the domain does not verify.
