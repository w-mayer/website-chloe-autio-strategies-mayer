'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const linkedInSVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/>
  </svg>
);

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <div className={`site-nav-wrap${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <nav className="site-nav">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="logo-img"
              src="/images/logo/optimized/AutioStrategies_Logo_FullColor_Horz (1).webp"
              alt="Autio Strategies"
            />
          </Link>
          <div className="nav-links">
            <Link href="/" className={isActive('/') ? 'current' : ''}>Home</Link>
            <Link href="/services" className={isActive('/services') ? 'current' : ''}>Services</Link>
            <Link href="/about" className={isActive('/about') ? 'current' : ''}>About</Link>
            <Link href="/contact" className={isActive('/contact') ? 'current' : ''}>Contact</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export { linkedInSVG };
