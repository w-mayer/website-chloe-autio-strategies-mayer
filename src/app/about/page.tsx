import Link from 'next/link';
import TeamCard from './TeamCard';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'About | Autio Strategies',
  'AI policy and governance specialists with experience inside global tech companies, the White House, and political campaigns.',
  '/about',
);

const team = [
  {
    id: 'chloe',
    name: 'Chloe Autio',
    role: 'Founder & CEO',
    photo: '/images/headshot/optimized/autio_headshot-large.jpg',
    linkedin: 'https://www.linkedin.com/in/chloeautio/',
    summary: 'Chloe advises government bodies, Fortune 50 companies, AI labs, startups, and trade associations on AI policy and governance. She led Intel’s emerging technology policy portfolio and built its Responsible AI program from the ground up. Her insights are regularly featured in the Wall Street Journal, Axios, POLITICO, and Bloomberg.',
    bio: [
      'Chloe Autio is a technology policy expert with a decade of experience advising organizations on AI policy and governance. Through Autio Strategies, she provides strategic guidance to government bodies, Fortune 50 companies, large AI labs and startups, and leading trade associations, helping them develop clear policy positions, strengthen engagement and internal strategies, and anticipate regulatory implications.',
      'Her practice is built on a foundation in the tech industry, including her role shaping Intel’s emerging technology policy portfolio and building its Responsible AI program from the beginning. Her approach draws on a deep understanding of product development, compliance, communications, and social responsibility, paired with a broad network across Washington and beyond.',
      'Chloe previously chaired the board of Humane Intelligence. Her expertise has been featured in the Wall Street Journal, Axios, POLITICO, and Bloomberg, among others. She holds an economics degree from UC Berkeley, where she studied technology policy, data ethics, and the social implications of computing.',
    ],
  },
  {
    id: 'sam',
    name: 'Samuel Wells',
    role: 'US Policy Lead',
    photo: '/images/headshot/optimized/wells_headshot-large.webp',
    linkedin: 'https://www.linkedin.com/in/samuel-wells-b5034420a/',
    summary: 'Sam leads client engagement, advising companies on regulatory strategy and policy trends, and manages the firm’s workshops with U.S. government stakeholders. He previously served on Vice President Kamala Harris’ team at the White House.',
    bio: [
      'Sam leads client engagement, advising companies on regulatory strategy and policy trends, and manages the firm’s workshops with U.S. government stakeholders. Before Autio Strategies, he served on Vice President Kamala Harris’ team at the White House, and interned with the Director of National Intelligence’s Private Sector Group, the Office of the Science and Technology Adviser to the Secretary of State, and Democratic members of Congress.',
      'Earlier in his career, he worked as a research assistant at the University of Chicago Harris School of Public Policy on the Transform911 initiative to modernize the nation’s emergency response system. Sam holds a BA in Public Policy and Leadership from the University of Virginia.',
    ],
  },
  {
    id: 'chaerin',
    name: 'Chaerin Lim',
    role: 'AI Policy Manager',
    photo: '/images/headshot/optimized/lim_headshot-large.webp',
    photoPosition: 'center top',
    linkedin: 'https://www.linkedin.com/in/chaerin-lim/',
    summary: 'Chaerin manages client relationships and provides substantive analysis across policy and technical governance to inform strategy. She previously served on the public policy team at Kakao, where she developed South Korea’s first corporate guidelines for responsible AI.',
    bio: [
      'Chaerin Lim manages client relationships on behalf of the firm, providing substantive analysis across policy and technical governance to inform strategy and decisionmaking. She brings deep expertise in AI governance and technology policy across three continents. Prior to joining Autio Strategies, Chaerin served on the public policy team of Kakao, South Korea’s dominant digital communications and financial services app, where she developed South Korea’s first corporate guidelines for responsible AI.',
      'Her earlier work at the OECD AI unit, World Bank, Tremau, and Humane Intelligence spans AI safety, online safety, and international development, giving her a uniquely global perspective on the challenges facing the AI ecosystem today. Chaerin holds an MPP from the Harvard Kennedy School and a BS in Computer Science with a secondary major in Literature and Creative Writing from New York University Abu Dhabi.',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="page-about">
      <section className="page-hero-wrap">
        <div className="container">
          <h1>Built at the intersection<br />of <em>technology and policy.</em></h1>
          <p className="lede">Our team has worked inside global tech companies, from established public policy shops to compliance, product, and trust &amp; safety teams, and across government and politics, from the White House to political campaigns. We bring that range to every engagement.</p>
        </div>
      </section>

      <section className="story-block">
        <div className="container">
          <div className="story-inner">
            <div className="section-eyebrow">Our story</div>
            <h2>A firm built to <em>translate.</em></h2>
            <p>Autio Strategies was founded by Chloe Autio after a decade at the intersection of AI policy, governance, and product. She was a key architect of Intel&rsquo;s Responsible AI program, where she co-authored the first industry AI policy white paper in 2017. She contributed to the NIST AI Risk Management Framework and has advised governments at every level on AI policy. That experience is the foundation of how the firm works.</p>
          </div>
        </div>
      </section>

      <section className="block" id="our-team">
        <div className="container">
          <div className="block-head-centered">
            <div className="section-eyebrow">Our Team</div>
          </div>
          <div className="team-grid">
            {team.map(member => <TeamCard key={member.id} {...member} />)}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container">
          <h2>Want to know more about<br /><em>how we work?</em></h2>
          <Link className="btn-primary" href="/contact">Get in touch →</Link>
        </div>
      </section>
    </div>
  );
}
