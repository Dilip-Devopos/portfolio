import React, { memo } from 'react';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  animation?: keyof typeof animationVariants;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

// Optimized with React.memo to prevent unnecessary re-renders - O(1) comparison
export const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = memo(({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px'
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, rootMargin });

  // Optimized class concatenation - O(1) time complexity
  const animationClasses = animationVariants[animation];
  const classes = [
    'transform transition-all ease-out',
    isVisible ? animationClasses.visible : animationClasses.hidden,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      style={{
        transitionDelay: delay > 0 ? `${delay}ms` : undefined,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
});
