'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface MangaPanelProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'shadowed';
  animation?: 'fade' | 'slide' | 'reveal';
  className?: string;
}

/**
 * MangaPanel - A reusable panel container with manga styling
 * 
 * Features:
 * - Border variants (default, bordered, shadowed)
 * - Scroll-triggered reveal animations
 * - Animation variants (fade, slide, reveal)
 * - Responsive sizing at all breakpoints
 * 
 * @param children - Content to display inside the panel
 * @param variant - Visual style variant (default, bordered, shadowed)
 * @param animation - Animation type when panel enters viewport
 * @param className - Additional CSS classes
 */
export function MangaPanel({
  children,
  variant = 'default',
  animation = 'reveal',
  className,
}: MangaPanelProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
    margin: '0px 0px -100px 0px',
  });

  // Define animation variants based on animation prop
  const animationVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: 'easeOut' as const,
        },
      },
    },
    slide: {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
      },
    },
    reveal: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
      },
    },
  };

  // Determine base classes based on variant
  const variantClasses = {
    default: 'manga-panel',
    bordered: 'manga-panel-bordered',
    shadowed: 'manga-panel-bordered',
  };

  return (
    <motion.div
      ref={ref}
      variants={animationVariants[animation]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn(
        variantClasses[variant],
        // Responsive sizing
        'w-full',
        // Mobile: full width with smaller padding
        'p-4 sm:p-6',
        // Tablet and desktop: maintain consistent padding
        'md:p-6 lg:p-8',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
