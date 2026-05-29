import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="footer-logo"
              src="/images/logo/optimized/AutioStrategies_Logo_AllWhite_Horz.webp"
              alt="Autio Strategies"
            />
            <div className="footer-blurb">Helping organizations navigate AI&rsquo;s evolution with confidence.</div>
          </div>
          <div>
            <h5>Company</h5>
            <Link href="/services">Services</Link>
            <Link href="/about">About Us</Link>
            <Link href="/about#our-team">Team</Link>
          </div>
          <div>
            <h5>Connect</h5>
            <Link href="/contact">Contact</Link>
            <a href="https://www.linkedin.com/company/autio-strategies" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; 2026 Autio Strategies. All rights reserved.</div>
          <div>600 Massachusetts Ave NW, Suite 250 &middot; Washington, D.C. 20001</div>
        </div>
      </div>
    </footer>
  );
}
