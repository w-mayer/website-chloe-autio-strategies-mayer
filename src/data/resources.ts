/**
 * Insights / resources content.
 *
 * Powers the /insights index page and each /insights/[slug] detail page.
 * Four content types are defined; today only `articles` is populated and the
 * other three are intentionally empty arrays so the team can drop content in
 * later without code changes.
 *
 * Exports:
 *   - authors         Reusable author/source bios. `articles[].author` references
 *                     entries here by index (e.g., authors[1] = WSJ).
 *   - articles        News-style insights. Items with `featured: true` surface
 *                     on the homepage / featured sections. `externalUrl`, when
 *                     present, makes the card link out instead of rendering a
 *                     local detail page (used for syndicated WSJ/POLITICO/Fortune
 *                     coverage).
 *   - policyBriefs    PLACEHOLDER — empty; type defined so briefs can be added
 *                     without code changes. Each brief also needs a matching
 *                     `resources.{slug}` entry in `metadata.ts`.
 *   - caseStudies     PLACEHOLDER — empty; same pattern as policyBriefs.
 *   - resources       PLACEHOLDER — empty; generic external links (reports,
 *                     toolkits, datasets, guidelines) for the resources library.
 *
 * To add a new article:
 *   1. Append to `articles` with a unique kebab-case `slug`.
 *   2. Add a `resources.{slug}` entry in `src/data/metadata.ts` for SEO.
 *   3. Use ISO `YYYY-MM-DD` for `date` (sorting + display rely on it).
 */
export interface Author {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: Author;
  tags: string[];
  featured?: boolean;
  related: string[]; // slugs of related articles
  externalUrl?: string; // Optional external link for news articles
}

export interface PolicyBrief {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: Author;
  tags: string[];
  externalUrl?: string; // Optional external link
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  organization: string;
  author: Author;
  tags: string[];
  externalUrl?: string; // Optional external link
}

export interface Resource {
  slug: string;
  title: string;
  url: string;
  description: string;
  type: 'report' | 'toolkit' | 'dataset' | 'guideline';
}

export const authors: Author[] = [
  {
    name: 'Chloe Autio',
    title: 'Founder, Autio Strategies',
    bio: 'Chloe Autio is a leading expert in AI policy, governance, and technology strategy, advising government and enterprise clients on responsible innovation.',
    avatarUrl: '/images/headshot/optimized/autio_headshot.webp',
  },
  {
    name: 'Wall Street Journal',
    title: 'Leading Financial News Publication',
    bio: 'The Wall Street Journal is a leading financial news publication covering business, politics, and technology.',
    avatarUrl: '/images/logo/optimized/AutioStrategies_Logo_FullColor_JustMark.webp',
  },
  {
    name: 'POLITICO',
    title: 'Political News and Analysis',
    bio: 'POLITICO is a leading political news organization covering policy, politics, and technology.',
    avatarUrl: '/images/logo/optimized/AutioStrategies_Logo_FullColor_JustMark.webp',
  },
  {
    name: 'Fortune',
    title: 'Business and Technology Magazine',
    bio: 'Fortune is a leading business magazine covering technology, innovation, and corporate leadership.',
    avatarUrl: '/images/logo/optimized/AutioStrategies_Logo_FullColor_JustMark.webp',
  },
];

export const articles: Article[] = [
  {
    slug: 'wsj-trump-ai-kratsios-thiel',
    title: 'Trump Taps Michael Kratsios, Peter Thiel Protégé, for AI Policy Role',
    summary: 'Wall Street Journal coverage of Trump\'s appointment of Michael Kratsios to lead AI policy, with insights on Peter Thiel\'s influence.',
    content: '<p>Read the full article at the Wall Street Journal.</p>',
    date: '2025-03-30',
    author: authors[1],
    tags: ['AI Policy', 'Trump', 'Kratsios', 'WSJ'],
    featured: true,
    related: [],
    externalUrl: 'https://www.wsj.com/politics/policy/trump-ai-michael-kratsios-peter-thiel-protege-1457e276?gaa_at=eafs&gaa_n=ASWzDAgOWM6oChXjBrH5loUci3BtDKlAtOMWZ_YEBBgsXVFQazOdR-9aTvaVUeUW3Eg%3D&gaa_ts=685b774e&gaa_sig=A-FqfocXwtTkC3KwHT6XWeaWKSgptOmyDfpKOp-DarBkOWJr8mYjLw2N1kieFSCXdJMljAH1PgP0qywsQpMGzQ%3D%3D',
  },
  {
    slug: 'politico-paris-ai-summit',
    title: 'Paris AI Summit: Vance, Musk, Macron, DeepSeek',
    summary: 'POLITICO\'s Digital Future Daily newsletter recaps the Paris AI Summit, featuring Vance, Musk, Macron, and DeepSeek.',
    content: '<p>Read the full article at POLITICO.</p>',
    date: '2025-02-11',
    author: authors[2],
    tags: ['AI Summit', 'Paris', 'POLITICO', 'Musk', 'Macron'],
    featured: true,
    related: [],
    externalUrl: 'https://www.politico.com/newsletters/digital-future-daily/2025/02/11/paris-ai-summit-vance-musk-macron-deepseek-00203604',
  },
  {
    slug: 'fortune-trump-ai-crypto-czar-sacks',
    title: 'Trump AI and Crypto "Czar" Role for David Sacks Scaled Back',
    summary: 'Fortune reports on the evolving role of David Sacks as Trump\'s AI and crypto advisor, and the tech industry\'s response.',
    content: '<p>Read the full article at Fortune.</p>',
    date: '2024-12-20',
    author: authors[3],
    tags: ['AI Policy', 'Crypto', 'Trump', 'Sacks', 'Fortune'],
    featured: true,
    related: [],
    externalUrl: 'https://fortune.com/2024/12/20/trump-ai-crypto-czar-role-limited-david-sacks-silicon-valley-commitments/',
  },
  {
    slug: 'wsj-election-wargames-tech-politics',
    title: 'Election Wargames: Tech and Politics Try Their Hands at Detecting Voting Threats',
    summary: 'Wall Street Journal explores how tech and political leaders are preparing for election security threats in 2024.',
    content: '<p>Read the full article at the Wall Street Journal.</p>',
    date: '2024-11-04',
    author: authors[1],
    tags: ['Election Security', 'Tech Policy', 'WSJ'],
    featured: true,
    related: [],
    externalUrl: 'https://www.wsj.com/articles/election-wargames-tech-and-politics-try-their-hands-at-detecting-voting-threats-70ba3331?gaa_at=eafs&gaa_n=ASWzDAgUfo9m81vO9Xz5fOjBfA0WrYxhD3QKMEy761v2zQjbeWyJV8O2i5EX47Vji4Q%3D&gaa_ts=6855ca2f&gaa_sig=dRPSE8ravwIF-nB426iz1uy5sj-8e_94QpOEh3xH6sERAin1QDT8f0339LBFPYGVIjYYxIYfkJINh-QKIALklw%3D%3D',
  },
];

export const policyBriefs: PolicyBrief[] = [];

export const caseStudies: CaseStudy[] = [];

export const resources: Resource[] = []; 