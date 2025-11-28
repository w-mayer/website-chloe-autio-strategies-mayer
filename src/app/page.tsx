import { Hero } from '@/components/sections/Hero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { ValueProposition } from '@/components/sections/ValueProposition';
import dynamic from 'next/dynamic';

// Lazy load below-the-fold components to reduce initial JS payload
const ClientLogosCarousel = dynamic(
  () => import('@/components/sections/ClientLogosCarousel').then(mod => ({ default: mod.ClientLogosCarousel })),
  { 
    ssr: false,
    loading: () => (
      <section className="w-full pt-8 md:pt-8 pb-4 md:pb-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="h-10 w-64 bg-neutral-200 rounded animate-pulse mb-6" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 w-64 bg-neutral-200 rounded animate-pulse flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>
    )
  }
);

export default function Home() {
  return (
    <main className="flex flex-col gap-0">
      <Hero />
      <ServicesGrid />
      <ClientLogosCarousel />
      <ValueProposition />
      <ContactCTA />
    </main>
  );
}
