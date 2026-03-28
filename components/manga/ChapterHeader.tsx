'use client';

import { cn } from '@/lib/utils';

interface ChapterHeaderProps {
  title: string;
  subtitle?: string;
  chapterNumber?: number;
  cyanVariant?: 'primary' | 'light' | 'dark';
  className?: string;
}

/**
 * ChapterHeader - A manga-style chapter header component.
 */
export function ChapterHeader({
  title,
  subtitle,
  chapterNumber,
  cyanVariant,
  className,
}: ChapterHeaderProps) {
  const textColorClass = cyanVariant ? `text-manga-cyan-${cyanVariant}` : 'text-manga-black';
  const lineColorClass = cyanVariant ? `bg-manga-cyan-${cyanVariant}` : 'bg-manga-black';

  return (
    <div className={cn('relative w-full py-8 sm:py-10 md:py-12', className)}>
      {chapterNumber !== undefined && (
        <div className={cn('text-center font-heading uppercase tracking-wider text-sm sm:text-base md:text-lg mb-2', textColorClass)}>
          Chapter {chapterNumber}
        </div>
      )}

      <div className="relative flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
        <div className={cn('flex-1 h-1 max-w-[20%] sm:max-w-[25%] md:max-w-[30%]', lineColorClass)} aria-hidden="true" />

        <h2
          className={cn(
            'font-heading uppercase text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider whitespace-nowrap',
            textColorClass
          )}
        >
          {title}
        </h2>

        <div className={cn('flex-1 h-1 max-w-[20%] sm:max-w-[25%] md:max-w-[30%]', lineColorClass)} aria-hidden="true" />
      </div>

      {subtitle && <div className="text-center font-body mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-manga-gray-800">{subtitle}</div>}

      <div
        className={cn('absolute bottom-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 md:w-40 h-1', lineColorClass)}
        aria-hidden="true"
      />
    </div>
  );
}
