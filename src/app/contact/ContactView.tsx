'use client';

import { useState } from 'react';

export default function ContactView() {
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
              <h1>Start with the goal.<br /><em>We&rsquo;ll take it from there.</em></h1>
              <p className="lede">Whether you have a clear idea or you&rsquo;re trying to scope the right one, we&rsquo;re glad to start the conversation.</p>
              <div>
                <div className="contact-info-row">
                  <div className="lbl">Email</div>
                  <div className="val"><a href="mailto:info@autiostrategies.com">info@autiostrategies.com</a></div>
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
                        <input id="firstName" type="text" name="firstName" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input id="lastName" type="text" name="lastName" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input id="email" type="email" name="email" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="organization">Organization</label>
                      <input id="organization" type="text" name="organization" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">What can we help with? (optional)</label>
                      <select id="service" name="service" defaultValue="">
                        <option value="">Select an area</option>
                        <option>Analysis &amp; Intel</option>
                        <option>Strategy &amp; Positioning</option>
                        <option>Governance &amp; Operations</option>
                        <option>Engagement &amp; Education</option>
                        <option>Multiple areas / not sure yet</option>
                        <option>Press &amp; media</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Tell us a little more</label>
                      <textarea id="message" name="message" />
                    </div>
                    <button type="submit" className="form-submit">Send message →</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
