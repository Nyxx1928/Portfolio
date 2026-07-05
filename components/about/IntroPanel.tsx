'use client';

import { MangaPanel } from '@/components/manga/MangaPanel';
import { MangaImage } from '@/components/manga/MangaImage';
import { cn } from '@/lib/utils';

interface IntroPanelProps {
  name: string;
  bio: string;
  avatarSrc: string;
  inspirations: string[];
}

/**
 * IntroPanel - Introduction section for the About page
 * 
 * Features:
 * - Photo/avatar in manga-style frame
 * - Bio text with clean typography
 * - Manga and anime inspirations list
 * - Panel reveal animation on scroll
 * - Responsive layout (stacked on mobile, side-by-side on desktop)
 * 
 * Requirements: 5.1, 5.2, 5.3
 * 
 * @param name - Person's name
 * @param bio - Brief biography text
 * @param avatarSrc - Path to avatar/photo image
 * @param inspirations - List of manga/anime inspirations
 */
export function IntroPanel({
  name,
  bio,
  avatarSrc,
  inspirations,
}: IntroPanelProps) {
  return (
    <MangaPanel>
      <div className="border-manga border-manga-black bg-manga-white p-4 md:p-6 shadow-manga">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 md:gap-6 lg:gap-8">
        {/* Avatar/Photo Section */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            {/* Manga-style frame */}
            <div className="relative border-manga border-manga-black bg-manga-white p-1.5 shadow-manga">
              <div className="relative w-48 h-48 overflow-hidden border-2 border-manga-black">
                <MangaImage
                  src={avatarSrc}
                  alt={`${name} - Portfolio Avatar`}
                  fill
                  sizes="(max-width: 768px) 192px, 250px"
                  className="object-cover grayscale"
                  wrapperClassName="absolute inset-0"
                  priority
                />
                {/* Halftone overlay effect */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                      backgroundSize: '4px 4px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio and Inspirations Section */}
        <div className="flex flex-col gap-4">
          {/* Name Header */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading uppercase tracking-wider mb-2">
              {name}
            </h2>
            <div className="h-1 w-20 bg-manga-black" />
          </div>

          {/* Bio Text */}
          <div className="space-y-4">
            <p className="text-base md:text-lg leading-relaxed text-manga-gray-800">
              {bio}
            </p>
          </div>

          {/* Inspirations Section */}
          <div>
            <h3 className="text-lg md:text-xl font-heading uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-manga-black" />
              Manga & Anime Inspirations
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {inspirations.map((inspiration, index) => (
                <span
                  key={index}
                  className={cn(
                    'inline-block border-2 border-manga-black bg-manga-gray-50 px-3 py-1',
                    'text-sm font-medium text-manga-black',
                    'hover:bg-manga-white hover:shadow-manga-sm transition-all duration-200'
                  )}
                >
                  {inspiration}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </MangaPanel>
  );
}
