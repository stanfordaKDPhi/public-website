import type { Metadata } from "next";
import { DM_Sans, GFS_Didot } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

/** Greek serif per DESIGN_TOKENS.md — GFS Didot (Google Fonts). */
const serif = GFS_Didot({
  variable: "--font-serif",
  subsets: ["latin", "greek"],
  weight: "400",
});

const sans = DM_Sans({
  variable: "--font-sans-nav",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const crestIcon = `${siteBasePath}/brand/logos/aKDPhi_Logo_Crest_DarkPurple_Digital.webp`;

export const metadata: Metadata = {
  title: "Stanford aKDPhi | alpha Kappa Delta Phi — Zeta Chapter",
  description:
    "Stanford University Zeta Chapter of alpha Kappa Delta Phi International Sorority, Inc.",
  icons: {
    icon: [{ url: crestIcon, type: "image/webp" }],
    apple: [{ url: crestIcon, type: "image/webp" }],
  },
};

const eckhartHeadlineFontFace = `
@font-face {
  font-family: "Eckhart Headline";
  src: url("${siteBasePath}/fonts/EckhartHeadline-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: eckhartHeadlineFontFace }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <SiteHeader />
        {/* Offset for `fixed` header — mobile stack is taller than single-row `sm+`. */}
        <main className="flex min-h-0 flex-1 flex-col pt-[7.25rem] sm:pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
