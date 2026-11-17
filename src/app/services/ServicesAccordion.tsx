'use client';

import { useState, useEffect } from 'react';

const services = [
  {
    id: 'knowledge',
    tone: 'tone-knowledge',
    title: 'Analysis & Intel',
    tag: 'Knowledge',
    summary: 'Producing the intelligence and substantive positions your strategy depends on.',
    offerings: [
      {
        title: 'Policy Development',
        body: 'Public policy positions, comment letters and RFI responses, testimony, briefers and one-pagers, and talking points that elevate your messaging.',
      },
      {
        title: 'Research',
        body: 'White papers, policy primers, and discrete research projects, and analysis of policy proposals and emerging trends to inform your strategy.',
      },
      {
        title: 'Monitoring & Briefings',
        body: 'Real-time intel, monitoring of key developments, briefings on agencies and key players, and quick-turn updates.',
      },
    ],
  },
  {
    id: 'strategy',
    tone: 'tone-strategy',
    title: 'Strategy & Positioning',
    tag: 'Strategy',
    summary: 'Deciding where to engage, how to sequence it, and where your voice actually lands.',
    offerings: [
      {
        title: 'Strategy & Prioritization',
        body: 'Positioning and engagement strategy, sequencing that concentrates time and resources on the highest-impact work, stakeholder mapping, and selection of the events and venues where your presence matters.',
      },
      {
        title: 'Government Strategy & Public Affairs Coordination',
        body: 'Ongoing insight on how policymakers, regulators, and intergovernmental bodies are thinking, and a coordinated approach across agencies, legislatures, and external partners, including trade associations, government affairs firms, and lobbying partners.',
      },
    ],
  },
  {
    id: 'governance',
    tone: 'tone-governance',
    title: 'Governance & Operations',
    tag: 'Governance',
    summary: 'Building the internal machinery and managing the external partners that enable good decisions to scale.',
    offerings: [
      {
        title: 'Internal Governance',
        body: 'Governance bodies, AI use mapping and policies, escalation paths, and internal review processes that put responsible AI to work inside your org chart, designed by a team that has stood up enterprise Responsible AI programs.',
      },
      {
        title: 'Third Party Management',
        body: 'Identification and management of think tanks, convening organizations, grant recipients, and civil society initiatives; media relations support and vendor analysis of AI tools.',
      },
    ],
  },
  {
    id: 'engagement',
    tone: 'tone-engagement',
    title: 'Engagement & Education',
    tag: 'Engagement',
    summary: 'Bringing people together, briefing leaders, and building AI fluency where it matters.',
    offerings: [
      {
        title: 'Event Planning & Facilitation',
        body: 'Custom events, from large convenings to intimate salon dinners, and expertly moderated workshops, roundtables, and stakeholder feedback sessions, designed end to end, from programming and speakers to the guest list and follow-up.',
      },
      {
        title: 'Presentations & Briefings',
        body: 'Tailored presentations for any audience, briefing documents that prepare executives for meetings with policymakers, and custom programming, including speaker selection, for specific events.',
      },
      {
        title: 'AI Education & Coaching',
        body: 'AI 101 sessions that bring teams, leaders, and boards up to speed on how AI works and what’s changing in policy and regulation, plus one-on-one coaching that prepares executives for high-stakes engagements and helps boards ask sharper questions.',
      },
    ],
  },
];

export default function ServicesAccordion() {
  // Multiple services can be open at once. The first is open on arrival, as on
  // the design board; each closes only when its own header is clicked.
  const [openIds, setOpenIds] = useState(() => new Set<string>([services[0].id]));

  // Open the matching service if URL hash matches a service id (e.g., /services#knowledge).
  // Also re-checks on hashchange so users can navigate between services without a reload.
  useEffect(() => {
    const checkHash = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.replace('#', '');
      if (services.some(s => s.id === hash)) {
        setOpenIds(prev => {
          if (prev.has(hash)) return prev;
          const next = new Set(prev);
          next.add(hash);
          return next;
        });
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const toggle = (id: string) => setOpenIds(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });

  return (
    <div className="services-list">
      {services.map(svc => {
        const isOpen = openIds.has(svc.id);
        return (
        <div key={svc.id} id={svc.id} className={`service-item ${svc.tone}${isOpen ? ' open' : ''}`}>
          <div
              className="service-header"
              onClick={() => toggle(svc.id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(svc.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
            >
            <div className="service-head-text">
              <h3>{svc.title}</h3>
              <p className="service-summary">{svc.summary}</p>
            </div>
            {/* Decorative: the whole header row is the button. The "+" is drawn in CSS. */}
            <span className="service-toggle" aria-hidden="true" />
          </div>
          <div className="service-body">
            <div className="service-tag">— {svc.tag}</div>
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
        );
      })}
    </div>
  );
}
