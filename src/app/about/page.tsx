import React from 'react';
import { Metadata } from 'next';
import { AuthorityHeading } from '@/components/ui';
import Image from 'next/image';
import { aboutContent } from '@/data/pages/about';
import { siteMetadata } from '@/data/metadata';

// Placeholder component for team member without image
function PlaceholderImage({ alt }: { alt: string }) {
  return (
    <div 
      className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
      aria-label={alt}
    >
      <svg 
        className="w-24 h-24 text-gray-400" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
  );
}

export const metadata: Metadata = {
  title: siteMetadata.pages.about.title,
  description: siteMetadata.pages.about.description,
  keywords: siteMetadata.pages.about.keywords,
  openGraph: {
    title: siteMetadata.pages.about.title,
    description: siteMetadata.pages.about.description,
    url: siteMetadata.pages.about.url,
    siteName: siteMetadata.default.siteName,
    images: [siteMetadata.default.image],
    locale: siteMetadata.default.locale,
    type: 'website' as const,
  },
  alternates: {
    canonical: siteMetadata.pages.about.url,
  },
};

export default function AboutPage() {
  const { hero, body, teamSection, team, cta } = aboutContent;
  
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
        </div>
      </section>

      {/* Body Text Section */}
      <section className="container mx-auto px-4 pt-12 pb-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 heading">
            {body.title}
          </h2>
          <p className="text-lg md:text-xl text-gray dark:text-paynesGray leading-relaxed body-text">
            {body.description}
          </p>
        </div>
      </section>

      {/* Team Section - Side-by-Side Stacked Layout */}
      <section className="bg-slate-50 pt-10 pb-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary heading">
              {teamSection.title}
            </h2>
          </div>

          {/* Stacked Team Members */}
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Chloe Autio Row */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start" itemScope itemType="https://schema.org/Person">
              {/* Chloe Headshot */}
              <div className="flex-shrink-0">
                <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-lg overflow-hidden shadow-lg bg-white">
                  <Image
                    src={team.chloe.image.src}
                    alt={team.chloe.image.alt}
                    fill
                    className="object-cover"
                    priority={true}
                    quality={90}
                    sizes="(max-width: 768px) 256px, 288px"
                  />
                </div>
              </div>
              
              {/* Chloe Bio */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 heading" itemProp="name">
                  {team.chloe.name}
                </h3>
                <p className="text-lg text-primary-600 mb-4 body-text" itemProp="jobTitle">
                  {team.chloe.title}
                </p>
                <p className="text-base text-gray dark:text-paynesGray mb-4 body-text" itemProp="description">
                  {team.chloe.description}
                </p>
                {team.chloe.bio && (
                  <p className="text-base text-gray dark:text-paynesGray body-text">
                    {team.chloe.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Samuel Wells Row */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start" itemScope itemType="https://schema.org/Person">
              {/* Samuel Headshot */}
              <div className="flex-shrink-0">
                <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-lg overflow-hidden shadow-lg bg-white">
                  <Image
                    src={team.samuel.image.src}
                    alt={team.samuel.image.alt}
                    fill
                    className="object-cover"
                    priority={true}
                    quality={90}
                    sizes="(max-width: 768px) 256px, 288px"
                  />
                </div>
              </div>
              
              {/* Samuel Bio */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 heading" itemProp="name">
                  {team.samuel.name}
                </h3>
                <p className="text-lg text-primary-600 mb-4 body-text" itemProp="jobTitle">
                  {team.samuel.title}
                </p>
                <p className="text-base text-gray dark:text-paynesGray body-text" itemProp="description">
                  {team.samuel.description}
                </p>
              </div>
            </div>

            {/* New Team Member Row */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start" itemScope itemType="https://schema.org/Person">
              {/* New Member Headshot (Placeholder) */}
              <div className="flex-shrink-0">
                <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-lg overflow-hidden shadow-lg bg-white">
                  <PlaceholderImage alt={team.chaerin.image.alt} />
                </div>
              </div>
              
              {/* New Member Bio */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 heading" itemProp="name">
                  {team.chaerin.name}
                </h3>
                <p className="text-lg text-primary-600 mb-4 body-text" itemProp="jobTitle">
                  {team.chaerin.title}
                </p>
                <p className="text-base text-gray dark:text-paynesGray body-text" itemProp="description">
                  {team.chaerin.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8 bg-slate-50">
        <h2 className="text-2xl font-bold text-primary mb-4 heading">{cta.title}</h2>
        <p className="text-lg text-gray dark:text-paynesGray mb-6 max-w-2xl mx-auto body-text">
          {cta.description}
        </p>
        <a
          href={cta.button.href}
          className="btn-primary btn-primary-cta inline-block mb-8"
          aria-label={`${cta.button.text} with Autio Strategies Team`}
        >
          {cta.button.text}
        </a>
      </section>

      {/* Schema.org Organization JSON-LD for SEO */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Autio Strategies',
          description: 'AI policy consulting and technology governance experts providing strategic guidance to government bodies, Fortune 50 companies, and leading organizations.',
          url: siteMetadata.default.url,
          logo: `${siteMetadata.default.url}/images/logo/optimized/AutioStrategies_Logo_FullColor_Horz (1).webp`,
          employee: [
            {
              '@type': 'Person',
              name: 'Chloe Autio',
              jobTitle: 'Founder & CEO',
              description: 'Technology policy expert specializing in AI policy, governance, and regulatory strategy.',
              alumniOf: 'University of California, Berkeley',
              hasCredential: 'B.A. in Economics'
            },
            {
              '@type': 'Person',
              name: 'Samuel Wells',
              jobTitle: 'Policy Manager',
              description: 'Policy expert with experience in government relations and technology policy.',
              alumniOf: 'University of Virginia',
              hasCredential: 'B.A. in Public Policy & Leadership'
            }
          ]
        })}
      </script>
    </div>
  );
}
