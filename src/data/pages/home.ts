/**
 * Homepage hero only.
 *
 * The rest of the homepage (testimonials, value-prop cards, partner logos,
 * "Ready to Transform" CTA) is shared content and lives in
 * `src/data/content.ts`. The services strip pulls from `src/data/services.ts`.
 *
 * `background.image` is the default hero source; `variants` provides
 * responsive small/medium/large .webp paths. Drop new images into
 * /public/images/stocks/optimized/ and run `npm run optimize-images`.
 */
export const homeContent = {
  hero: {
    title: 'AI Policy Solutions',
    subtitle: 'Helping organizations develop and implement successful strategies related to AI policy and governance.',
    buttons: {
      primary: { text: 'Our Services', href: '/services' },
      secondary: { text: 'Contact Us', href: '/contact' },
    },
    background: {
      image: '/images/stocks/optimized/resources.webp',
      alt: 'Jefferson Memorial night reflection',
      variants: {
        small: '/images/stocks/optimized/resources-small.webp',
        medium: '/images/stocks/optimized/resources-medium.webp',
        large: '/images/stocks/optimized/resources-large.webp',
      },
    },
  },
}; 