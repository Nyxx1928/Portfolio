'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MangaPanel } from '@/components/manga/MangaPanel';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { Interest } from '@/types';
import { cn } from '@/lib/utils';

interface InterestsPanelProps {
  interests: Interest[];
}

/**
 * InterestsPanel - Display personal interests with trading card-style elements
 * 
 * Features:
 * - Trading card-style elements for manga/anime favorites
 * - Grid layout with responsive columns
 * - Hover flip animation to reveal details
 * - Hobbies displayed with icons
 * - Grouped by type (manga, anime, hobby)
 * 
 * Requirements: 8.1, 8.2, 8.3
 * 
 * @param interests - Array of interests to display
 */
export function InterestsPanel({ interests }: InterestsPanelProps) {
  // Group interests by type
  const mangaInterests = interests.filter((i) => i.type === 'manga');
  const animeInterests = interests.filter((i) => i.type === 'anime');
  const hobbyInterests = interests.filter((i) => i.type === 'hobby');

  return (
    <MangaPanel variant="bordered" animation="reveal" className="overflow-hidden">
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h2 className="text-3xl md:text-4xl font-heading uppercase tracking-wider mb-2">
            Interests & Favorites
          </h2>
          <div className="h-1 w-20 bg-manga-black" />
        </div>

        {/* Manga Favorites */}
        {mangaInterests.length > 0 && (
          <InterestSection
            title="Favorite Manga"
            interests={mangaInterests}
            type="manga"
          />
        )}

        {/* Anime Favorites */}
        {animeInterests.length > 0 && (
          <InterestSection
            title="Favorite Anime"
            interests={animeInterests}
            type="anime"
          />
        )}

        {/* Hobbies */}
        {hobbyInterests.length > 0 && (
          <InterestSection
            title="Hobbies & Activities"
            interests={hobbyInterests}
            type="hobby"
          />
        )}
      </div>
    </MangaPanel>
  );
}

/**
 * InterestSection - Section for a specific type of interest
 */
function InterestSection({
  title,
  interests,
  type,
}: {
  title: string;
  interests: Interest[];
  type: Interest['type'];
}) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div ref={ref}>
      <h3 className="text-xl md:text-2xl font-heading uppercase tracking-wider mb-6 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-manga-black" />
        {title}
      </h3>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {interests.map((interest, index) => (
          <motion.div
            key={interest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 20,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
          >
            {type === 'hobby' ? (
              <HobbyCard interest={interest} />
            ) : (
              <TradingCard interest={interest} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * TradingCard - Trading card-style element with flip animation
 */
function TradingCard({ interest }: { interest: Interest }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-80 cursor-pointer perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden border-4 border-manga-black bg-manga-white shadow-manga overflow-hidden">
          {/* Image */}
          <div className="relative h-3/4 bg-manga-gray-200 overflow-hidden">
            {interest.image && (
              <Image
                src={interest.image}
                alt={interest.title}
                fill
                className="object-cover grayscale"
              />
            )}
            {/* Halftone overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />
            </div>
            {/* Rating badge */}
            {interest.rating && (
              <div className="absolute top-2 right-2 bg-manga-black text-manga-white px-3 py-1 border-2 border-manga-white">
                <span className="text-sm font-bold">{interest.rating}/10</span>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="h-1/4 flex items-center justify-center px-4 border-t-4 border-manga-black bg-manga-white">
            <h4 className="text-lg font-heading uppercase tracking-wide text-center line-clamp-2">
              {interest.title}
            </h4>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-manga-black" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-manga-black" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-manga-black" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-manga-black" />
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden border-4 border-manga-black bg-manga-gray-50 shadow-manga p-6 flex flex-col justify-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-4">
            <h4 className="text-xl font-heading uppercase tracking-wide text-center border-b-2 border-manga-black pb-2">
              {interest.title}
            </h4>
            {interest.description && (
              <p className="text-sm leading-relaxed text-manga-gray-800">
                {interest.description}
              </p>
            )}
            {interest.rating && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="text-sm font-medium text-manga-gray-600">Rating:</span>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-2 h-4 border border-manga-black',
                        i < interest.rating! ? 'bg-manga-black' : 'bg-manga-white'
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-manga-black" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-manga-black" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-manga-black" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-manga-black" />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * HobbyCard - Display hobby with icon
 */
function HobbyCard({ interest }: { interest: Interest }) {
  return (
    <div
      className={cn(
        'relative border-4 border-manga-black bg-manga-white p-6 shadow-manga',
        'hover:shadow-manga-lg hover:-translate-x-1 hover:-translate-y-1',
        'transition-all duration-200'
      )}
    >
      {/* Image/Icon */}
      {interest.image && (
        <div className="relative h-32 mb-4 bg-manga-gray-200 border-2 border-manga-black overflow-hidden">
          <Image
            src={interest.image}
            alt={interest.title}
            fill
            className="object-cover grayscale"
          />
          {/* Halftone overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '4px 4px',
              }}
            />
          </div>
        </div>
      )}

      {/* Title */}
      <h4 className="text-lg font-heading uppercase tracking-wide mb-3 border-b-2 border-manga-black pb-2">
        {interest.title}
      </h4>

      {/* Description */}
      {interest.description && (
        <p className="text-sm leading-relaxed text-manga-gray-800">
          {interest.description}
        </p>
      )}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-manga-black" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-manga-black" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-manga-black" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-manga-black" />
    </div>
  );
}
