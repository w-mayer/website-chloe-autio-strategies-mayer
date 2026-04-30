# Autio Strategies website

Marketing site for Autio Strategies (AI policy consulting). Next.js (App Router, static export) + TypeScript + Tailwind, deployed on Netlify.

**New here? Read [HANDOFF.md](HANDOFF.md)** — covers stack, architecture, where to edit each piece of content, forms, deploys, and DNS.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out (what Netlify publishes)
```

Requires Node 18+.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (static export to `out/`) |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run type-check` | TypeScript |
| `npm run format` / `format:check` | Prettier |
| `npm run optimize-images` | Convert new images in `public/images/` to WebP + responsive sizes |
| `npm run optimize-headshots` | Same, headshots only |
| `npm run analyze-images` | Report on image-pipeline coverage |
| `npm run test-forms` | Sanity-check Netlify form configuration |

## Docs

- **[HANDOFF.md](HANDOFF.md)** — maintainer onboarding
- **[docs/resources.md](docs/resources.md)** — recipe for adding articles/policy briefs/case studies

## License

Proprietary to Autio Strategies. See [LICENSE](LICENSE).
