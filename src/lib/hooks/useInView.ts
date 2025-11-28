'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Lightweight Intersection Observer hook for scroll-triggered animations.
 * Zero external dependencies - uses native browser API.
 * 
 * @param options - Configuration options
 * @param options.threshold - Percentage of element visible to trigger (0-1), default 0.1
 * @param options.rootMargin - Margin around root element, default '0px'
 * @param options.triggerOnce - Only trigger once, default true
 * @returns [ref, isInView] - Ref to attach to element and boolean indicating visibility
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [React.RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T>(null!);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced motion preference
    if (typeof window !== 'undefined' && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
}

/**
 * Hook that applies CSS animation classes when element comes into view.
 * Automatically adds 'is-visible' class to trigger CSS animations.
 * 
 * @param options - Configuration options (same as useInView)
 * @returns ref - Ref to attach to the animated element
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): React.RefObject<T> {
  const [ref, isInView] = useInView<T>(options);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (isInView) {
      element.classList.add('is-visible');
    } else {
      element.classList.remove('is-visible');
    }
  }, [isInView, ref]);

  return ref;
}

/**
 * Hook for staggered animations on multiple children.
 * Returns a callback ref that sets up staggered delays.
 * 
 * @param baseDelay - Base delay between items in seconds, default 0.1
 * @param options - UseInView options
 * @returns [containerRef, isInView] - Ref for container and visibility state
 */
export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>(
  baseDelay: number = 0.1,
  options: UseInViewOptions = {}
): [React.RefObject<T>, boolean] {
  const [ref, isInView] = useInView<T>(options);

  useEffect(() => {
    const container = ref.current;
    if (!container || !isInView) return;

    const children = container.children;
    Array.from(children).forEach((child, index) => {
      if (child instanceof HTMLElement) {
        child.style.animationDelay = `${index * baseDelay}s`;
        child.classList.add('is-visible');
      }
    });
  }, [isInView, baseDelay, ref]);

  return [ref, isInView];
}

