'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { colorClasses, sizeClasses, type SoundEffect } from './onomatopoeia-config';

type OnomatopoeiaSize = keyof typeof sizeClasses;
type OnomatopoeiaColor = keyof typeof colorClasses;
type OnomatopoeiaAnimation = 'pop' | 'shake' | 'pulse' | 'none';

interface OnomatopoeiaProps {
  effect: SoundEffect;
  size?: OnomatopoeiaSize;
  color?: OnomatopoeiaColor;
  rotation?: number;
  animation?: OnomatopoeiaAnimation;
  zIndex?: number;
  className?: string;
}

const animationVariants: Record<OnomatopoeiaAnimation, Variants> = {
  none: {
    hidden: { opacity: 1, scale: 1, x: 0, y: 0 },
    visible: { opacity: 1, scale: 1, x: 0, y: 0 },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.75, x: 0, y: 0 },
    visible: {
      opacity: 1,
      scale: [0.75, 1.12, 1],
      x: 0,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' },
    },
  },
  shake: {
    hidden: { opacity: 0, scale: 1, x: 0, y: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      x: [0, -4, 4, -3, 3, 0],
      y: [0, 2, -2, 2, -2, 0],
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  pulse: {
    hidden: { opacity: 0, scale: 0.95, x: 0, y: 0 },
    visible: {
      opacity: 1,
      scale: [0.95, 1.08, 1],
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  },
};

function clampOnomatopoeiaRotation(rotation: number): number {
  return Math.max(-45, Math.min(45, rotation));
}

/**
 * Decorative manga sound-effect text with viewport-triggered animation.
 */
export function Onomatopoeia({
  effect,
  size = 'md',
  color = 'primary',
  rotation = -12,
  animation = 'pop',
  zIndex = 20,
  className,
}: OnomatopoeiaProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const [willChangeActive, setWillChangeActive] = useState(false);

  const reducedAnimation = prefersReducedMotion ? 'none' : animation;

  useEffect(() => {
    if (inView && reducedAnimation !== 'none') {
      setWillChangeActive(true);
    }
  }, [inView, reducedAnimation]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={animationVariants[reducedAnimation]}
      onAnimationComplete={() => {
        setWillChangeActive(false);
      }}
      className={cn(
        'absolute select-none pointer-events-none font-heading uppercase tracking-wider',
        'text-shadow-manga-strong text-stroke',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      style={{
        zIndex,
        rotate: clampOnomatopoeiaRotation(rotation),
        willChange: willChangeActive ? 'transform, opacity' : 'auto',
      }}
      data-testid="onomatopoeia"
    >
      {effect}
    </motion.div>
  );
}

export { animationVariants };

export default Onomatopoeia;
