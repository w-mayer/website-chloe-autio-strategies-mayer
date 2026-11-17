import Link from 'next/link';

// Order follows the design board. Files live in /public/images/partner_logos/optimized/.
// Per-logo display heights are keyed on `alt` in globals.css (.logo-tile img[data-logo="…"]).
const partnerLogos = [
  { src: '/images/partner_logos/optimized/Cohere-Logo.webp', alt: 'Cohere' },
  { src: '/images/partner_logos/optimized/CDAO-Logo.webp', alt: 'CDAO, Chief Digital and Artificial Intelligence Office' },
  { src: '/images/partner_logos/optimized/Google_Cloud_Platform-Logo.webp', alt: 'Google Cloud' },
  { src: '/images/partner_logos/optimized/Google_DeepMind_logo.webp', alt: 'Google DeepMind' },
  { src: '/images/partner_logos/optimized/Meta-Logo.webp', alt: 'Meta' },
  { src: '/images/partner_logos/optimized/OCED.webp', alt: 'OECD' },
  { src: '/images/partner_logos/optimized/Uber_logo_2018.webp', alt: 'Uber' },
  { src: '/images/partner_logos/optimized/f_nist-logo-brand-black.webp', alt: 'NIST' },
  { src: '/images/partner_logos/optimized/ITI-Logo.webp', alt: 'ITI' },
  { src: '/images/partner_logos/optimized/OpenAI-Mark.webp', alt: 'OpenAI' },
  { src: '/images/partner_logos/optimized/Hupside-Logo.webp', alt: 'Hupside' },
];

const areas = [
  {
    id: 'knowledge',
    tone: 'tone-1',
    tag: 'Knowledge',
    title: 'Analysis & Intel',
    sub: 'Producing the intelligence and substantive positions your strategy depends on.',
    body: 'Policy development, research, regulatory monitoring, and tailored intelligence drafted to inform your decisions.',
  },
  {
    id: 'strategy',
    tone: 'tone-2',
    tag: 'Strategy',
    title: 'Strategy & Positioning',
    sub: 'Deciding where to engage, how to sequence it, and where your voice actually lands.',
    body: 'Overall strategy for positioning, engagement and stakeholder mapping, across government and more.',
  },
  {
    id: 'governance',
    tone: 'tone-3',
    tag: 'Governance',
    title: 'Governance & Operations',
    sub: 'Building the internal machinery and managing the external partners that let good decisions scale.',
    body: 'Responsible AI / AI governance strategy, vendor vetting and recommendation, and third party management.',
  },
  {
    id: 'engagement',
    tone: 'tone-4',
    tag: 'Engagement',
    title: 'Engagement & Education',
    sub: 'Bringing people together, briefing leaders, and building AI fluency where it matters.',
    body: 'Events, presentations & briefings, AI 101 for boards and teams, and one-on-one coaching for execs and small businesses for how to make the most of AI tools.',
  },
];

const valueCards = [
  {
    title: 'Specialists who translate',
    body: 'AI policy and governance is all we do. We’ve built enterprise Responsible AI programs, contributed to national AI standards frameworks, and advise Fortune 50s, startups, and government agencies. Deep in AI and fluent in every room, we translate across engineers, lawyers, executives, boards, regulators, and intergovernmental bodies.',
  },
  {
    title: 'Institutional knowledge and networks',
    body: 'We know the people, the processes, and the history behind how AI policy actually moves. Through years spent working in San Francisco and Washington, and with partners around the world, we’ve built relationships across the technology and policy communities that matter.',
  },
  {
    title: 'Bespoke by design',
    body: 'Every engagement, event, and briefing is designed for your audience. We curate our work to your goals, so your time and resources go further.',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero-wrap">
        <div className="hero-deco" aria-hidden="true" />
        <div className="container">
          <h1>Navigate AI&rsquo;s evolution<br />with <em>confidence.</em></h1>
          <p className="hero-sub">
            Autio Strategies brings a decade of global experience helping startups, enterprises, governments, and nonprofits keep up with — and make the most of — how AI is reshaping their industries, their institutions, and the rules they operate under.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" href="/contact">Start a conversation →</Link>
            <Link className="btn-secondary" href="/services">See how we work</Link>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="trusted-section after-hero">
        <div className="trusted-label">— Trusted by leading organizations shaping AI policy —</div>
        <div className="marquee">
          <div className="marquee-track">
            {/* The list is rendered twice so the scroll loops seamlessly; the copy is hidden from screen readers. */}
            {[...partnerLogos, ...partnerLogos].map((logo, i) => (
              <div className="logo-tile" key={i} aria-hidden={i >= partnerLogos.length || undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={i < partnerLogos.length ? logo.alt : ''} data-logo={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUR AREAS */}
      <section className="block">
        <div className="container">
          <div className="block-head-centered">
            <div className="section-eyebrow">What we do</div>
            <h2>Four areas of work.<br />One <em>integrated practice.</em></h2>
          </div>

          <div className="layers-grid">
            {areas.map(area => (
              <Link href={`/services#${area.id}`} key={area.id}>
                <div className={`layer-card ${area.tone}`}>
                  <div className="layer-tag">— {area.tag}</div>
                  <h3>{area.title}</h3>
                  <div className="layer-sub">{area.sub}</div>
                  <p>{area.body}</p>
                  <span className="more">Explore {area.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE ADD */}
      <section className="value-add-section">
        <div className="value-add-head">
          <div className="section-eyebrow">Our value add</div>
          <h2><em>Substantive</em>, not surface.<br /><em>Curated</em>, not mass-produced.</h2>
        </div>
        <div className="container-wide">
          <div className="value-add-grid">
            {valueCards.map((card, i) => (
              <div className="value-card" key={card.title}>
                <div className="num">— {String(i + 1).padStart(2, '0')}</div>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-simple">
        <div className="container">
          <Link className="btn-primary" href="/contact">Get in touch →</Link>
        </div>
      </section>
    </>
  );
}
