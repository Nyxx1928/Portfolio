'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InkEffectProps {
  variant?: 'divider' | 'border' | 'splash';
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  animated?: boolean;
  className?: string;
}

/**
 * InkEffect - A manga-style ink brush stroke effect component
 * 
 * Features:
 * - Ink brush stroke effects for dividers and borders
 * - Ink splash animation variant for interactive elements
 * - Multiple positioning options
 * - Optional animation on mount
 * - SVG-based for clean, scalable rendering
 * 
 * Usage:
 * - As divider: Use variant="divider" between sections
 * - As border: Use variant="border" around elements
 * - As splash: Use variant="splash" for button hover effects
 * 
 * @param variant - Effect type (divider, border, splash)
 * @param position - Position of the effect (top, bottom, left, right, center)
 * @param animated - Whether to animate the effect on mount
 * @param className - Additional CSS classes
 */
export function InkEffect({
  variant = 'divider',
  position = 'center',
  animated = false,
  className,
}: InkEffectProps) {
  // Animation variants for ink splash
  const splashVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0.8],
      transition: {
        duration: 0.5,
        times: [0, 0.6, 1],
        ease: 'easeOut' as const,
      },
    },
  };

  // Animation variants for divider/border
  const strokeVariants = {
    initial: {
      scaleX: 0,
      opacity: 0,
    },
    animate: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  // Render divider variant
  if (variant === 'divider') {
    const positionClasses = {
      top: 'top-0 left-0 right-0',
      bottom: 'bottom-0 left-0 right-0',
      left: 'left-0 top-0 bottom-0',
      right: 'right-0 top-0 bottom-0',
      center: 'left-1/2 -translate-x-1/2',
    };

    const sizeClasses = position === 'left' || position === 'right'
      ? 'w-1 h-full'
      : 'h-1 w-full max-w-[80%]';

    return (
      <motion.div
        variants={animated ? strokeVariants : undefined}
        initial={animated ? 'initial' : undefined}
        animate={animated ? 'animate' : undefined}
        className={cn(
          'absolute',
          positionClasses[position],
          sizeClasses,
          className
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 10"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ink brush stroke path with organic, hand-drawn feel */}
          <path
            d="M 0 5 Q 20 3, 40 5 T 80 5 Q 100 6, 120 5 T 160 5 Q 180 4, 200 5"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className="text-manga-black"
            style={{
              filter: 'url(#ink-texture)',
            }}
          />
          {/* SVG filter for ink texture effect */}
          <defs>
            <filter id="ink-texture">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </motion.div>
    );
  }

  // Render border variant
  if (variant === 'border') {
    return (
      <motion.div
        variants={animated ? strokeVariants : undefined}
        initial={animated ? 'initial' : undefined}
        animate={animated ? 'animate' : undefined}
        className={cn(
          'absolute inset-0 pointer-events-none',
          className
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Border path with ink brush effect */}
          <path
            d="M 2 2 L 98 2 L 98 98 L 2 98 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-manga-black"
            style={{
              filter: 'url(#ink-border-texture)',
            }}
          />
          {/* SVG filter for ink texture effect */}
          <defs>
            <filter id="ink-border-texture">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </motion.div>
    );
  }

  // Render splash variant
  if (variant === 'splash') {
    return (
      <motion.div
        variants={animated ? splashVariants : undefined}
        initial={animated ? 'initial' : undefined}
        animate={animated ? 'animate' : undefined}
        className={cn(
          'absolute inset-0 flex items-center justify-center pointer-events-none',
          className
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-w-[120%] max-h-[120%]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ink splash shape with irregular edges */}
          <g className="text-manga-black" fill="currentColor" opacity="0.15">
            {/* Main splash circle */}
            <circle cx="50" cy="50" r="35" />
            {/* Splash droplets */}
            <circle cx="25" cy="30" r="8" />
            <circle cx="75" cy="35" r="6" />
            <circle cx="30" cy="70" r="7" />
            <circle cx="70" cy="68" r="9" />
            <circle cx="50" cy="20" r="5" />
            <circle cx="80" cy="55" r="4" />
            <circle cx="20" cy="55" r="6" />
            <circle cx="50" cy="85" r="5" />
          </g>
          {/* SVG filter for organic ink splash texture */}
          <defs>
            <filter id="ink-splash-texture">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.2"
                numOctaves="5"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </motion.div>
    );
  }

  return null;
}
