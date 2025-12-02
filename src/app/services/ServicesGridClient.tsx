'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthorityHeading, Button } from '@/components/ui';
import { useInView } from '@/lib/hooks/useInView';
import Image from 'next/image';
import { servicesContent } from '@/data/pages/services';
import { siteContent } from '@/data/content';
import type { Service } from '@/data/services';
import Link from 'next/link';

function ServiceCardSkeleton() {
  return (
    <div className="rounded-lg border border-ashGray bg-white p-8 shadow-soft flex flex-col justify-between animate-pulse">
      <div>
        <div className="h-6 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded mb-2" />
        <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded mb-4" />
      </div>
      <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded mt-4" />
    </div>
  );
}

interface ServicesGridClientProps {
  services: Service[];
}


function getStaggeredDelay(index: number, layoutIndex?: number) {
  // Use layoutIndex if provided, otherwise fall back to original logic
  const effectiveIndex = layoutIndex !== undefined ? layoutIndex : index;
  const row = Math.floor(effectiveIndex / 3);
  const col = effectiveIndex % 3;
  return (row * 0.6 + col * 0.2); // Return seconds for CSS animation-delay
}

function ServiceCard({ service, index, layoutIndex }: { service: Service; index: number; layoutIndex?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const delay = getStaggeredDelay(index, layoutIndex);
  const router = useRouter();
  const { services: servicesContent, ui } = siteContent;

  // Ripple effect and navigation on click (optimized to avoid getBoundingClientRect)
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    let x: number;
    let y: number;
    
    if (e.nativeEvent.offsetX !== undefined && e.nativeEvent.offsetY !== undefined) {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    } else {
      const rect = ref.current.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    const ripple = document.createElement('div');
    ripple.className = 'service-card-ripple';
    ripple.style.position = 'absolute';
    ripple.style.left = '0';
    ripple.style.top = '0';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.transform = `translate(${x}px, ${y}px)`;
    ripple.style.transformOrigin = 'center';
    ref.current.style.position = 'relative';
    ref.current.appendChild(ripple);
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);

    router.push(`/services/${service.slug}`);
  };

  // Keyboard handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(`/services/${service.slug}`);
    }
  };

  return (
    <div
      ref={ref}
      className={`service-card ${service.slug === 'strategy' ? 'center-aligned' : ''} animate-on-scroll fade-up ${inView ? 'is-visible' : ''}`}
      style={{ animationDelay: `${delay}s` }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Service card for ${service.title}`}
    >
      <div className="relative h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2 service-card-icon">{service.title}</h3>
          <p className="text-gray text-base mb-4 body-text">{service.overview}</p>
        </div>
        <Link
          href={`/services/${service.slug}`}
          className="mt-auto text-primary font-medium underline underline-offset-4 transition-colors rounded px-2 py-1 service-card-number hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 relative z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-label={`${ui.aria.learnMoreAbout} ${service.title}`}
        >
          {servicesContent.learnMore} →
        </Link>
      </div>
    </div>
  );
}

export default function ServicesGridClient({ services }: ServicesGridClientProps) {
  const [loading, setLoading] = React.useState(true);
  const { ui } = siteContent;
  const { hero } = servicesContent;
  
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative bg-primary h-[30vh] min-h-[250px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.background.image}
            alt={hero.background.alt}
            fill
            className="object-cover"
            priority={true}
            quality={90}
            sizes="100vw"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-20">
          <AuthorityHeading
            size="h1"
            className="font-bold mb-6 heading text-white"
            enableHighlight={true}
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
              lineHeight: '1.2',
              margin: '0 0 1.5rem 0',
              padding: '0.5rem 0 0.5rem 0'
            }}
          >
            {hero.title}
          </AuthorityHeading>
          <p 
            className="max-w-3xl mx-auto body-text text-white"
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
              lineHeight: '1.5',
              marginBottom: '1rem'
            }}
          >
            {hero.subtitle}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 pt-16 pb-4">
        {loading ? (
          /* Responsive Grid Skeleton */
          <div className="services-grid max-w-6xl mx-auto">
            {Array.from({ length: services.length }).map((_, i) => (
              <ServiceCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : (
          /* Custom 2-3-2 Grid Layout */
          <div className="services-grid max-w-6xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.slug} 
                service={service} 
                index={index} 
                layoutIndex={index}
              />
            ))}
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center bg-primary-50 dark:bg-neutral-900">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4 heading">{ui.cta.readyToGetStarted}</h2>
          <p className="text-lg text-gray dark:text-paynesGray mb-8 body-text">
            {ui.cta.discussServices}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" className="text-lg px-8 py-3">
              {ui.buttons.contactUs}
            </Button>
            <Button 
              href="/about" 
              variant="outline" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3 border-eggshell text-paynesGray bg-eggshell hover:bg-eggshell hover:text-paynesGray min-h-[44px] touch-target transition-all duration-150 hover:scale-105 rounded-md"
            >
              {ui.buttons.learnAboutTeam}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
