import React from 'react';
import { Metadata } from 'next';
import { AuthorityHeading, Button } from '@/components/ui';
import { services } from '@/data/services';
import { notFound } from 'next/navigation';
import { siteMetadata } from '@/data/metadata';
import { siteContent } from '@/data/content';
import { ServiceSlug } from '@/types/metadata';
import { getResponsiveBackgroundStyle } from '@/lib/responsive-background';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for static export
export async function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  
  if (!service) {
    return {
      title: 'Service Not Found | Autio Strategies',
      description: 'The requested service could not be found.',
    };
  }

  const serviceMetadata = siteMetadata.services[slug as ServiceSlug];
  
  return {
    title: serviceMetadata?.title || `${service.title} Services | Autio Strategies`,
    description: serviceMetadata?.description || service.overview,
    keywords: serviceMetadata?.keywords || [
      'AI policy consulting',
      'technology governance',
      service.title.toLowerCase(),
      'policy services',
    ],
    openGraph: {
      title: serviceMetadata?.title || `${service.title} Services | Autio Strategies`,
      description: serviceMetadata?.description || service.overview,
      url: serviceMetadata?.url || `${siteMetadata.default.url}/services/${slug}`,
      siteName: siteMetadata.default.siteName,
      images: [siteMetadata.default.image],
      locale: siteMetadata.default.locale,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image',
      title: serviceMetadata?.title || `${service.title} Services | Autio Strategies`,
      description: serviceMetadata?.description || service.overview,
      images: [siteMetadata.default.image.url],
      creator: siteMetadata.twitter.creator,
    },
    alternates: {
      canonical: serviceMetadata?.url || `${siteMetadata.default.url}/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  const { ui } = siteContent;
  
  if (!service) {
    return notFound();
  }
  const backgroundStyle = getResponsiveBackgroundStyle(
    service.backgroundImage,
    service.backgroundVariants
  );

  return (
    <>
      {/* Hero Section with Service-Specific Background */}
      <section className="relative bg-primary h-[30vh] min-h-[250px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 responsive-bg"
          style={{
            ...backgroundStyle,
            backgroundPosition: service.backgroundPosition || 'center 43%',
          }}
          aria-hidden="true"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true" />
        
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
            {service.title}
          </AuthorityHeading>
          <p 
            className="max-w-3xl mx-auto body-text text-white"
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
              lineHeight: '1.5',
              marginBottom: '1rem'
            }}
          >
            {service.overview}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="body-text text-lg text-neutral-800 dark:text-neutral-200 max-w-2xl mx-auto bg-white/80 dark:bg-paynesGray/80 rounded-xl shadow-lg p-8 -mt-16 relative z-20 backdrop-blur">
          
          {/* Detailed Content Section (if exists) */}
          {service.detailedContent && (
            <section className="mb-8">
              <h2 className="text-2xl subheading text-primary-800 mb-4">{ui.sections.serviceDetails}</h2>
              <ul className="list-disc list-inside text-left mx-auto inline-block space-y-4">
                {service.detailedContent.map((content, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: content }} />
                ))}
              </ul>
            </section>
          )}
          
          <section className="mb-8">
            <h2 className="text-2xl subheading text-primary-800 mb-2">{ui.sections.keyBenefits}</h2>
            <ul className="list-disc list-inside body-text space-y-1">
              {service.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl subheading text-primary-800 mb-2">{ui.sections.ourMethodology}</h2>
            <p className="body-text">{service.methodology}</p>
          </section>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4 heading">{ui.cta.readyToGetStarted}</h2>
          <p className="text-lg text-gray dark:text-paynesGray mb-8 body-text">
            {ui.cta.discussExpertise.replace('{service}', service.title.toLowerCase())}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" className="text-lg px-8 py-3">
              {ui.buttons.contactUs}
            </Button>
            <Button href="/services" variant="outline" className="text-lg px-8 py-3">
              {ui.buttons.exploreAllServices}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
} 