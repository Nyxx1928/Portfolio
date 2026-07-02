'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIsClient } from '@/lib/hooks/useIsClient';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

interface Splash {
  id: number;
  x: number;
  y: number;
}

export function ClickSplash() {
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const idRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handler = (event: MouseEvent) => {
      const id = ++idRef.current;
      setSplashes((prev) => [...prev, { id, x: event.clientX, y: event.clientY }]);

      setTimeout(() => {
        setSplashes((prev) => prev.filter((s) => s.id !== id));
      }, 400);
    };

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [prefersReducedMotion]);

  if (!isClient || prefersReducedMotion) return null;

  return createPortal(
    <AnimatePresence>
      {splashes.map((splash) => (
        <motion.div
          key={splash.id}
          className="pointer-events-none fixed z-[9999]"
          style={{ left: splash.x - 10, top: splash.y - 10 }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: [0, 1.2, 0], opacity: [0.8, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor" className="text-manga-black">
              <circle cx="50" cy="50" r="35" />
              <circle cx="25" cy="30" r="8" />
              <circle cx="75" cy="35" r="6" />
              <circle cx="30" cy="70" r="7" />
              <circle cx="70" cy="68" r="9" />
              <circle cx="50" cy="20" r="5" />
              <circle cx="80" cy="55" r="4" />
              <circle cx="20" cy="55" r="6" />
              <circle cx="50" cy="85" r="5" />
            </g>
          </svg>
        </motion.div>
      ))}
    </AnimatePresence>,
    document.body,
  );
}
