import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface AuthorityHeadingProps {
  children: string;
  className?: string;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  enableHighlight?: boolean;
  style?: CSSProperties;
}

export function AuthorityHeading({
  children,
  className = '',
  size = 'h1',
  enableHighlight = true,
  style,
}: AuthorityHeadingProps) {
  const words = children.split(' ').filter((word) => word.length > 0);
  const HeadingTag = size as keyof JSX.IntrinsicElements;
  const containerClass = cn('authority-heading visible underline-complete', className);

  return (
    <div className={containerClass} style={style}>
      {enableHighlight && <div className="authority-heading-highlight" />}

      <HeadingTag className="authority-heading-words">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="authority-heading-word">
            {word}
          </span>
        ))}
      </HeadingTag>
    </div>
  );
}

export default AuthorityHeading;