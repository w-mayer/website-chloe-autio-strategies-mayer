import Link from 'next/link';
import ServicesAccordion from './ServicesAccordion';

export const metadata = {
  title: 'Services — Autio Strategies',
  description: 'AI policy and governance services: analysis & intel, policy strategy, governance & operations, and engagement & education.',
};

export default function ServicesPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero-wrap">
        <div className="container">
          <div className="breadcrumb">Our Services</div>
          <h1>We partner with organizations<br />to navigate AI policy<br />with <em>clarity and conviction.</em></h1>
          <p className="lede">Shaping substantive positions. Sharpening strategy. Building the internal structures and external relationships that let good decisions about AI scale.</p>
        </div>
      </section>

      {/* ACCORDION */}
      <section className="block">
        <div className="container-wide">
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
    </>
  );
}