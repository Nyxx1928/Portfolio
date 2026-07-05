'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

interface PageCurlOverlayProps {
  isActive: boolean;
  direction: 'left' | 'right';
  onComplete: () => void;
}

export function PageCurlOverlay({ isActive, direction, onComplete }: PageCurlOverlayProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // When reduced motion is requested, skip the animation entirely and complete
  // immediately so the parent can tear down the transition state.
  useEffect(() => {
    if (isActive && prefersReducedMotion) {
      onComplete();
    }
  }, [isActive, prefersReducedMotion, onComplete]);

  if (prefersReducedMotion || !isActive) return null;

  const gradientClass = direction === 'left'
    ? 'bg-gradient-to-r from-black/15 to-transparent'
    : 'bg-gradient-to-l from-black/15 to-transparent';

  const sideClass = direction === 'left' ? 'left-0' : 'right-0';

  return (
    <motion.div
      className={`fixed inset-y-0 w-32 pointer-events-none z-[61] ${sideClass} ${gradientClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 0.55,
        times: [0, 0.27, 0.73, 1],
        ease: 'easeOut',
      }}
      onAnimationComplete={() => onComplete()}
      aria-hidden="true"
    />
  );
}
