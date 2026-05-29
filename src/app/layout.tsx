import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant, Fraunces } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  // Skipping 300 (too thin). Loading 500/600/700 so we can bump weights
  // selectively where Cormorant's base needs more visual weight to read well.
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Fraunces is used SPECIFICALLY for text inside cards (layer-card, profile-card,
// team-card, quote-card, value-card, service-item) — its sturdier letterforms
// read better at the smaller sizes used inside contained UI elements.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Autio Strategies",
  description: "Navigate AI evolution with confidence. A decade of global experience helping labs, enterprises, governments, and intergovernmental bodies keep up with — and make the most of — how AI is reshaping their work.",
  keywords: ["AI policy", "AI governance", "technology policy", "government affairs", "regulatory strategy", "responsible AI"],
  authors: [{ name: "Autio Strategies" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Autio Strategies",
    description: "Navigate AI evolution with confidence. Partnership-focused. Premier guidance. Wherever you are on the journey.",
    url: "https://autiostrategies.com",
    siteName: "Autio Strategies",
    locale: "en_US",
    type: 'website',
  },
  metadataBase: new URL("https://autiostrategies.com"),
  alternates: {
    canonical: "https://autiostrategies.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} ${fraunces.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon/favicon-48x48.png" />
        <meta name="theme-color" content="#FAFAF2" />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Autio Strategies',
              url: 'https://autiostrategies.com',
              description: 'AI policy consulting, governance strategy, and regulatory advisory for labs, enterprises, and governments.',
              contactPoint: [{
                '@type': 'ContactPoint',
                email: 'chloe@autiostrategies.com',
                contactType: 'customer support',
              }]
            })
          }}
        />
      </head>
      <body>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
