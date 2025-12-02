import { Button, AuthorityHeading, ContentErrorBoundary } from '@/components/ui';
import { homeContent } from '@/data/pages/home';
import { getResponsiveBackgroundStyle } from '@/lib/responsive-background';

function HeroContent() {
  const backgroundStyle = getResponsiveBackgroundStyle(
    homeContent.hero.background.image,
    homeContent.hero.background.variants
  );

  return (
    <section className="hero-section relative h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-paynesGray">
      <div
        className="absolute inset-0 responsive-bg"
        style={backgroundStyle}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-full h-2 bg-primary z-10" />

      <div className="content-container relative z-10 container mx-auto px-4 sm:px-6 text-center text-eggshell">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-container space-y-3">
            <AuthorityHeading
              size="h1"
              className="font-bold mb-1 sm:mb-2 heading leading-tight"
              style={{
                color: '#fff',
                fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
                lineHeight: '1.2',
              }}
            >
              {homeContent.hero.title}
            </AuthorityHeading>
            <p
              className="mb-3 sm:mb-4 body-text text-white leading-relaxed px-2 sm:px-0"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
                lineHeight: '1.5',
              }}
            >
              {homeContent.hero.subtitle}
            </p>
          </div>

          <div className="button-container flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center px-4 sm:px-0">
            <Button
              href={homeContent.hero.buttons.primary.href}
              className="btn-primary w-full sm:w-auto min-h-[44px] touch-target"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                padding: 'clamp(8px 16px, 2vh 4vw, 12px 24px)',
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
                padding: 'clamp(8px 16px, 2vh 4vw, 12px 24px)',
              }}
            >
              {homeContent.hero.buttons.secondary.text}
            </Button>
          </div>
        </div>
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
