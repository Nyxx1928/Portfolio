export type SoundEffect = 'POW' | 'BOOM' | 'BAM' | 'WHOOSH' | 'ZAP' | 'CRASH';

export const soundEffects: SoundEffect[] = ['POW', 'BOOM', 'BAM', 'WHOOSH', 'ZAP', 'CRASH'];

export const sizeClasses = {
  sm: 'text-lg sm:text-2xl',
  md: 'text-2xl sm:text-4xl',
  lg: 'text-4xl sm:text-6xl',
} as const;

export const colorClasses = {
  primary: 'text-manga-cyan-primary',
  light: 'text-manga-cyan-light',
  dark: 'text-manga-cyan-dark',
  black: 'text-manga-black',
  white: 'text-manga-white',
} as const;
