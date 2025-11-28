import React from 'react';
import { Metadata } from 'next';
import { AuthorityHeading } from '@/components/ui';
import Image from 'next/image';
import { aboutTestContent } from '@/data/pages/about-test';

export const metadata: Metadata = {
  title: 'About Page Layout Test | Autio Strategies',
  description: 'Internal test page for about page layout variations',
  robots: 'noindex, nofollow',
};

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

export default function AboutTestPage() {
  const { hero, body, teamSection, team, cta } = aboutTestContent;
  
  return (
    <div className="min-h-screen bg-white">
      {/* Test Page Banner */}
      <div className="bg-amber-500 text-white py-3 text-center font-semibold">
        Layout Test Page - Not for Production
      </div>

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

      {/* ============================================ */}
      {/* LAYOUT 1: Three Equal Columns */}
      {/* ============================================ */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          {/* Layout Label */}
          <div className="text-center mb-12">
            <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              Layout 1: Three Equal Columns
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary heading">
              {teamSection.title}
            </h2>
          </div>

          {/* Three Column Images Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Chloe Autio Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm h-[400px] rounded-lg overflow-hidden shadow-lg bg-white">
                <Image
                  src={team.chloe.image.src}
                  alt={team.chloe.image.alt}
                  fill
                  className="object-cover"
                  priority={true}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 384px"
                />
              </div>
            </div>
            
            {/* Samuel Wells Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm h-[400px] rounded-lg overflow-hidden shadow-lg bg-white">
                <Image
                  src={team.samuel.image.src}
                  alt={team.samuel.image.alt}
                  fill
                  className="object-cover"
                  priority={true}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 384px"
                />
              </div>
            </div>

            {/* New Team Member Image (Placeholder) */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm h-[400px] rounded-lg overflow-hidden shadow-lg bg-white">
                <PlaceholderImage alt={team.newMember.image.alt} />
              </div>
            </div>
          </div>

          {/* Three Column Bios Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chloe Autio Bio */}
            <div itemScope itemType="https://schema.org/Person">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 heading text-center" itemProp="name">
                {team.chloe.name}
              </h3>
              <p className="text-lg text-primary-600 mb-4 body-text text-center" itemProp="jobTitle">
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

            {/* Samuel Wells Bio */}
            <div itemScope itemType="https://schema.org/Person">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 heading text-center" itemProp="name">
                {team.samuel.name}
              </h3>
              <p className="text-lg text-primary-600 mb-4 body-text text-center" itemProp="jobTitle">
                {team.samuel.title}
              </p>
              <p className="text-base text-gray dark:text-paynesGray body-text" itemProp="description">
                {team.samuel.description}
              </p>
            </div>

            {/* New Team Member Bio */}
            <div itemScope itemType="https://schema.org/Person">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 heading text-center" itemProp="name">
                {team.newMember.name}
              </h3>
              <p className="text-lg text-primary-600 mb-4 body-text text-center" itemProp="jobTitle">
                {team.newMember.title}
              </p>
              <p className="text-base text-gray dark:text-paynesGray body-text" itemProp="description">
                {team.newMember.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Layout 1 */}
      <section className="text-center py-8 bg-slate-50 border-b-4 border-slate-200">
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

      {/* Divider between layouts */}
      <div className="py-12 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="border-t-2 border-dashed border-gray-300 pt-8">
            <p className="text-gray-500 text-lg">Alternative Layout Below</p>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* LAYOUT 2: Featured Founder */}
      {/* ============================================ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Layout Label */}
          <div className="text-center mb-12">
            <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              Layout 2: Featured Founder
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary heading">
              {teamSection.title}
            </h2>
          </div>

          {/* Featured Founder - Chloe (Full Width) */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex flex-col items-center">
              {/* Chloe Image - Centered */}
              <div className="relative w-full max-w-md h-[500px] rounded-lg overflow-hidden shadow-lg bg-white mb-8">
                <Image
                  src={team.chloe.image.src}
                  alt={team.chloe.image.alt}
                  fill
                  className="object-cover"
                  priority={true}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 448px"
                />
              </div>
              
              {/* Chloe Bio - Centered */}
              <div className="text-center max-w-3xl" itemScope itemType="https://schema.org/Person">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2 heading" itemProp="name">
                  {team.chloe.name}
                </h3>
                <p className="text-xl text-primary-600 mb-6 body-text" itemProp="jobTitle">
                  {team.chloe.title}
                </p>
                <p className="text-lg text-gray dark:text-paynesGray mb-4 body-text" itemProp="description">
                  {team.chloe.description}
                </p>
                {team.chloe.bio && (
                  <p className="text-lg text-gray dark:text-paynesGray body-text">
                    {team.chloe.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Two Column - Samuel + New Member */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Samuel Wells */}
            <div className="flex flex-col items-center">
              {/* Samuel Image */}
              <div className="relative w-full max-w-sm h-[400px] rounded-lg overflow-hidden shadow-lg bg-white mb-6">
                <Image
                  src={team.samuel.image.src}
                  alt={team.samuel.image.alt}
                  fill
                  className="object-cover"
                  priority={true}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                />
              </div>
              
              {/* Samuel Bio */}
              <div className="text-center" itemScope itemType="https://schema.org/Person">
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

            {/* New Team Member */}
            <div className="flex flex-col items-center">
              {/* New Member Image (Placeholder) */}
              <div className="relative w-full max-w-sm h-[400px] rounded-lg overflow-hidden shadow-lg bg-white mb-6">
                <PlaceholderImage alt={team.newMember.image.alt} />
              </div>
              
              {/* New Member Bio */}
              <div className="text-center" itemScope itemType="https://schema.org/Person">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 heading" itemProp="name">
                  {team.newMember.name}
                </h3>
                <p className="text-lg text-primary-600 mb-4 body-text" itemProp="jobTitle">
                  {team.newMember.title}
                </p>
                <p className="text-base text-gray dark:text-paynesGray body-text" itemProp="description">
                  {team.newMember.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Layout 2 */}
      <section className="text-center py-8 border-b-4 border-slate-200">
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

      {/* Divider between layouts */}
      <div className="py-12 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="border-t-2 border-dashed border-gray-300 pt-8">
            <p className="text-gray-500 text-lg">Alternative Layout Below</p>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* LAYOUT 3: Side-by-Side Stacked */}
      {/* ============================================ */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          {/* Layout Label */}
          <div className="text-center mb-12">
            <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              Layout 3: Side-by-Side Stacked
            </div>
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
                  <PlaceholderImage alt={team.newMember.image.alt} />
                </div>
              </div>
              
              {/* New Member Bio */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 heading" itemProp="name">
                  {team.newMember.name}
                </h3>
                <p className="text-lg text-primary-600 mb-4 body-text" itemProp="jobTitle">
                  {team.newMember.title}
                </p>
                <p className="text-base text-gray dark:text-paynesGray body-text" itemProp="description">
                  {team.newMember.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Layout 3 */}
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
    </div>
  );
}

