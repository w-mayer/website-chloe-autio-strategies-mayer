# Autio Strategies Website — Handoff Notes

## Stack at a glance

- **Framework:** Next.js (App Router) with TypeScript, exported as static HTML
- **Styling:** Tailwind CSS + shadcn-style CSS variables; DM Sans (Google Fonts)
- **Repo:** `github.com/w-mayer/website-chloe-autio-strategies-mayer`
- **Hosting:** Netlify (auto-deploys from `main`)
- **Forms:** Netlify Forms
- **DNS / domain:** registered at Squarespace; DNS records point to Netlify

## Local development

```bash
git clone <repo-url>
cd website-chloe-autio-strategies-mayer
npm install
npm run dev          # http://localhost:3000
npm run build        # produces /out for Netlify
npm run lint         # ESLint
npm run type-check   # TypeScript
```

Node 18+. Push to `main` to deploy.

## Architecture

All editable content is centralized in `src/data/`. Page route files in `src/app/` import from there — no copy is hardcoded in components. To change wording, an image, or a service, edit the data file; the route picks it up.

```
src/
├── app/                # routes (one folder per URL path)
├── components/         # presentational + form components
└── data/               # 👈 EDIT THESE for content changes
    ├── content.ts      # global/shared content (nav, footer, CTAs, forms, UI strings)
    ├── services.ts     # the 7 service offerings
    ├── resources.ts    # insights articles + author bios
    ├── metadata.ts     # SEO/OG metadata for every page
    └── pages/          # per-page hero + page-specific content
        ├── home.ts
        ├── about.ts    # also contains team bios
        ├── services.ts
        ├── resources.ts
        └── contact.ts
public/images/          # all images (use /optimized/*.webp paths)
```

## Where to edit each element

| To change…                                                        | Edit                                                                                                                                                  |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Top nav links                                                     | `content.ts` → `navigation.items`                                                                                                                     |
| Homepage hero (title, subtitle, buttons, background)              | `pages/home.ts`                                                                                                                                       |
| Homepage testimonials, value-prop cards, "Ready to Transform" CTA | `content.ts`                                                                                                                                          |
| Partner logos (homepage strip)                                    | `content.ts` → `clientLogos.logos` (drop new `.webp` into `/public/images/partner_logos/optimized/`)                                                  |
| About page "What we do" paragraph                                 | `pages/about.ts` → `body.description`                                                                                                                 |
| Team bios + headshots                                             | `pages/about.ts` → `team.{chloe,samuel,chaerin}`                                                                                                      |
| A service offering (copy, benefits, methodology, detail bullets)  | `services.ts`                                                                                                                                         |
| Add a new service                                                 | Add entry to `services.ts` **and** matching `services.{slug}` in `metadata.ts`; create the route at `src/app/services/[slug]` (handled automatically) |
| Insights articles                                                 | `resources.ts` → `articles[]` **and** matching `resources.{slug}` in `metadata.ts`                                                                    |
| Footer email / phone / LinkedIn                                   | `content.ts` → `footer.contact`                                                                                                                       |
| Contact form labels & validation messages                         | `content.ts` → `forms.contact`                                                                                                                        |
| Page `<title>` / SEO description / keywords                       | `metadata.ts`                                                                                                                                         |
| Hero background images on any page                                | corresponding `pages/*.ts` (small/medium/large variants exist)                                                                                        |

After adding any new image, run `npm run optimize-images` (or `optimize-headshots`) and reference the `/optimized/*.webp` path.

## Styling

- **Tailwind config:** `tailwind.config.ts` — defines brand colors and design tokens
- **Brand palette:** Green `#6F9C3B` (primary), Payne's Gray `#455D6A`, plus Eggshell, Vanilla, Ash Gray, Pale Dogwood
- **Theme variables:** `src/app/globals.css` — CSS variables for `--background`, `--primary`, `--border`, etc., used by shadcn-style components. Edit colors here OR in `tailwind.config.ts` (kept in sync)
- **Font:** DM Sans, loaded in `src/app/layout.tsx`
- **Typography & spacing:** use Tailwind utility classes in components

## Forms (Netlify)

Two forms, both handled by Netlify Forms — no backend code, submissions appear in the Netlify dashboard under **Forms**.

- **Contact form** (name `contact`) — `src/components/forms/ContactForm.tsx`
- **Newsletter form** (name `newsletter`) — `src/components/forms/NewsletterForm.tsx`
- **Static stub for detection:** `public/forms.html` — hidden HTML versions of both forms. Netlify scans this file at build to register the forms. **If you add a new field to a React form, add it here too**, otherwise Netlify will reject the submission as a missing field.
- **Notifications:** configure recipient emails in Netlify dashboard → Site settings → Forms → Form notifications
- **Spam:** Netlify's built-in honeypot + Akismet are on
- **On submit:** contact form shows an inline "Thank You" view in place (with Return-to-Home / Explore-Our-Services buttons); newsletter form redirects to `/?newsletter=success`

## Deploy

1. Push to `main` on GitHub
1. Netlify auto-runs `npm run build` (defined in `netlify.toml`)
1. Publishes the `out/` directory to the CDN
1. Build status visible in the Netlify dashboard; failed builds don't replace the live site

Manual deploys, rollbacks, and deploy previews for branches are all in the Netlify **Deploys** tab. Security headers and CSP are configured in `netlify.toml`.

## DNS (Squarespace → Netlify)

The domain `autiostrategies.com` is registered at **Squarespace Domains**, but DNS resolves to Netlify.

- **Where to edit DNS:** Squarespace account → Domains → `autiostrategies.com` → DNS Settings
- **Records pointing to Netlify:**
  - Apex `A` record → Netlify's load balancer IP (`75.2.60.5`)
  - `www` `CNAME` → `<site-name>.netlify.app`
- **SSL:** managed automatically by Netlify (Let's Encrypt). If a cert ever fails to renew, re-verify domain ownership in Netlify → Domain management
- **Email / MX records:** if Chloe uses Squarespace/Google Workspace email on this domain, those MX records live alongside the Netlify A/CNAME — leave them alone unless changing email provider

To verify config: in Netlify dashboard → Domain management, both `autiostrategies.com` and `www.autiostrategies.com` should show as primary/aliased with green checkmarks.

## Known placeholder content

These are stock placeholders left in the data files — kept in case the team wants to populate them later, but flagging so you don't think they're real:

- **Testimonials** (`content.ts` → `testimonials.items`): Alex Johnson / Maria Lee / Sam Patel are stub quotes
- **Policy briefs, case studies, generic resources** (`resources.ts`): `policyBriefs[]`, `caseStudies[]`, and `resources[]` are empty arrays — types are defined so content can be added without code changes
- **Newsletter form**: live and capturing emails to Netlify, but no email send/sequence is wired up — submissions sit in Netlify until exported

## Reference docs in repo

- `docs/resources.md` — recipe for adding articles/policy briefs/case studies to `resources.ts`, including the HTML content format and slug conventions.
