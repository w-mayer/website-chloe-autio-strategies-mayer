'use client';

import { useEffect, useState } from 'react';

interface TeamCardProps {
  /** Anchor id, e.g. "chloe" → /about#chloe opens this bio. */
  id: string;
  name: string;
  role: string;
  photo: string;
  /** Optional crop focus for the headshot, e.g. "center top". */
  photoPosition?: string;
  linkedin: string;
  /** Short bio, always visible. */
  summary: string;
  /** Full bio paragraphs, shown when "Read bio" is clicked. */
  bio: string[];
}

export default function TeamCard({ id, name, role, photo, photoPosition, linkedin, summary, bio }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Open the full bio when the URL hash matches this card (e.g. /about#chloe).
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === `#${id}`) {
        setExpanded(true);
        // Scroll again once the bio has rendered, since the card grows taller.
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [id]);

  return (
    <div className="team-card" id={id}>
      <div className="team-photo has-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={name} style={photoPosition ? { objectPosition: photoPosition } : undefined} />
      </div>
      <h4>{name}</h4>
      <div className="role">{role}</div>
      <p className="bio-short">{summary}</p>
      <div className="bio-links">
        <a className="li" href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`}>LinkedIn →</a>
        <button
          className="li bio-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls={`${id}-bio`}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Close bio ↑' : 'Read bio →'}
        </button>
      </div>
      <div className="bio-full" id={`${id}-bio`} hidden={!expanded}>
        {bio.map(paragraph => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
      </div>
    </div>
  );
}
