'use client';

import { InkEffect } from '@/components/manga/InkEffect';
import Dither from '@/components/Dither';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface InkReverseOverlayProps {
  isActive: boolean;
  onComplete: () => void;
}

function InkReverseOverlayInner({ onComplete }: { onComplete: () => void }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [renderReady, setRenderReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const renderTimer = setTimeout(() => setRenderReady(true), 50);
    const splashTimer = setTimeout(() => setShowSplash(true), 250);
    const completeTimer = setTimeout(onComplete, 700);

    return () => {
      clearTimeout(renderTimer);
      clearTimeout(splashTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.7, times: [0, 0.07, 0.6, 1], ease: 'easeInOut' }}
      aria-hidden="true"
    >
      {renderReady && (
        <div className="absolute inset-0 h-full w-full">
          <Dither
            waveSpeed={0.15}
            waveFrequency={4}
            waveAmplitude={0.5}
            waveColor={[0.3, 0.3, 0.3]}
            colorNum={3}
            pixelSize={3}
          />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-white/40">
        {showSplash && (
          <div className="scale-150 opacity-70">
            <InkEffect variant="splash" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function InkReverseOverlay({ isActive, onComplete }: InkReverseOverlayProps) {
  if (!isActive) return null;

  return <InkReverseOverlayInner onComplete={onComplete} />;
}
