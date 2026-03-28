/**
 * Typography helpers for manga-style emphasis text.
 *
 * Requirements: 5.6, 6.5, 13.1
 */

export const emphasisSizes = {
  sm: 'text-sm sm:text-base',
  md: 'text-base sm:text-lg',
  lg: 'text-lg sm:text-2xl',
  xl: 'text-2xl sm:text-4xl',
} as const;

export const rotationClasses = {
  '-12': 'text-rotate-neg-12',
  '-6': 'text-rotate-neg-6',
  '0': '',
  '6': 'text-rotate-6',
  '12': 'text-rotate-12',
} as const;

export type EmphasisSize = keyof typeof emphasisSizes;

/**
 * Clamp arbitrary rotation values to the supported EmphasisText range.
 */
export function clampRotation(rotation: number): number {
  return Math.max(-12, Math.min(12, rotation));
}
