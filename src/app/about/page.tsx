import Link from 'next/link';
import BioToggle from './BioToggle';

const linkedInPath = "M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z";

export const metadata = {
  title: 'About — Autio Strategies',
  description: 'Built at the intersection of technology and policy. Over a decade of global experience supporting stakeholders across industries.',
};

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

export default function AboutPage() {
  return (
    <>
      <section className="page-hero-wrap">
        <div className="container">
          <div className="breadcrumb">About Us</div>
          <h1>Built at the intersection<br />of <em>technology and policy.</em></h1>
          <p className="lede">Autio Strategies brings over a decade of global experience supporting stakeholders across industries to keep up — and make the most — of AI evolution.</p>
        </div>
      </section>

      <section className="story-block">
        <div className="container-narrow">
          <div className="section-eyebrow">Our story</div>
          <h2>A firm built to <em>translate</em> between two worlds.</h2>
          <p>Autio Strategies was founded by Chloe Autio after more than a decade working at the intersection of AI policy, governance, and product — across major AI labs, enterprise tech firms, and policy organizations on both coasts. The firm carries forward the work she started at her previous practice, Tehda, with a sharper focus and a broader team.</p>

          <p style={{ marginTop: '24px' }}>Today, Autio Strategies serves clients ranging from emerging labs entering the policy conversation for the first time, to Fortune 50s navigating multi-jurisdictional obligations, to government agencies implementing the President&rsquo;s AI Action Plan.</p>
        </div>
      </section>

      <section className="block" id="our-team">
        <div className="container">
          <div className="block-head-centered">
            <div className="section-eyebrow">Our Team</div>
          </div>
          <div className="team-grid">
            <div className="team-card" id="chloe">
              <div className="team-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot/optimized/autio_headshot-large.jpg" alt="Chloe Autio" />
              </div>
              <h4>Chloe Autio</h4>
              <div className="role">
                <span>Founder &amp; CEO</span>
                <a className="role-li" href="https://www.linkedin.com/in/chloeautio/" target="_blank" rel="noopener noreferrer" aria-label="Chloe Autio on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d={linkedInPath} />
                  </svg>
                </a>
              </div>
              <BioToggle id="chloe">Chloe Autio is a technology policy expert with nearly a decade of experience advising organizations on AI policy and governance. Through her practice Autio Strategies, she provides strategic guidance to clients including government bodies, Fortune 50 companies, large AI labs and startups, and leading trade associations. Chloe&rsquo;s consultancy is built on a solid foundation, including her pivotal role in shaping Intel Corps emerging technology policy portfolio and developing their Responsible AI program from its beginning. Chloe is an Adjunct AI Policy Advisor at the Institute for Security and Technology, a Faculty Lecturer at the Future of Privacy Forum, and previously chaired the board of Humane Intelligence. Her insights are frequently sought after by both government and civil society organizations, and her expertise has been highlighted in prominent media outlets such as the Wall Street Journal, Axios, POLITICO, and Bloomberg, among others. She holds an economics degree from UC Berkeley, where she studied a range of topics related to technology policy, data ethics, and the social implications of computing.</BioToggle>
            </div>
            <div className="team-card" id="sam">
              <div className="team-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot/optimized/wells_headshot-large.webp" alt="Samuel Wells" />
              </div>
              <h4>Samuel Wells</h4>
              <div className="role">
                <span>Policy &amp; Engagement Manager</span>
                <a className="role-li" href="https://www.linkedin.com/in/samuel-wells-b5034420a/" target="_blank" rel="noopener noreferrer" aria-label="Samuel Wells on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d={linkedInPath} />
                  </svg>
                </a>
              </div>
              <BioToggle id="sam">Samuel Wells holds a wealth of policy and engagement experience at the intersection of science, technology, and government. He manages much of the firm&rsquo;s client engagements and leads on events and public engagement. Before joining Autio Strategies, he served in the White House on Vice President Kamala Harris&rsquo; team. Prior to that, Sam held a range of research and policy roles, including as a research assistant at the University of Chicago&rsquo;s Health Lab, where he contributed to the Transform911 initiative aimed at modernizing the nation&rsquo;s emergency response system. He has worked for multiple members of Congress, the Office of the Science and Technology Adviser to the Secretary of State, and the Director of National Intelligence&rsquo;s Private Sector Group. Sam holds a BA in Public Policy &amp; Leadership from the University of Virginia.</BioToggle>
            </div>
            <div className="team-card" id="chaerin">
              <div className="team-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot/optimized/lim_headshot-large.webp" alt="Chaerin Lim" style={{ objectPosition: 'center top' }} />
              </div>
              <h4>Chaerin Lim</h4>
              <div className="role">
                <span>AI Policy Manager</span>
                <a className="role-li" href="https://www.linkedin.com/in/chaerin-lim/" target="_blank" rel="noopener noreferrer" aria-label="Chaerin Lim on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d={linkedInPath} />
                  </svg>
                </a>
              </div>
              <BioToggle id="chaerin">Chaerin Lim brings deep expertise in AI governance and technology policy across three continents. She manages client relationships on behalf of the firm and provides overall substantive analysis to inform strategy and decisionmaking. Her career has focused on bridging technical depth and policy to translate complex AI concepts into actionable guidance for senior stakeholders in governments, international organizations, and industry. Prior to joining Autio Strategies, Chaerin served as an AI Policy Consultant at the OECD, where she authored sector-specific AI policy reports examining how governments and industry can responsibly deploy AI across critical domains. At Kakao, she developed South Korea&rsquo;s first corporate guidelines for responsible AI and advised senior leadership on emerging sociotechnical risks and global AI governance frameworks. Her earlier work at the World Bank, Tremau, and Humane Intelligence spans AI safety, online safety, and technology policy for development, giving her a uniquely global perspective on the challenges facing the AI ecosystem today. Chaerin holds an MPP from the Harvard Kennedy School and a BS in Computer Science with a secondary major in Literature and Creative Writing from New York University Abu Dhabi.</BioToggle>
            </div>
          </div>
        </div>
      </section>

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

      <section className="cta-strip">
        <div className="container">
          <h2>Want to know more about<br /><em>how we work?</em></h2>
          <Link className="btn-primary" href="/contact">Get in touch →</Link>
        </div>
      </section>
    </>
  );
}
