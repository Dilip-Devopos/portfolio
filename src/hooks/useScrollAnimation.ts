import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Optimized scroll animation hook - O(1) time complexity for visibility checks
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Memoized callback to prevent observer recreation - O(1) space complexity
  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      if (triggerOnce && ref.current) {
        // Disconnect observer after first trigger for performance
        observer.unobserve(ref.current);
      }
    } else if (!triggerOnce) {
      setIsVisible(false);
    }
  }, [triggerOnce]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, handleIntersection]);

  return { ref, isVisible };
};

// Animation variants for different effects
export const animationVariants = {
  fadeInUp: {
    hidden: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0'
  },
  fadeInLeft: {
    hidden: 'opacity-0 -translate-x-8',
    visible: 'opacity-100 translate-x-0'
  },
  fadeInRight: {
    hidden: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0'
  },
  fadeIn: {
    hidden: 'opacity-0',
    visible: 'opacity-100'
  },
  scaleIn: {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100'
  }
};
