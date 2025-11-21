'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Button, AuthorityHeading, ContentErrorBoundary } from '@/components/ui';
import { homeContent } from '@/data/pages/home';
import { getResponsiveBackgroundStyle } from '@/lib/responsive-background';

const MotionP = dynamic(() => import('framer-motion').then(mod => mod.motion.p), { ssr: false });
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });

function HeroContent() {
  const backgroundStyle = getResponsiveBackgroundStyle(
    homeContent.hero.background.image,
    homeContent.hero.background.variants
  );

  return (
    <section className="hero-section relative h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-paynesGray">
      {/* Background image */}
      <div
        className="absolute inset-0 responsive-bg"
        style={backgroundStyle}
        aria-hidden="true"
      />
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      {/* Brand green accent bar at the top */}
      <div className="absolute top-0 left-0 w-full h-2 bg-primary z-10" />
      {/* Content */}
      <div className="content-container relative z-10 container mx-auto px-4 sm:px-6 text-center text-eggshell">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-container">
            <AuthorityHeading
              size="h1"
              className="font-bold mb-1 sm:mb-2 heading leading-tight"
              style={{ 
                color: '#fff',
                fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
                lineHeight: '1.2'
              }}
            >
              {homeContent.hero.title}
            </AuthorityHeading>
            
            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="mb-3 sm:mb-4 body-text text-white leading-relaxed px-2 sm:px-0"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
                lineHeight: '1.5'
              }}
            >
              {homeContent.hero.subtitle}
            </MotionP>
          </div>
          
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="button-container flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center px-4 sm:px-0"
          >
            <Button 
              href={homeContent.hero.buttons.primary.href} 
              className="btn-primary w-full sm:w-auto min-h-[44px] touch-target"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                padding: 'clamp(8px 16px, 2vh 4vw, 12px 24px)'
              }}
            >
              {homeContent.hero.buttons.primary.text}
            </Button>
            <Button 
              href={homeContent.hero.buttons.secondary.href} 
              variant="outline" 
              className="btn-secondary w-full sm:w-auto border-eggshell text-eggshell hover:bg-eggshell hover:text-paynesGray min-h-[44px] touch-target"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                padding: 'clamp(8px 16px, 2vh 4vw, 12px 24px)'
              }}
            >
              {homeContent.hero.buttons.secondary.text}
            </Button>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <ContentErrorBoundary>
      <HeroContent />
    </ContentErrorBoundary>
  );
} 