'use client';
import Link from 'next/link';
import { services } from '@/data/services';
import { AuthorityHeading, ContentErrorBoundary } from '@/components/ui';
import { siteContent } from '@/data/content';
import { useInView } from '@/lib/hooks/useInView';

interface ServiceCardProps {
  service: (typeof services)[number];
  learnMoreLabel: string;
  learnMoreAriaPrefix: string;
  index: number;
}

function ServiceCard({ service, learnMoreLabel, learnMoreAriaPrefix, index }: ServiceCardProps) {
  const [ref, inView] = useInView<HTMLAnchorElement>();
  const delay = (Math.floor(index / 3) * 0.15) + ((index % 3) * 0.1);
  
  return (
    <Link
      ref={ref}
      href={`/services/${service.slug}`}
      className={`service-card group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary animate-on-scroll fade-up ${inView ? 'is-visible' : ''} ${
        service.slug === 'strategy' ? 'center-aligned' : ''
      }`}
      style={{ animationDelay: `${delay}s` }}
      aria-label={`${learnMoreAriaPrefix} ${service.title}`}
    >
      <div className="relative h-full flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-primary service-card-icon">{service.title}</h3>
          <p className="text-gray text-base body-text">{service.overview}</p>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-primary font-medium underline underline-offset-4 transition-colors rounded px-2 py-1 service-card-number group-hover:text-primary-700 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20">
          {learnMoreLabel} →
        </span>
      </div>
    </Link>
  );
}

function ServicesGridContent() {
  const {
    services: servicesContent,
    ui: { aria },
  } = siteContent;

  return (
    <section className="w-full pt-8 md:pt-8 pb-12 md:pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center text-center">
          <AuthorityHeading
            size="h2"
            className="text-3xl md:text-4xl font-bold text-center mb-6 heading max-w-full overflow-hidden"
          >
            {servicesContent.title}
          </AuthorityHeading>
        </div>

        <div className="services-grid max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              learnMoreLabel={servicesContent.learnMore}
              learnMoreAriaPrefix={aria.learnMoreAbout}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <ContentErrorBoundary>
      <ServicesGridContent />
    </ContentErrorBoundary>
  );
}