import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Fraunces: headings and display text. DM Sans (above): body, navigation, buttons.
const fraunces = Fraunces({
  subsets: ["latin"],
  // Variable font with the optical-size axis, matching the design board.
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const siteTitle = "Autio Strategies | AI Policy and Governance Advisory";
const siteDescription = "Autio Strategies is a boutique advisory firm helping startups, enterprises, governments, and nonprofits navigate AI policy and governance, drawing on a decade of experience across tech and government.";

// Shared by every page. Next.js replaces (rather than merges) the openGraph
// object when a page sets its own, so pages spread this in via pageMetadata().
const shareImage = {
  url: "/images/autio-strategies-share-image.png",
  width: 1200,
  height: 630,
  alt: "Autio Strategies",
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: ["AI policy", "AI governance", "technology policy", "government affairs", "regulatory strategy", "responsible AI"],
  authors: [{ name: "Autio Strategies" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://autiostrategies.com",
    siteName: "Autio Strategies",
    locale: "en_US",
    type: 'website',
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [shareImage.url],
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
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
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
              description: 'A boutique advisory firm helping startups, enterprises, governments, and nonprofits navigate AI policy and governance.',
              contactPoint: [{
                '@type': 'ContactPoint',
                email: 'info@autiostrategies.com',
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
