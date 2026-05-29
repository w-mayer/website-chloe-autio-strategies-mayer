'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
    } catch {
      // form still shows success
    }
    setSubmitted(true);
  };

  return (
    <>
      <section className="contact-wrap">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-left">
              <h1>Tell us the goal.<br /><em>We will help you from there.</em></h1>
              <p className="lede">Whether you have a clear ask or you&rsquo;re trying to scope the right one — we&rsquo;re glad to start the conversation.</p>
              <div>
                <div className="contact-info-row">
                  <div className="lbl">Email</div>
                  <div className="val"><a href="mailto:chloe@autiostrategies.com">chloe@autiostrategies.com</a></div>
                </div>
                <div className="contact-info-row">
                  <div className="lbl">Phone</div>
                  <div className="val"><a href="tel:+12024556599">+1 (202) 455-6599</a></div>
                </div>
                <div className="contact-info-row">
                  <div className="lbl">Office</div>
                  <div className="val">600 Massachusetts Ave NW, Suite 250<br />Washington, D.C. 20001</div>
                </div>
                <div className="contact-info-row">
                  <div className="lbl">Follow</div>
                  <div className="val">
                    <a href="https://www.linkedin.com/company/autio-strategies" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <h3>Message sent</h3>
                  <p className="form-sub" style={{ marginTop: '12px' }}>Thank you — we&rsquo;ll be in touch within two business days.</p>
                </div>
              ) : (
                <>
                  <h3>Start a conversation</h3>
                  <div className="form-sub">We typically respond within two business days.</div>
                  <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input id="firstName" type="text" name="firstName" placeholder="Jane" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input id="lastName" type="text" name="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input id="email" type="email" name="email" placeholder="jane@organization.com" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="organization">Organization</label>
                      <input id="organization" type="text" name="organization" placeholder="Your company or agency" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">What can we help with?</label>
                      <select id="service" name="service">
                        <option>Analysis &amp; Intel</option>
                        <option>Policy Strategy</option>
                        <option>Governance &amp; Operations</option>
                        <option>Engagement &amp; Education</option>
                        <option>Multiple layers / not sure yet</option>
                        <option>Press &amp; media</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Tell us a little more</label>
                      <textarea id="message" name="message" placeholder="What are you working on? What's the deadline? What does success look like?" />
                    </div>
                    <button type="submit" className="form-submit">Send message →</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter" id="newsletter">
        <div className="container">
          <div className="newsletter-grid">
            <h3>Stay in the loop on AI policy<br />with our <em>Insights newsletter.</em></h3>
            <form
              className="newsletter-form"
              name="newsletter"
              method="POST"
              data-netlify="true"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <input type="email" name="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
