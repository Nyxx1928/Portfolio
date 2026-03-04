'use client';

import { cn } from '@/lib/utils';

interface ChapterHeaderProps {
  title: string;
  subtitle?: string;
  chapterNumber?: number;
  className?: string;
}

/**
 * ChapterHeader - A manga-style chapter header component
 * 
 * Features:
 * - Manga chapter title styling with bold typography
 * - Optional chapter numbering
 * - Ink brush stroke divider lines
 * - Decorative lines on both sides
 * - Responsive text sizing
 * 
 * @param title - Main chapter title text
 * @param subtitle - Optional subtitle text below the title
 * @param chapterNumber - Optional chapter number to display
 * @param className - Additional CSS classes
 */
export function ChapterHeader({
  title,
  subtitle,
  chapterNumber,
  className,
}: ChapterHeaderProps) {
  return (
    <div
      className={cn(
        'relative w-full',
        // Vertical spacing
        'py-8 sm:py-10 md:py-12',
        className
      )}
    >
      {/* Chapter number (if provided) */}
      {chapterNumber !== undefined && (
        <div
          className={cn(
            'text-center font-heading uppercase tracking-wider',
            'text-sm sm:text-base md:text-lg',
            'text-manga-gray-600 mb-2'
          )}
        >
          Chapter {chapterNumber}
        </div>
      )}

      {/* Main title with decorative lines */}
      <div className="relative flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
        {/* Left decorative line */}
        <div
          className={cn(
            'flex-1 h-1 bg-manga-black',
            'max-w-[20%] sm:max-w-[25%] md:max-w-[30%]'
          )}
          aria-hidden="true"
        />

        {/* Title text */}
        <h2
          className={cn(
            'font-heading uppercase text-center',
            'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
            'text-manga-black',
            'tracking-wider',
            'whitespace-nowrap'
          )}
        >
          {title}
        </h2>

        {/* Right decorative line */}
        <div
          className={cn(
            'flex-1 h-1 bg-manga-black',
            'max-w-[20%] sm:max-w-[25%] md:max-w-[30%]'
          )}
          aria-hidden="true"
        />
      </div>

      {/* Subtitle (if provided) */}
      {subtitle && (
        <div
          className={cn(
            'text-center font-body mt-3 sm:mt-4',
            'text-sm sm:text-base md:text-lg',
            'text-manga-gray-800'
          )}
        >
          {subtitle}
        </div>
      )}

      {/* Ink brush stroke divider */}
      <div
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2',
          'w-24 sm:w-32 md:w-40 h-1',
          'bg-manga-black',
          // Add a slight brush stroke effect with pseudo-elements
          'after:absolute after:inset-0',
          'after:bg-manga-black after:blur-[1px]'
        )}
        aria-hidden="true"
      />
    </div>
  );
}
