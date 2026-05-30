'use client';

import { useState, useEffect } from 'react';

const services = [
  {
    id: 'knowledge',
    tone: 'tone-knowledge',
    title: 'Analysis & Intel',
    tag: '— Knowledge layer',
    summary: 'Producing the intelligence and substantive positions your strategy depends on.',
    offerings: [
      {
        title: 'Policy Development',
        body: 'We draft and refine public policy positions, develop comment responses and RFI submissions, prepare testimony, briefs, and government correspondence, and identify opportunities to elevate your messaging through thought leadership.',
      },
      {
        title: 'Research & Analysis',
        body: 'We evaluate policy proposals and emerging trends, monitor and provide updates on the regulatory landscape in real time, brief you on sectoral agencies and key players, and produce in-depth research like white papers, memos, or quick bullets.',
      },
    ],
  },
  {
    id: 'strategy',
    tone: 'tone-strategy',
    title: 'Policy Strategy',
    tag: '— Strategy layer',
    summary: 'Deciding where to engage, how to sequence it, and where your voice actually lands.',
    offerings: [
      {
        title: 'Strategy Alignment & Prioritization',
        body: 'We set overall strategy for positioning and engagement, sequence the work, concentrate time and resources on the highest-impact initiatives, map the stakeholders shaping the debate, and pick the events and venues where your presence matters.',
      },
      {
        title: 'Government Strategy & Public Affairs Coordination',
        body: 'We track how policymakers, regulators, and intergovernmental bodies are thinking, and coordinate your approach across agencies, legislatures, and external partners — including trade associations, government affairs firms, and lobbying partners.',
      },
    ],
  },
  {
    id: 'governance',
    tone: 'tone-governance',
    title: 'Governance & Operations',
    tag: '— Governance layer',
    summary: 'Building the internal machinery and managing the external partners that enable good decisions to scale.',
    offerings: [
      {
        title: 'Internal Governance',
        body: 'Drawing on direct experience standing up enterprise Responsible AI programs, we design governance bodies, use policies, escalation paths, and internal review processes that operationalize responsible AI inside your org chart.',
      },
      {
        title: 'Third Party Management',
        body: 'We identify and manage think tanks, convening organizations, grant recipients, and civil society initiatives, coordinate with government affairs partners, support media relations, and conduct vendor analysis of AI solutions and third-party governance tools.',
      },
    ],
  },
  {
    id: 'engagement',
    tone: 'tone-engagement',
    title: 'Engagement & Education',
    tag: '— Engagement layer',
    summary: 'Bringing people together, briefing leaders, and building AI fluency where it matters.',
    offerings: [
      {
        title: 'Event Planning & Facilitation',
        body: 'Custom events, from large gatherings to intimate salon dinners, plus expertly moderated workshops, roundtables, and stakeholder feedback sessions. End-to-end design including programming, speakers, invitee curation, follow-up.',
      },
      {
        title: 'Presentations & Briefings',
        body: 'Tailored presentations for a range of audiences, background and briefing documents that ready executives for visits with policymakers, and custom programming — including speaker selection — for specific events or briefings.',
      },
      {
        title: 'AI 101',
        body: 'We bring teams, leaders, and boards up to speed on how AI actually works, what\'s changing in policy and regulation, and what it means for their decisions. Every session is curated to its audience.',
      },
      {
        title: 'Coaching',
        body: 'We coach executives, boards, and policy teams to build AI fluency and confidence. We prepare leaders for high-stakes engagements, helping boards ask sharper questions, and supporting policy teams stepping into new domains.',
      },
    ],
  },
];

export default function ServicesAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  // Open the matching service if URL hash matches a service id (e.g., /services#knowledge).
  // Also re-checks on hashchange so users can navigate between services without a reload.
  useEffect(() => {
    const checkHash = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.replace('#', '');
      if (services.some(s => s.id === hash)) {
        setOpenId(hash);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  return (
    <div className="services-list">
      {services.map(svc => (
        <div key={svc.id} id={svc.id} className={`service-item ${svc.tone}${openId === svc.id ? ' open' : ''}`}>
          <div
              className="service-header"
              onClick={() => toggle(svc.id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(svc.id)}
              role="button"
              tabIndex={0}
              aria-expanded={openId === svc.id}
            >
            <h3>{svc.title}</h3>
            <button className="service-toggle" aria-label={openId === svc.id ? 'Collapse' : 'Expand'}>+</button>
          </div>
          <div className="service-body">
            <div className="service-tag">{svc.tag}</div>
            <p className="service-summary">{svc.summary}</p>
            <div className="service-offerings">
              {svc.offerings.map(off => (
                <div key={off.title} className="offering">
                  <h4>{off.title}</h4>
                  <p>{off.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
