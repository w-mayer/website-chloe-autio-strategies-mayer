import Link from 'next/link';
import ServicesAccordion from './ServicesAccordion';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Services | Autio Strategies',
  'Analysis, strategy, governance, and engagement for organizations navigating AI policy and regulation.',
  '/services',
);

export default function ServicesPage() {
  return (
    <div className="page-services">
      {/* PAGE HERO */}
      <section className="page-hero-wrap">
        <div className="container">
          <h1>Navigate AI policy<br />with <em>clarity and conviction.</em></h1>
          <p className="lede">We shape substantive positions and sharpen strategy. We build the structures that let good decisions about AI scale, and we bring the right people together and up to speed.</p>
        </div>
      </section>

      {/* ACCORDION */}
      <section className="block">
        <div className="container">
          <ServicesAccordion />
        </div>
      </section>

      {/* CLOSING */}
      <section className="closing">
        <div className="container">
          <h2>Every organization&rsquo;s AI posture is different.<br />So is <em>our advice.</em></h2>
          <div style={{ marginTop: '32px' }}>
            <Link className="btn-primary" href="/contact">Start a conversation →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
