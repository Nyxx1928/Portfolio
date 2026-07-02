'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CornerAccents, SplashHalftoneOverlay } from './splash';
import { useIsClient } from '@/lib/hooks/useIsClient';

const SPLASH_KEY = 'manga-splash-shown';

export function SplashScreen() {
  const isClient = useIsClient();
  const [dismissed, setDismissed] = useState(false);
  const dismissing = useRef(false);

  // Decide whether to show the splash. sessionStorage is only readable on the
  // client, so we gate on `isClient` (hydration-safe via useSyncExternalStore).
  const shouldShowSplash =
    isClient &&
    !dismissed &&
    (() => {
      try {
        return !sessionStorage.getItem(SPLASH_KEY);
      } catch {
        return true;
      }
    })();

  const phase: 'splash' | 'done' = shouldShowSplash ? 'splash' : 'done';

  const dismiss = useCallback(() => {
    if (dismissing.current) return;
    dismissing.current = true;
    try {
      sessionStorage.setItem(SPLASH_KEY, '1');
    } catch {}
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (phase !== 'splash') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, dismiss]);

  return (
    <AnimatePresence>
      {phase === 'splash' && (
        <motion.div
          key="splash-page"
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-manga-white overflow-hidden cursor-pointer select-none"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome splash screen — click or press Enter, Space, or Escape to continue"
          exit={{
            x: '-100%',
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Page-curl shadow — fades in as the page slides left */}
          <motion.div
            className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/15 to-transparent pointer-events-none z-20"
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            aria-hidden="true"
          />

          <SplashHalftoneOverlay />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center pointer-events-none">
            <motion.p
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
              className="font-heading text-sm sm:text-base tracking-[0.3em] uppercase text-manga-gray-600"
            >
              Chapter 01
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scaleX: 0.85 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-heading uppercase text-manga-black leading-none tracking-wider"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
            >
              Portfolio
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4, ease: 'easeOut' }}
              className="w-32 sm:w-48 h-[3px] bg-manga-black origin-center"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4, ease: 'easeOut' }}
              className="font-body text-sm sm:text-base text-manga-gray-800 tracking-widest uppercase"
            >
              Crafting Digital Experiences
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 1.1, duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
              className="font-heading text-xs sm:text-sm tracking-[0.25em] uppercase text-manga-gray-400 mt-4"
              aria-hidden="true"
            >
              Tap to continue
            </motion.p>
          </div>

          <CornerAccents />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
