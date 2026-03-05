'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * MangaImage – A wrapper around Next.js Image with built-in error handling.
 *
 * When the source image fails to load, a manga-style placeholder is rendered
 * instead. An optional skeleton loading state is shown while the image loads.
 *
 * Requirements: 17.2 (image loading error handling)
 */

interface MangaImageProps extends Omit<ImageProps, 'onError'> {
  /** Additional wrapper class names. */
  wrapperClassName?: string;
  /** Show a skeleton shimmer while loading. */
  showSkeleton?: boolean;
}

export function MangaImage({
  wrapperClassName,
  showSkeleton = true,
  alt,
  className,
  sizes,
  fill,
  ...rest
}: MangaImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Default sizes for fill images if not provided
  const defaultSizes = fill && !sizes ? '100vw' : sizes;

  if (hasError) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center bg-manga-gray-200 border-2 border-manga-black',
          wrapperClassName
        )}
        role="img"
        aria-label={alt ?? 'Image unavailable'}
      >
        {/* Manga-style placeholder */}
        <div className="text-center p-4">
          <svg
            viewBox="0 0 80 80"
            className="w-16 h-16 mx-auto mb-2"
            aria-hidden="true"
          >
            {/* Broken image icon – manga style */}
            <rect x="10" y="10" width="60" height="60" rx="0" fill="white" stroke="black" strokeWidth="3" />
            <line x1="10" y1="10" x2="70" y2="70" stroke="black" strokeWidth="2" />
            <line x1="70" y1="10" x2="10" y2="70" stroke="black" strokeWidth="2" />
            <circle cx="30" cy="30" r="5" fill="black" />
            <path d="M25 55 L40 40 L50 48 L60 35 L70 50" fill="none" stroke="black" strokeWidth="2" />
          </svg>
          <p className="font-heading text-xs uppercase tracking-wider text-manga-gray-600">
            Image N/A
          </p>
        </div>
        {/* Halftone overlay */}
        <div className="halftone-overlay" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={cn('relative', wrapperClassName)}>
      {showSkeleton && isLoading && (
        <div
          className="absolute inset-0 bg-manga-gray-200 animate-pulse z-10"
          aria-hidden="true"
        />
      )}
      <Image
        alt={alt}
        className={cn(className, isLoading && 'opacity-0')}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        fill={fill}
        sizes={defaultSizes}
        {...rest}
      />
    </div>
  );
}
