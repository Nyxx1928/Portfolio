'use client';

import { MangaPanel } from '@/components/manga/MangaPanel';
// Removed useScrollAnimation for debugging
import { TimelineEvent } from '@/types';
import { cn } from '@/lib/utils';

interface TimelineProps {
  events: TimelineEvent[];
}

/**
 * Timeline - Career milestones in vertical manga panel strip format
 * 
 * Features:
 * - Vertical timeline in manga panel strip format
 * - Events displayed chronologically with connecting lines
 * - "Flashback" visual treatment for past events (isPast: true)
 * - Responsive layout (simplified on mobile)
 * - Scroll-triggered animations
 * 
 * Requirements: 7.1, 7.2, 7.3, 17.1
 * 
 * @param events - Array of timeline events to display
 */
export function Timeline({ events }: TimelineProps) {
  // Sort events chronologically (oldest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="border-manga border-manga-black bg-manga-white p-6 md:p-8 shadow-manga">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl md:text-4xl font-heading uppercase tracking-wider mb-2">
            Timeline
          </h2>
          <div className="h-1 w-20 bg-manga-black" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical connecting line (hidden on mobile) */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-manga-black" />

          {/* Timeline Events */}
          <div className="space-y-6 md:space-y-8">
            {sortedEvents.map((event, index) => (
              <TimelineEventItem
                key={event.id}
                event={event}
                index={index}
                isLast={index === sortedEvents.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * TimelineEventItem - Individual timeline event with manga styling
 */
function TimelineEventItem({
  event,
  index,
  isLast,
}: {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}) {
  // Removed scroll animation for debugging

  // Format date for display
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  // Event type icons (manga style)
  const typeIcons: Record<TimelineEvent['type'], string> = {
    education: '📚',
    work: '💼',
    project: '⚡',
    achievement: '⭐',
  };

  // Event type labels
  const typeLabels: Record<TimelineEvent['type'], string> = {
    education: 'Education',
    work: 'Work',
    project: 'Project',
    achievement: 'Achievement',
  };

  return (
    <div className="relative">
      {/* Mobile: Simple stacked layout */}
      <div className="md:hidden">
        <div
          className={cn(
            'border-2 border-manga-black p-4 relative',
            event.isPast
              ? 'bg-manga-gray-50 opacity-80' // Flashback styling
              : 'bg-manga-white shadow-manga'
          )}
        >
          {/* Flashback label for past events */}
          {event.isPast && (
            <div className="absolute -top-2 -right-2 bg-manga-black text-manga-white px-2 py-0.5 text-xs font-heading uppercase tracking-wider">
              Flashback
            </div>
          )}

          {/* Date and Type */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-manga-gray-600 uppercase tracking-wide">
              {formattedDate}
            </span>
            <span className="text-xs font-medium text-manga-gray-600 uppercase tracking-wide flex items-center gap-1">
              <span>{typeIcons[event.type]}</span>
              {typeLabels[event.type]}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-heading uppercase tracking-wider mb-2">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-manga-gray-800 leading-relaxed">
            {event.description}
          </p>

          {/* Organization and Location */}
          {(event.organization || event.location) && (
            <div className="mt-3 pt-3 border-t border-manga-gray-200 text-xs text-manga-gray-600 space-y-1">
              {event.organization && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">@</span>
                  <span>{event.organization}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">📍</span>
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Timeline layout with connecting line */}
      <div className="hidden md:flex gap-6">
        {/* Timeline marker */}
        <div className="relative flex-shrink-0">
          {/* Dot marker */}
          <div
            className={cn(
              'relative z-10 w-16 h-16 border-4 border-manga-black flex items-center justify-center text-2xl',
              event.isPast ? 'bg-manga-gray-200' : 'bg-manga-white'
            )}
          >
            {typeIcons[event.type]}
          </div>

          {/* Connecting line to next event */}
          {!isLast && (
            <div className="absolute left-1/2 top-16 -translate-x-1/2 w-0.5 h-8 bg-manga-black" />
          )}
        </div>

        {/* Event content panel */}
        <div className="flex-1 pb-8">
          <div
            className={cn(
              'relative border-manga border-manga-black p-6',
              event.isPast
                ? 'bg-manga-gray-50' // Flashback styling
                : 'bg-manga-white shadow-manga'
            )}
          >
            {/* Flashback label for past events */}
            {event.isPast && (
              <div className="absolute -top-3 -right-3 bg-manga-black text-manga-white px-3 py-1 text-xs font-heading uppercase tracking-wider shadow-manga">
                Flashback
              </div>
            )}

            {/* Halftone pattern for flashback effect */}
            {event.isPast && (
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '6px 6px',
                }}
              />
            )}

            {/* Date and Type Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-manga-gray-600 uppercase tracking-wide">
                  {formattedDate}
                </span>
                <div className="h-4 w-px bg-manga-gray-400" />
                <span className="text-sm font-medium text-manga-gray-600 uppercase tracking-wide">
                  {typeLabels[event.type]}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-heading uppercase tracking-wider mb-3">
              {event.title}
            </h3>

            {/* Description */}
            <p className="text-base text-manga-gray-800 leading-relaxed mb-4">
              {event.description}
            </p>

            {/* Organization and Location */}
            {(event.organization || event.location) && (
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-manga-gray-200 text-sm text-manga-gray-600">
                {event.organization && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">@</span>
                    <span className="font-medium">{event.organization}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">📍</span>
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            )}

            {/* Corner accent marks (manga panel style) */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-manga-black" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-manga-black" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-manga-black" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-manga-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
