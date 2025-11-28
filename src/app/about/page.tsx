import React from 'react';
import { Metadata } from 'next';
import { AuthorityHeading } from '@/components/ui';
import Image from 'next/image';
import { aboutContent } from '@/data/pages/about';
import { siteMetadata } from '@/data/metadata';

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
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 heading">
            {body.title}
          </h2>
          <p className="text-lg md:text-xl text-gray dark:text-paynesGray leading-relaxed body-text">
            {body.description}
          </p>
        </div>
      </section>

      {/* Team Section Header */}
      <section className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 heading">
            {teamSection.title}
          </h2>
        </div>
      </section>

      {/* Team Members */}
      <section className="container mx-auto px-4 py-8">
        {/* Images Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Chloe Autio Image */}
          <div className="flex justify-center">
            <div 
              className="relative w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white"
              style={{ aspectRatio: '5/4' }}
            >
              <Image
                src={team.chloe.image.src}
                alt={team.chloe.image.alt}
                fill
                className="object-cover"
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
              />
            </div>
          </div>
          
          {/* Samuel Wells Image */}
          <div className="flex justify-center">
            <div 
              className="relative w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white"
              style={{ aspectRatio: '5/4' }}
            >
              <Image
                src={team.samuel.image.src}
                alt={team.samuel.image.alt}
                fill
                className="object-cover"
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
              />
            </div>
          </div>
        </div>

        {/* Bios Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chloe Autio Bio */}
          <div itemScope itemType="https://schema.org/Person">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 heading text-center" itemProp="name">
              {team.chloe.name}
            </h2>
            <p className="text-xl text-primary-600 mb-4 body-text text-center" itemProp="jobTitle">
              {team.chloe.title}
            </p>
            <p className="text-lg text-gray dark:text-paynesGray mb-4 body-text" itemProp="description">
              {team.chloe.description}
            </p>
            <p className="text-lg text-gray dark:text-paynesGray mb-4 body-text">
              {team.chloe.bio}
            </p>
          </div>

          {/* Samuel Wells Bio */}
          <div itemScope itemType="https://schema.org/Person">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 heading text-center" itemProp="name">
              {team.samuel.name}
            </h2>
            <p className="text-xl text-primary-600 mb-4 body-text text-center" itemProp="jobTitle">
              {team.samuel.title}
            </p>
            <p className="text-lg text-gray dark:text-paynesGray mb-4 body-text" itemProp="description">
              {team.samuel.description}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8">
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