import Link from 'next/link';

const linkedInPath = "M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z";

const partnerLogos = [
  { src: '/images/partner_logos/optimized/Cohere-Logo.webp', alt: 'Cohere' },
  { src: '/images/partner_logos/optimized/DoD-Logo-Stacked.webp', alt: 'Department of Defense' },
  { src: '/images/partner_logos/optimized/Google_Cloud_Platform-Logo.webp', alt: 'Google Cloud' },
  { src: '/images/partner_logos/optimized/Google_DeepMind_logo.webp', alt: 'Google DeepMind' },
  { src: '/images/partner_logos/optimized/Meta-Logo.webp', alt: 'Meta' },
  { src: '/images/partner_logos/optimized/OCED.webp', alt: 'OECD' },
  { src: '/images/partner_logos/optimized/Uber_logo_2018.webp', alt: 'Uber' },
  { src: '/images/partner_logos/optimized/f_nist-logo-brand-black.webp', alt: 'NIST' },
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
            A decade of global experience helping startups, enterprises, governments, and nonprofits keep up with — and make the most of — how AI is reshaping their work.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" href="/contact">Start a conversation →</Link>
            <Link className="btn-secondary" href="/services">See how we work</Link>
          </div>
        </div>
      </section>

      {/* TRUSTED BY (moved up — directly after hero) */}
      <section className="trusted-section">
        <div className="trusted-label">— Trusted by leading organizations shaping AI policy —</div>
        <div className="marquee">
          <div className="marquee-track">
            {[...partnerLogos, ...partnerLogos].map((logo, i) => (
              <div className="logo-tile" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUR LAYERS */}
      <section className="block">
        <div className="container">
          <div className="block-head-centered">
            <div className="section-eyebrow">What we do</div>
            <h2>Four layers of work.<br />One <em>integrated practice.</em></h2>
            <p className="lede">From producing the intelligence your strategy depends on, to influencing rooms where AI policy gets made, we meet you where the work actually happens.</p>
          </div>

          <div className="layers-grid">
            <Link href="/services#knowledge" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="layer-card tone-1">
                <h3>Analysis &amp; Intel</h3>
                <div className="layer-sub">Producing the intelligence and substantive positions your strategy depends on.</div>
                <p>Policy development, research, regulatory monitoring, and tailored intelligence drafted to inform your decisions.</p>
                <span className="more">Explore the knowledge layer</span>
              </div>
            </Link>
            <Link href="/services#strategy" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="layer-card tone-2">
                <h3>Policy Strategy</h3>
                <div className="layer-sub">Deciding where to engage, how to sequence it, and where your voice actually lands.</div>
                <p>Overall strategy for positioning, engagement and stakeholder mapping, across government and more.</p>
                <span className="more">Explore the strategy layer</span>
              </div>
            </Link>
            <Link href="/services#governance" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="layer-card tone-3">
                <h3>Governance &amp; Operations</h3>
                <div className="layer-sub">Building the internal machinery and managing the external partners that let good decisions scale.</div>
                <p>Responsible AI / AI governance strategy, vendor vetting and recommendation, and third party management.</p>
                <span className="more">Explore the governance layer</span>
              </div>
            </Link>
            <Link href="/services#engagement" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="layer-card tone-4">
                <h3>Engagement &amp; Education</h3>
                <div className="layer-sub">Bringing people together, briefing leaders, and building AI fluency where it matters.</div>
                <p>Events, presentations &amp; briefings, AI 101 for boards and teams, and one-on-one coaching for execs and small businesses for how to make the most of AI tools.</p>
                <span className="more">Explore the engagement layer</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE ADD */}
      <section className="value-add-section">
        <div className="value-add-head">
          <div className="section-eyebrow">Our value add</div>
          <h2>Substantive, not surface.<br /><em>Curated, not mass-produced.</em></h2>
          <p className="sub">What you get when you work with us.</p>
        </div>
        <div className="container-wide">
          <div className="value-add-grid">
            <div className="value-card">
              <h4>Specialized expertise</h4>
              <p>AI policy and governance is what we do - across labs, enterprises, governments, and intergovernmental bodies. A proven track record advising Fortune 50s, startups, and government agencies on regulatory trends, responsible AI, and the capabilities of emerging tech.</p>
            </div>
            <div className="value-card">
              <h4>From SF to DC, and beyond</h4>
              <p>A broad and deep network across the technology and policy communities that matter - in the US and globally. We&rsquo;ve spent years cultivating the institutional knowledge and networks that move AI policy forward.</p>
            </div>
            <div className="value-card">
              <h4>Substantive, not surface</h4>
              <p>Our advice is informed by hands-on experience with product, governance, compliance, procurement, and communications - not just policy theory.</p>
            </div>
            <div className="value-card">
              <h4>Curated, not mass-produced</h4>
              <p>Every event, briefing, and engagement is designed for your goals, your audience, and the outcome you envisioned.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM MOSAIC */}
      <section className="team-mosaic-section">
        <div className="block-head-centered">
          <div className="section-eyebrow">Our Team</div>
        </div>
        <div className="container">

          {/* Row 1: Chloe + intro card */}
          <div className="team-mosaic">
            <div className="profile-card">
              <Link href="/about#chloe" className="profile-card-link" aria-label="Read Chloe Autio's bio" />
              <div className="profile-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot/optimized/autio_headshot-medium.jpg" alt="Chloe Autio" />
              </div>
              <h4>Chloe Autio</h4>
              <div className="role">Founder &amp; CEO</div>
              <a className="linkedin-link" href="https://www.linkedin.com/in/chloeautio/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d={linkedInPath} />
                </svg>
              </a>
            </div>

            <div className="quote-card">
              <div className="intro">We work alongside leading organizations to shape AI policy where it matters most - from labs to legislatures.</div>
            </div>
          </div>

          {/* Row 2: image | Samuel | Chaerin */}
          <div className="team-mosaic-row2">
            <div
              className="image-block"
              style={{ backgroundImage: "url('/images/stocks/optimized/events-facilitation-large.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            />

            <div className="profile-card">
              <Link href="/about#sam" className="profile-card-link" aria-label="Read Samuel Wells's bio" />
              <div className="profile-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot/optimized/wells_headshot-medium.webp" alt="Samuel Wells" />
              </div>
              <h4>Samuel Wells</h4>
              <div className="role">Policy &amp; Engagement Manager</div>
              <a className="linkedin-link" href="https://www.linkedin.com/in/samuel-wells-b5034420a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d={linkedInPath} />
                </svg>
              </a>
            </div>

            <div className="profile-card">
              <Link href="/about#chaerin" className="profile-card-link" aria-label="Read Chaerin Lim's bio" />
              <div className="profile-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot/optimized/lim_headshot-medium.webp" alt="Chaerin Lim" style={{ objectPosition: 'center 15%' }} />
              </div>
              <h4>Chaerin Lim</h4>
              <div className="role">AI Policy Manager</div>
              <a className="linkedin-link" href="https://www.linkedin.com/in/chaerin-lim/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d={linkedInPath} />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
