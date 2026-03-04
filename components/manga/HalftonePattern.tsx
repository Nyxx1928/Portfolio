'use client';

import { cn } from '@/lib/utils';

interface HalftonePatternProps {
  intensity?: 'light' | 'medium' | 'heavy';
  dotSize?: number;
  className?: string;
}

/**
 * HalftonePattern - A manga-style halftone pattern component
 * 
 * Features:
 * - SVG pattern definition for clean, scalable rendering
 * - Configurable intensity levels (light, medium, heavy)
 * - Configurable dot size and density
 * - Can be used as overlay or background
 * - Grayscale variations for authentic manga aesthetic
 * 
 * Usage:
 * - As overlay: Position absolutely over content with pointer-events-none
 * - As background: Use as background pattern for sections
 * 
 * @param intensity - Pattern intensity level (light, medium, heavy)
 * @param dotSize - Custom dot size (overrides intensity default)
 * @param className - Additional CSS classes
 */
export function HalftonePattern({
  intensity = 'medium',
  dotSize,
  className,
}: HalftonePatternProps) {
  // Define intensity configurations
  const intensityConfig = {
    light: {
      dotRadius: 1,
      spacing: 8,
      opacity: 0.2,
    },
    medium: {
      dotRadius: 1.5,
      spacing: 6,
      opacity: 0.3,
    },
    heavy: {
      dotRadius: 2,
      spacing: 4,
      opacity: 0.5,
    },
  };

  const config = intensityConfig[intensity];
  const radius = dotSize ?? config.dotRadius;
  const spacing = config.spacing;
  const opacity = config.opacity;

  // Generate unique pattern ID to avoid conflicts when multiple patterns are used
  const patternId = `halftone-${intensity}-${radius}-${spacing}`;

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={spacing / 2}
              cy={spacing / 2}
              r={radius}
              fill="currentColor"
              className="text-manga-black"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
        />
      </svg>
    </div>
  );
}
