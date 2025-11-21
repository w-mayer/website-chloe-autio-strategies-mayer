import Image from 'next/image';
import { Button } from '@/components/ui';
import { siteContent } from '@/data/content';
import { getResponsiveBackgroundStyle } from '@/lib/responsive-background';

export function ContactCTA() {
  const { contactCTA } = siteContent;
  const backgroundStyle = getResponsiveBackgroundStyle(
    contactCTA.background.image,
    contactCTA.background.variants
  );

  return (
    <section className="relative h-[35vh] min-h-[300px] flex items-center justify-center text-eggshell overflow-hidden">
      <div
        className="absolute inset-0 responsive-bg"
        style={backgroundStyle}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Image
            src={contactCTA.logo.image}
            alt={contactCTA.logo.alt}
            width={180}
            height={45}
            className="w-auto max-w-xs"
          />
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={contactCTA.buttons.primary.href} className="text-sm px-5 py-2">
              {contactCTA.buttons.primary.text}
            </Button>
            <Button
              href={contactCTA.buttons.secondary.href}
              variant="outline"
              className="text-sm px-5 py-2 border-eggshell text-eggshell hover:bg-eggshell hover:text-paynesGray"
            >
              {contactCTA.buttons.secondary.text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}