'use client';

import { InkEffect } from '@/components/manga/InkEffect';
import { getOverlayDuration } from '@/components/horizontal-scroll/utils';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

interface PageTransitionOverlayProps {
  isTransitioning: boolean;
  onComplete: () => void;
}

export function PageTransitionOverlay({ isTransitioning, onComplete }: PageTransitionOverlayProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isTransitioning) {
      return;
    }

    if (prefersReducedMotion) {
      onComplete();
    }
  }, [isTransitioning, onComplete, prefersReducedMotion]);

  const duration = useMemo(() => getOverlayDuration(prefersReducedMotion), [prefersReducedMotion]);

  useEffect(() => {
    if (!isTransitioning || duration === 0) {
      return;
    }

    const timeout = window.setTimeout(onComplete, duration);
    return () => window.clearTimeout(timeout);
  }, [duration, isTransitioning, onComplete]);

  if (!isTransitioning || duration === 0) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      aria-hidden="true"
    >
      <InkEffect variant="splash" animated className="opacity-90" />
    </motion.div>
  );
}
