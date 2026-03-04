'use client';

import { cn } from '@/lib/utils';

interface SpeechBubbleProps {
  children: React.ReactNode;
  variant?: 'speech' | 'thought' | 'shout';
  tailDirection?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
}

/**
 * SpeechBubble - A manga-style speech bubble component
 * 
 * Features:
 * - SVG-based bubble shapes for clean rendering
 * - Multiple variants (speech, thought, shout)
 * - Configurable tail direction (bottom-left, bottom-right, top-left, top-right)
 * - Responsive text sizing
 * 
 * @param children - Content to display inside the bubble
 * @param variant - Style variant (speech, thought, shout)
 * @param tailDirection - Direction of the speech bubble tail
 * @param className - Additional CSS classes
 */
export function SpeechBubble({
  children,
  variant = 'speech',
  tailDirection = 'bottom-left',
  className,
}: SpeechBubbleProps) {
  // Determine border radius based on variant
  const borderRadiusClass = {
    speech: 'rounded-2xl',
    thought: 'rounded-full',
    shout: 'rounded-none',
  }[variant];

  // Determine border style based on variant
  const borderStyleClass = {
    speech: 'border-manga border-manga-black',
    thought: 'border-manga border-manga-black border-dashed',
    shout: 'border-manga-thick border-manga-black',
  }[variant];

  // Determine tail position classes
  const tailPositionClass = {
    'bottom-left': 'bottom-0 left-8',
    'bottom-right': 'bottom-0 right-8',
    'top-left': 'top-0 left-8',
    'top-right': 'top-0 right-8',
  }[tailDirection];

  // Determine tail rotation based on direction
  const tailRotation = {
    'bottom-left': 'rotate-0',
    'bottom-right': 'rotate-0 scale-x-[-1]',
    'top-left': 'rotate-180',
    'top-right': 'rotate-180 scale-x-[-1]',
  }[tailDirection];

  // Determine tail offset based on direction
  const tailOffset = {
    'bottom-left': 'translate-y-full',
    'bottom-right': 'translate-y-full',
    'top-left': '-translate-y-full',
    'top-right': '-translate-y-full',
  }[tailDirection];

  return (
    <div className={cn('relative inline-block', className)}>
      {/* Main bubble container */}
      <div
        className={cn(
          'relative bg-manga-white',
          borderRadiusClass,
          borderStyleClass,
          // Responsive padding
          'px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4',
          // Responsive text sizing
          'text-sm sm:text-base md:text-base',
          // Ensure text is readable
          'text-manga-black',
          // Add some spacing for multi-line text
          'leading-relaxed'
        )}
      >
        {children}
      </div>

      {/* Speech bubble tail - only for speech and shout variants */}
      {variant !== 'thought' && (
        <div
          className={cn(
            'absolute',
            tailPositionClass,
            tailOffset,
            'pointer-events-none'
          )}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(tailRotation)}
          >
            {/* Tail shape */}
            <path
              d="M0 0 L12 0 L0 24 Z"
              fill="white"
              stroke="black"
              strokeWidth={variant === 'shout' ? '5' : '3'}
              strokeLinejoin="miter"
            />
          </svg>
        </div>
      )}

      {/* Thought bubble circles - only for thought variant */}
      {variant === 'thought' && (
        <div
          className={cn(
            'absolute',
            tailPositionClass,
            tailOffset,
            'pointer-events-none flex gap-1',
            // Adjust direction based on tail position
            tailDirection.includes('left') ? 'flex-row' : 'flex-row-reverse'
          )}
        >
          {/* Three circles decreasing in size */}
          <div className="w-3 h-3 rounded-full bg-manga-white border-manga border-manga-black" />
          <div className="w-2 h-2 rounded-full bg-manga-white border-manga border-manga-black" />
          <div className="w-1.5 h-1.5 rounded-full bg-manga-white border-manga border-manga-black" />
        </div>
      )}
    </div>
  );
}
