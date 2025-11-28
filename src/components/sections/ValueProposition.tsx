'use client';
import { AuthorityHeading } from '@/components/ui';
import { siteContent } from '@/data/content';
import { useInView } from '@/lib/hooks/useInView';

interface CardProps {
  title: string;
  desc: string;
  index: number;
}

function Card({ title, desc, index }: CardProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const delay = index * 0.15;
  
  return (
    <div 
      ref={ref}
      className={`service-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg animate-on-scroll fade-up ${inView ? 'is-visible' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative h-full flex flex-col justify-start">
        <h3 className="text-xl font-semibold text-primary mb-2 service-card-icon">{title}</h3>
        <p className="text-neutral-700 dark:text-neutral-200 text-base body-text service-card-number">{desc}</p>
      </div>
    </div>
  );
}

export function ValueProposition() {
  const { valueProposition } = siteContent;

  return (
    <section className="w-full pt-8 md:pt-8 pb-12 md:pb-16 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="mb-8">
          <AuthorityHeading
            size="h2"
            className="text-3xl md:text-4xl font-bold text-center mb-6 heading max-w-full overflow-hidden"
          >
            {valueProposition.title}
          </AuthorityHeading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {valueProposition.cards.map((card, index) => (
            <Card key={card.title} title={card.title} desc={card.description} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}