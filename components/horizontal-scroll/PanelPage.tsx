'use client';

import { motion, useInView } from 'framer-motion';
import { Children, useEffect, useMemo, useRef } from 'react';

interface PanelPageProps {
  id: string;
  label: string;
  index: number;
  allowInternalScroll?: boolean;
  isActive: boolean;
  onBottomInViewChange?: (index: number, inView: boolean) => void;
  children: React.ReactNode;
}

export function PanelPage({
  id,
  label,
  index,
  allowInternalScroll = false,
  isActive,
  onBottomInViewChange,
  children,
}: PanelPageProps) {
  const panelRef = useRef<HTMLElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const hasPlayedEntryRef = useRef(false);
  const isInView = useInView(panelRef, { amount: 0.65 });

  useEffect(() => {
    if (isInView) {
      hasPlayedEntryRef.current = true;
    }
  }, [isInView]);

  useEffect(() => {
    if (!allowInternalScroll || !sentinelRef.current || !onBottomInViewChange) {
      return;
    }

    const root = panelRef.current;
    if (!root) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      const fallback = () => {
        const atBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 1;
        onBottomInViewChange(index, atBottom);
      };

      root.addEventListener('scroll', fallback, { passive: true });
      fallback();
      return () => root.removeEventListener('scroll', fallback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => onBottomInViewChange(index, entry.isIntersecting),
      {
        root,
        threshold: 1,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [allowInternalScroll, index, onBottomInViewChange]);

  const childArray = useMemo(() => Children.toArray(children), [children]);
  const shouldShowAnimatedState = hasPlayedEntryRef.current || isInView;

  return (
    <section
      ref={panelRef}
      id={id}
      aria-label={label}
      data-panel-index={index}
      data-allow-internal-scroll={allowInternalScroll ? 'true' : 'false'}
      className={`
        relative w-screen min-h-screen shrink-0 snap-start
        ${allowInternalScroll ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}
      `}
      tabIndex={-1}
    >
      <motion.div
        id={isActive ? 'active-panel-content' : undefined}
        role="main"
        className="min-h-screen pt-16"
        initial={false}
        animate={shouldShowAnimatedState ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.05,
            },
          },
        }}
      >
        {childArray.map((child, childIndex) => (
          <motion.div
            key={childIndex}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
            }}
          >
            {child}
          </motion.div>
        ))}

        {allowInternalScroll && <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />}
      </motion.div>
    </section>
  );
}
