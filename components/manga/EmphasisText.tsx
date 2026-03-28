import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { clampRotation, emphasisSizes, type EmphasisSize } from '@/lib/utils/typography';

type EmphasisColor = 'black' | 'white' | 'cyan-primary' | 'cyan-light' | 'cyan-dark';

export interface EmphasisTextProps {
  children: ReactNode;
  size?: EmphasisSize;
  color?: EmphasisColor;
  rotation?: number;
  stroke?: boolean;
  className?: string;
}

function getRotationClass(rotation: number): string {
  if (rotation <= -9) return 'text-rotate-neg-12';
  if (rotation <= -3) return 'text-rotate-neg-6';
  if (rotation < 3) return '';
  if (rotation < 9) return 'text-rotate-6';
  return 'text-rotate-12';
}

function getColorClass(color: EmphasisColor): string {
  switch (color) {
    case 'white':
      return 'text-manga-white';
    case 'cyan-primary':
      return 'text-manga-cyan-primary';
    case 'cyan-light':
      return 'text-manga-cyan-light';
    case 'cyan-dark':
      return 'text-manga-cyan-dark';
    case 'black':
    default:
      return 'text-manga-black';
  }
}

/**
 * Inline manga emphasis text with optional stroke and rotation.
 */
export function EmphasisText({
  children,
  size = 'md',
  color = 'black',
  rotation = 0,
  stroke = false,
  className,
}: EmphasisTextProps) {
  const clampedRotation = clampRotation(rotation);

  return (
    <span
      className={cn(
        'inline-block text-emphasis text-shadow-manga leading-[1.1]',
        emphasisSizes[size],
        getColorClass(color),
        getRotationClass(clampedRotation),
        stroke && (color.startsWith('cyan') ? 'text-stroke-accent' : 'text-stroke'),
        className
      )}
    >
      {children}
    </span>
  );
}

export default EmphasisText;
