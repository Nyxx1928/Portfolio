'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageVariants } from '@/lib/animations/variants';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition component wraps page content with Framer Motion animations
 * to create smooth manga page-turn transitions between routes.
 * 
 * Features:
 * - Slide/fade transition effects
 * - Manga page-turn animation aesthetic
 * - AnimatePresence for exit animations
 * - Route-based animation keys
 * 
 * Requirements: 24.1, 24.2
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
