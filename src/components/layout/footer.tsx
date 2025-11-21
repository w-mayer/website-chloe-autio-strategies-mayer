'use client';

import React from 'react';
import { Mail, Linkedin, Phone } from 'lucide-react';
import Image from "next/image";
import { siteContent } from '@/data/content';

export function Footer() {
  const { footer, site } = siteContent;
  
  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if it's a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
      e.preventDefault();
      // Show a message for desktop users
      alert(`To call ${footer.contact.phone.number}, please use your phone or copy this number: ${footer.contact.phone.number}`);
    }
    // On mobile devices, let the default tel: behavior work
  };
  
  return (
    <footer className="border-t bg-white" style={{ fontFamily: 'DM Sans, Arial, Helvetica, sans-serif', color: '#434344' }}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <div className="flex items-center mb-2 md:mb-0 md:mr-4">
            <Image
              src={footer.logo.src}
              alt={footer.logo.alt}
              width={32}
              height={32}
              className="opacity-80"
            />
          </div>
          <p className="text-center text-sm leading-loose md:text-left" style={{ color: '#434344', fontFamily: 'DM Sans, Arial, Helvetica, sans-serif' }}>
            {footer.builtBy}{" "}
            <a
              href={site.website}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-[#6F9C3B] transition-colors"
              style={{ fontFamily: 'DM Sans, Arial, Helvetica, sans-serif', color: '#434344' }}
            >
              {site.name}
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a
              href={footer.contact.email.href}
              className="text-[#434344] hover:text-[#6F9C3B] transition-colors"
              aria-label={footer.contact.email.text}
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={footer.contact.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="text-[#434344] hover:text-[#6F9C3B] transition-colors"
              aria-label={footer.contact.linkedin.text}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={footer.contact.phone.href}
              onClick={handlePhoneClick}
              className="flex items-center space-x-1 text-[#434344] hover:text-[#6F9C3B] transition-colors cursor-pointer"
              aria-label={`${footer.contact.phone.text}: ${footer.contact.phone.number}`}
              title={`Call ${footer.contact.phone.number}`}
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">{footer.contact.phone.number}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 