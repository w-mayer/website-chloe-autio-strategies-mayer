// Image configuration for background images used in service pages
// Dimensions are based on actual image files to preserve aspect ratios

export interface ImageConfig {
  src: string;
  width: number;
  height: number;
  aspectRatio: string;
  objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center top' | 'center bottom' | 'center left' | 'center right';
}

export const serviceBackgroundImages: Record<string, ImageConfig> = {
  'policy-development': {
    src: '/images/stocks/optimized/policy-development.webp',
    width: 2200,
    height: 1466,
    aspectRatio: '2200/1466', // ~1.5:1
    objectFit: 'cover',
    objectPosition: 'center'
  },
  'facilitation': {
    src: '/images/stocks/optimized/events-facilitation.webp',
    width: 2069,
    height: 2200,
    aspectRatio: '2069/2200', // ~0.94:1 (nearly square)
    objectFit: 'cover',
    objectPosition: 'center'
  },
  'events': {
    src: '/images/stocks/optimized/about.webp',
    width: 6000,
    height: 4000,
    aspectRatio: '6000/4000', // 1.5:1
    objectFit: 'cover',
    objectPosition: 'center'
  },
  'presentations-briefings': {
    src: '/images/stocks/optimized/briefings-talks.webp',
    width: 7008,
    height: 4672,
    aspectRatio: '7008/4672', // ~1.5:1
    objectFit: 'cover',
    objectPosition: 'center'
  },
  'third-party-management': {
    src: '/images/stocks/optimized/third-party.webp',
    width: 4616,
    height: 4000,
    aspectRatio: '4616/4000', // ~1.15:1 (nearly square)
    objectFit: 'cover',
    objectPosition: 'center'
  },
  'insight-analysis': {
    src: '/images/stocks/optimized/insights-analysis.webp',
    width: 3778,
    height: 5667,
    aspectRatio: '3778/5667', // ~1:1.5 (portrait)
    objectFit: 'cover',
    objectPosition: 'center'
  },
  'services': {
    src: '/images/stocks/optimized/services.webp',
    width: 5312,
    height: 2988,
    aspectRatio: '5312/2988', // ~1.78:1
    objectFit: 'cover',
    objectPosition: 'center'
  },
  'hero-background': {
    src: '/images/stocks/optimized/hero-background.webp',
    width: 2201,
    height: 1184,
    aspectRatio: '2201/1184', // ~1.86:1
    objectFit: 'cover',
    objectPosition: 'center'
  },
  'contact': {
    src: '/images/stocks/optimized/contact.webp',
    width: 4000,
    height: 6000,
    aspectRatio: '4000/6000', // 2:3 (portrait)
    objectFit: 'cover',
    objectPosition: 'center'
  },
  'cta-background': {
    src: '/images/stocks/optimized/cta-background.webp',
    width: 5184,
    height: 3456,
    aspectRatio: '5184/3456', // ~1.5:1
    objectFit: 'cover',
    objectPosition: 'center'
  }
};

export function getServiceBackgroundConfig(serviceSlug: string): ImageConfig {
  return serviceBackgroundImages[serviceSlug] || serviceBackgroundImages['services'];
}

export function getImageConfig(imagePath: string): ImageConfig | null {
  const key = Object.keys(serviceBackgroundImages).find(key => 
    serviceBackgroundImages[key].src === imagePath
  );
  return key ? serviceBackgroundImages[key] : null;
} 