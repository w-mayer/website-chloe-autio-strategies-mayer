import type { Metadata } from 'next';

const SITE_URL = 'https://autiostrategies.com';
const SHARE_IMAGE = '/images/autio-strategies-share-image.png';

/**
 * Title, description and share tags for one page.
 * The share image is the same on every page; only title, description and URL change.
 */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Autio Strategies',
      locale: 'en_US',
      type: 'website',
      images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: 'Autio Strategies' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE],
    },
  };
}
