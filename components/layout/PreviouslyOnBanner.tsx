'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIsClient } from '@/lib/hooks/useIsClient';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

const STORAGE_KEY = 'manga-portfolio-history';

interface HistoryData {
  visitCount: number;
  lastSection: string;
  lastSectionLabel: string;
}

function readHistory(): HistoryData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as HistoryData;
  } catch {
    return null;
  }
}

function writeHistory(data: HistoryData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable — noop
  }
}

const sectionLabels: Record<string, string> = {
  '/': 'the Home page',
  '/about': 'the About page',
  '/projects': 'the Projects page',
  '/contact': 'the Contact page',
};

export function PreviouslyOnBanner() {
  const isClient = useIsClient();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const incrementedRef = useRef(false);

  // Read the *previous* history once, after hydration. This is the data we
  // display to the user ("you were exploring ..."). useMemo keeps the reference
  // stable across re-renders so we don't re-parse localStorage every paint.
  const history = useMemo<HistoryData | null>(
    () => (isClient ? readHistory() : null),
    [isClient],
  );

  // Side effect: increment the visit counter once per mount. This only writes
  // to localStorage — it does not call setState, so it does not trigger the
  // set-state-in-effect lint rule or cascading renders.
  useEffect(() => {
    if (!isClient || incrementedRef.current) return;
    incrementedRef.current = true;

    const existing = readHistory();
    if (!existing || existing.visitCount === 0) {
      writeHistory({ visitCount: 1, lastSection: '/', lastSectionLabel: sectionLabels['/'] });
      return;
    }

    writeHistory({
      ...existing,
      visitCount: existing.visitCount + 1,
    });
  }, [isClient]);

  // The banner is visible only when there is prior history to show and the
  // user has not dismissed it. Derived during render — no effect setState.
  const visible = isClient && history !== null && history.visitCount > 0 && !dismissed;

  const dismiss = useCallback(() => {
    if (prefersReducedMotion) {
      setDismissed(true);
      return;
    }

    setDismissing(true);
    setTimeout(() => {
      setDismissed(true);
      setDismissing(false);
    }, 300);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!visible || dismissing || prefersReducedMotion) return;
    timerRef.current = setTimeout(dismiss, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, dismissing, dismiss, prefersReducedMotion]);

  if (!visible || !history) return null;

  const sectionLabel = sectionLabels[history.lastSection] || 'a previous page';

  const bannerContent = (
    <div className="bg-manga-black text-manga-white px-4 py-3 border-b-2 border-manga-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-heading text-xs uppercase tracking-widest shrink-0">
            Previously On...
          </span>
          <span className="hidden sm:inline text-manga-gray-400 text-sm truncate">
            You were exploring {sectionLabel}.
          </span>
          <span className="sm:hidden text-manga-gray-400 text-sm truncate">
            {sectionLabel}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={history.lastSection}
            className="font-heading text-xs uppercase tracking-wider px-3 py-1.5 border border-manga-white text-manga-white hover:bg-manga-white hover:text-manga-black transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
          >
            Continue Reading →
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            className="text-manga-gray-400 hover:text-manga-white transition-colors text-sm"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div
        className="overflow-hidden"
        role="status"
        aria-live="polite"
        onClick={dismiss}
      >
        {bannerContent}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="previously-on"
          initial={{ height: 0, opacity: 0 }}
          animate={
            dismissing
              ? { height: 0, opacity: 0 }
              : { height: 'auto', opacity: 1 }
          }
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
          role="status"
          aria-live="polite"
          onClick={dismiss}
        >
          {bannerContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
