/**
 * Services index page hero only.
 *
 * The actual list of service offerings (cards + detail pages) lives in
 * `src/data/services.ts`. Each individual /services/[slug] detail page uses
 * its own background from that file, not this one.
 */
export const servicesContent = {
  hero: {
    title: 'Services',
    subtitle: 'We offer a comprehensive suite of services designed to empower clients to navigate AI and technology policy with confidence and clarity.',
    background: {
      image: '/images/stocks/optimized/services.webp',
      alt: 'Services background',
      variants: {
        small: '/images/stocks/optimized/services-small.webp',
        medium: '/images/stocks/optimized/services-medium.webp',
        large: '/images/stocks/optimized/services-large.webp',
      },
    },
  },
}; 