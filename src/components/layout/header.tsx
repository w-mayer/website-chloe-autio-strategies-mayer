'use client';
import React from 'react';
import { Menu } from 'lucide-react';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import Image from 'next/image';
import { siteContent } from '@/data/content';

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { header } = siteContent;

  // Handle scroll-based transparency (optimized to avoid forced reflows)
  React.useEffect(() => {
    // Track previous state to avoid unnecessary updates
    let previousScrolled = false;
    
    // Track requestAnimationFrame ID for cleanup
    let rafId: number | null = null;
    
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafId !== null) return;
      
      // Batch the scroll handling in requestAnimationFrame
      rafId = requestAnimationFrame(() => {
        // Only read scrollY (doesn't cause reflow)
        const isScrolled = window.scrollY > 10;
        
        // Only update state if it actually changed
        if (isScrolled !== previousScrolled) {
          previousScrolled = isScrolled;
          setScrolled(isScrolled);
        }
        
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Cleanup pending animation frame
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 navbar-enhanced ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-gray-200' 
          : 'bg-white/90 backdrop-blur-sm border-gray-200'
      }`}
    >
      <div className="container flex h-16 items-center px-4 relative">
        {/* Logo - positioned absolutely on the left */}
        <a className="flex items-center flex-shrink-0 absolute left-4" href="/" aria-label="Home">
          <Image
            src={header.logo.src}
            alt={header.logo.alt}
            width={138}
            height={40}
            sizes="138px"
            className="block"
          />
        </a>
        
        {/* Mobile menu button - positioned absolutely on the right */}
        <div className="flex items-center gap-2 flex-shrink-0 absolute right-4">
          <button
            className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 hover:bg-gray-100 transition-colors"
            aria-label={header.mobileMenu.openButton.ariaLabel}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        
        {/* Desktop Navigation - centered */}
        <nav className="hidden xl:flex items-center justify-center w-full">
          <Navigation />
        </nav>
        
        {/* Large Tablet Navigation - Horizontal Scrollable and centered */}
        <nav className="hidden lg:flex xl:hidden items-center justify-center w-full min-w-0">
          <div className="flex items-center gap-4 px-4 overflow-x-auto scrollbar-hide scroll-smooth">
            <Navigation />
          </div>
        </nav>
        
        {/* Medium Tablet Navigation - Horizontal Scrollable and centered */}
        <nav className="hidden md:flex lg:hidden items-center justify-center w-full min-w-0">
          <div className="flex items-center gap-3 px-2 overflow-x-auto scrollbar-hide scroll-smooth">
            <Navigation />
          </div>
        </nav>
        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </header>
  );
} 