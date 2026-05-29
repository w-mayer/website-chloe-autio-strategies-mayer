'use client';

import { useState, useEffect } from 'react';

export default function BioToggle({ children, id }: { children: React.ReactNode; id?: string }) {
  const [expanded, setExpanded] = useState(false);

  // Auto-expand if the URL hash matches this bio's id (e.g., /about#chloe).
  // Also listens for hashchange so navigating between bios works without a full reload.
  useEffect(() => {
    if (!id) return;
    const checkHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === `#${id}`) {
        setExpanded(true);
        // Re-scroll after expansion so the card lands properly in view
        // (the card grows taller when the bio appears, shifting layout).
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
    <div className={`bio-wrap${expanded ? ' expanded' : ''}`}>
      {expanded && <p className="bio">{children}</p>}
      <button
        type="button"
        className="bio-toggle"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? 'Hide bio ↑' : 'Read bio →'}
      </button>
    </div>
  );
}
