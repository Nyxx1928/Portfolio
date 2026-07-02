'use client';

import { InkEffect } from '@/components/manga/InkEffect';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface InkReverseOverlayProps {
  isActive: boolean;
  onComplete: () => void;
}

export function InkReverseOverlay({ isActive, onComplete }: InkReverseOverlayProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const splashTimer = setTimeout(() => setShowSplash(true), 150);
    const completeTimer = setTimeout(onComplete, 300);

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(completeTimer);
    };
  }, [isActive, onComplete, prefersReducedMotion]);

  if (!isActive) return null;
  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.3, times: [0, 0.5, 1], ease: 'easeInOut' }}
      aria-hidden="true"
    >
      {showSplash && (
        <div className="scale-150 opacity-70">
          <InkEffect variant="splash" />
        </div>
      )}
    </motion.div>
  );
}
