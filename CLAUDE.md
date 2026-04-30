# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build (static export to /out)
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix linting issues
npm run type-check   # TypeScript type checking (tsc --noEmit)
npm run format       # Format code with Prettier
```

There are no automated tests. Verify changes visually by running the dev server.

## Architecture

This is a **Next.js 14 static site** (App Router, `output: 'export'`) deployed to Netlify. The build outputs to `/out` with `trailingSlash: true`. Next.js Image optimization is disabled (`unoptimized: true`) because it's incompatible with static export — use the `OptimizedImage` component from `src/components/ui/` instead, which handles responsive WebP images manually.

### Content is separated from components

**All text content must come from `src/data/`** — never hardcode strings in components. The data layer is:

- `src/data/content.ts` — site-wide UI text (`siteContent`): navigation, service labels, client logos, form labels, CTA text
- `src/data/metadata.ts` — page-level SEO metadata (`siteMetadata`): titles, descriptions, Open Graph
- `src/data/services.ts` — services data used in `ServicesGrid` and service detail pages
- `src/data/resources.ts` — articles, policy briefs, case studies
- `src/data/pages/` — per-page content modules (e.g., `home.ts`, `about.ts`, `services.ts`) imported by page components

Page components import from both `siteContent` (shared UI text) and their page-specific data module.

### Component hierarchy

```
src/components/
  ui/           # Primitive components: Button, Card, Input, Textarea, Badge,
                # Modal, OptimizedImage, AuthorityHeading, error boundaries
  layout/       # Header, Footer, Navigation, MobileMenu
  sections/     # Full-width page sections: Hero, ServicesGrid, ValueProposition,
                # ClientLogosCarousel, ContactCTA, PageHero, Testimonials, NewsletterSignup
  forms/        # ContactForm, NewsletterForm (Netlify-powered)
  content/      # Content display components (ArticleCard, etc.)
```

`AuthorityHeading` (`src/components/ui/AuthorityHeading.tsx`) is the standard heading component — it wraps each word in a `<span>` for the animated underline effect. Use it instead of plain `<h1>`–`<h6>` tags for section headings.

### Routing

Pages live in `src/app/` using the Next.js App Router convention. Dynamic routes exist for `/services/[slug]` and `/insights/[slug]`. Some pages split server and client concerns into a separate `*Client.tsx` file (e.g., `ContactPageClient.tsx`, `ServicesGridClient.tsx`) due to `'use client'` requirements.

### Forms

Forms are handled by **Netlify Forms**. Key requirements:
- The `<form>` must include `data-netlify="true"` and a matching `name` attribute
- `public/forms.html` is a static HTML file that must exist — Netlify scans it at deploy time to detect forms
- Form names must be consistent between `public/forms.html` and the React components

### Design system

Colors are defined as CSS custom properties in `src/app/globals.css`:
- Primary green: `#6F9C3B` (`--primary`)
- Background eggshell: `#E8E9D7` (`--background`)
- Gray: `#434344` (`--foreground`)
- Vanilla: `#E1DBA7` (`--secondary`)
- Ash Gray: `#AAC1BF` (`--border`)

Tailwind CSS uses these via `var(--*)` references in `tailwind.config.ts`. Use only Tailwind utility classes — no inline styles except for dynamic values. Follow mobile-first responsive design.

Font: **DM Sans** loaded via `next/font/google` in `src/app/layout.tsx`, available as `var(--font-dm-sans)`.

### Business context

Business name: **Autio Strategies** | Website: **autiostrategies.com** | Contact: **chloe@autiostrategies.com**

The site serves as a digital presence for an AI policy consulting firm. Pages: Home, About, Services, Insights, Contact.
