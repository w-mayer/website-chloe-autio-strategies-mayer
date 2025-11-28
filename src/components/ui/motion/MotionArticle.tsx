'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

const MotionArticle = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.article })),
  { 
    ssr: false,
    loading: () => <article className="animate-pulse" />
  }
);

const OptimizedMotionArticle = forwardRef<HTMLElement, HTMLMotionProps<'article'>>(
  ({ children, ...props }, ref) => {
    return (
      <MotionArticle ref={ref} {...props}>
        {children}
      </MotionArticle>
    );
  }
);

OptimizedMotionArticle.displayName = 'MotionArticle';

export default OptimizedMotionArticle;

