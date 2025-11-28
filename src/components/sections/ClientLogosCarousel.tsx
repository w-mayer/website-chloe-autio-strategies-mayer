'use client';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { AuthorityHeading } from '@/components/ui';
import { siteContent } from '@/data/content';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';

function useInViewAnimation() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

interface LogoCardProps {
  logo: { name: string; image: string; alt: string; size: 'standard' | 'large' | 'extra-large' };
  index: number;
}

function LogoCard({ logo, index }: LogoCardProps) {
  const [hasMounted, setHasMounted] = React.useState(false);
  
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Logo-specific sizing for perfect visual balance
  const getLogoSpecificSize = () => {
    const logoSizes: Record<string, { width: number; height: number }> = {
      'nist': { width: 300, height: 130 },
      'google-cloud-platform': { width: 240, height: 140 }, // Note: key is 'google-cloud-platform'
      'google-deepmind': { width: 220, height: 90 },
      'meta': { width: 140, height: 60 },
      'oecd': { width: 180, height: 90 },
      'uber': { width: 120, height: 50 },
      'cohere': { width: 200, height: 80 },
      'department-of-defense': { width: 170, height: 85 },
      'us-department-of-defense': { width: 170, height: 85 }
    };

    // Create a key from logo name (handle spaces, case, special chars)
    const logoKey = logo.name.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return {
      container: 'h-32 sm:h-36 md:h-40 w-64 sm:w-72 md:w-80', // SAME height for ALL logos
      image: logoSizes[logoKey] || { width: 180, height: 80 }
    };
  };

  const sizeConfig = getLogoSpecificSize();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={hasMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`flex items-center justify-center p-4 flex-shrink-0 ${sizeConfig.container}`}
      aria-label={logo.name}
    >
      <Image
        src={logo.image}
        alt={logo.alt}
        width={sizeConfig.image.width}
        height={sizeConfig.image.height}
        sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 300px"
        className={`${
          logo.name.toLowerCase().includes('cloud') 
          ? 'object-cover' 
          : 'object-contain'
        } hover:opacity-80 transition-all duration-300`}
        style={{ objectPosition: 'center' }}
      />
    </motion.div>
  );
}

interface CarouselControlsProps {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

function CarouselControls({ 
  canScrollPrev, 
  canScrollNext, 
  scrollPrev, 
  scrollNext, 
  isPlaying, 
  onTogglePlay 
}: CarouselControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Previous logos"
      >
        <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
      </button>
      
      <button
        onClick={onTogglePlay}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
      >
        {isPlaying ? (
          <PauseIcon className="w-5 h-5 text-gray-700" />
        ) : (
          <PlayIcon className="w-5 h-5 text-gray-700" />
        )}
      </button>
      
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Next logos"
      >
        <ChevronRightIcon className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}

export function ClientLogosCarousel() {
  const { clientLogos } = siteContent;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 640px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 },
      }
    }
  );
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [ref, inView] = useInViewAnimation();
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Custom autoplay implementation
  useEffect(() => {
    if (isPlaying && inView && emblaApi) {
      autoplayRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
    } else {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isPlaying, inView, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);


  return (
    <section 
      ref={ref}
      className="w-full pt-8 md:pt-8 pb-4 md:pb-6 bg-white"
      aria-label="Client logos carousel"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center text-center">
          <AuthorityHeading
            size="h2"
            className="text-3xl md:text-4xl font-bold text-center mb-6 heading max-w-full overflow-hidden"
          >
            {clientLogos.title}
          </AuthorityHeading>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {clientLogos.logos.map((logo, index) => (
                <LogoCard key={logo.name} logo={logo as { name: string; image: string; alt: string; size: 'standard' | 'large' | 'extra-large' }} index={index} />
              ))}
            </div>
          </div>
          
          <CarouselControls
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
            scrollPrev={scrollPrev}
            scrollNext={scrollNext}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
          />
        </div>
      </div>
    </section>
  );
}
