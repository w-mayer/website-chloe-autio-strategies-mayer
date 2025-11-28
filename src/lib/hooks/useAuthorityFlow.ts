import { useEffect, useRef, useState, useCallback } from 'react';

interface UseAuthorityFlowOptions {
  enableHighlight?: boolean;
  enableColorShift?: boolean;
  progressThreshold?: number;
}

interface UseAuthorityFlowReturn {
  ref: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  underlineComplete: boolean;
  triggerAnimation: () => void;
  resetAnimation: () => void;
}

export const useAuthorityFlow = (options: UseAuthorityFlowOptions = {}): UseAuthorityFlowReturn => {
  const {
    enableColorShift = true,
    progressThreshold = 0.3,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [underlineComplete, setUnderlineComplete] = useState(false);
  
  // Cache layout values to avoid forced reflows
  const cachedLayout = useRef({
    scrollHeight: 0,
    windowHeight: 0,
  });
  
  // Track requestAnimationFrame ID for cleanup
  const rafId = useRef<number | null>(null);
  
  // Pending filter value to batch updates
  const pendingFilterValue = useRef<string | null>(null);

  // Update cached layout values
  const updateCachedLayout = useCallback(() => {
    cachedLayout.current = {
      scrollHeight: document.body.scrollHeight,
      windowHeight: window.innerHeight,
    };
  }, []);

  // Apply filter batched via requestAnimationFrame to avoid forced reflows
  const applyFilter = useCallback((filterValue: string) => {
    if (!ref.current) return;
    
    // Cancel any pending animation frame
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    
    // Store pending value
    pendingFilterValue.current = filterValue;
    
    // Batch the style update in the next frame (avoids forced reflow)
    rafId.current = requestAnimationFrame(() => {
      if (ref.current && pendingFilterValue.current !== null) {
        // Set filter directly - batched in requestAnimationFrame to avoid reflow
        ref.current.style.filter = pendingFilterValue.current;
        pendingFilterValue.current = null;
      }
      rafId.current = null;
    });
  }, []);

  // Handle scroll interactions (optimized to avoid forced reflows)
  const handleScroll = useCallback(() => {
    if (!ref.current || !enableColorShift) return;

    // Use cached layout values instead of reading on every scroll
    const { scrollHeight, windowHeight } = cachedLayout.current;
    
    // Only read scroll position (this doesn't cause reflow)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate scroll depth using cached values
    const maxScroll = scrollHeight - windowHeight;
    if (maxScroll <= 0) return;
    
    const scrollDepth = Math.max(0, Math.min(1, scrollTop / maxScroll));
    const brightness = 1 - scrollDepth * 0.1;
    const saturation = 1 + scrollDepth * 0.1;
    
    // Batch the style update
    applyFilter(`brightness(${brightness}) saturate(${saturation})`);
  }, [enableColorShift, applyFilter]);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add underline complete class after underline animation
          setTimeout(() => setUnderlineComplete(true), 1.1 * 1000);
        }
      },
      { threshold: progressThreshold, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Initialize cached layout values
    updateCachedLayout();
    
    // Update cached values on resize
    const handleResize = () => {
      updateCachedLayout();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Use requestAnimationFrame to throttle scroll handler
    let scrollRafId: number | null = null;
    const throttledScroll = () => {
      if (scrollRafId !== null) return;
      
      scrollRafId = requestAnimationFrame(() => {
        handleScroll();
        scrollRafId = null;
      });
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleResize);
      
      // Cleanup pending animation frame
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      if (scrollRafId !== null) {
        cancelAnimationFrame(scrollRafId);
      }
    };
  }, [enableColorShift, progressThreshold, handleScroll, updateCachedLayout]);

  // Manual trigger for animation
  const triggerAnimation = useCallback(() => {
    setIsVisible(true);
    setTimeout(() => setUnderlineComplete(true), 1.1 * 1000);
  }, []);

  // Reset animation state
  const resetAnimation = useCallback(() => {
    setIsVisible(false);
    setUnderlineComplete(false);
    if (ref.current) {
      // Cancel any pending updates
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      pendingFilterValue.current = null;
      ref.current.style.filter = '';
    }
  }, []);

  return {
    ref,
    isVisible,
    underlineComplete,
    triggerAnimation,
    resetAnimation,
  };
};

// Utility function to split text into words with animation classes
export const createWordElements = (text: string) => {
  const words = text.split(' ').filter(word => word.length > 0);
  
  return words.map((word, index) => ({
    word,
    className: `authority-heading-word authority-heading-word-${index}`,
    style: {},
  }));
};

// Utility function to generate dynamic CSS for word animations
export const generateWordAnimationCSS = () => {
  // No longer needed since we're not animating text
  return '';
};

export default useAuthorityFlow; 