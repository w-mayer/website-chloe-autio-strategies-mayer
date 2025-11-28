'use client';
import React from 'react';
import { MotionQuote, useInViewAnimation } from '@/components/ui/motion';
import { siteContent } from '@/data/content';

interface TestimonialCardProps {
  testimonial: { quote: string; name: string; role: string };
  delay: number;
}

function TestimonialCard({ testimonial, delay }: TestimonialCardProps) {
  const [ref, inView] = useInViewAnimation<HTMLQuoteElement>();
  return (
    <MotionQuote
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="rounded-lg bg-eggshell border border-ashGray p-8 shadow-soft flex flex-col items-center text-center transition-all duration-200"
    >
      <p className="text-lg text-neutral-800 dark:text-neutral-100 mb-4 font-medium body-text">&ldquo;{testimonial.quote}&rdquo;</p>
      <footer className="mt-4">
        <span className="block font-semibold text-primary-700 dark:text-primary-400">{testimonial.name}</span>
        <span className="block text-sm text-neutral-500 dark:text-neutral-400">{testimonial.role}</span>
      </footer>
    </MotionQuote>
  );
}

export function Testimonials() {
  const { testimonials } = siteContent;
  
  return (
    <section className="w-full py-16 md:py-24 bg-primary-50 dark:bg-neutral-900 border-t border-ashGray dark:border-paynesGray">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">
          {testimonials.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.items.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
