'use client';

import { MangaPanel } from '@/components/manga/MangaPanel';
import { MangaImage } from '@/components/ui/MangaImage';
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
      <div className="border-manga border-manga-black bg-manga-white p-6 md:p-8 shadow-manga">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:gap-8 lg:gap-12">
        {/* Avatar/Photo Section */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            {/* Manga-style frame */}
            <div className="relative border-manga border-manga-black bg-manga-white p-2 shadow-manga">
              <div className="relative w-64 h-64 overflow-hidden border-2 border-manga-black">
                <MangaImage
                  src={avatarSrc}
                  alt={`${name} - Portfolio Avatar`}
                  fill
                  sizes="(max-width: 768px) 256px, 300px"
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
            
            {/* Corner accent marks (manga panel style) */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-manga-black" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-manga-black" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-manga-black" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-manga-black" />
          </div>
        </div>

        {/* Bio and Inspirations Section */}
        <div className="flex flex-col gap-6">
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
          <div className="mt-4">
            <h3 className="text-xl md:text-2xl font-heading uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-manga-black" />
              Manga & Anime Inspirations
            </h3>
            
            {/* Inspirations list in manga style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inspirations.map((inspiration, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative border-2 border-manga-black bg-manga-gray-50 px-4 py-2',
                    'hover:bg-manga-white hover:shadow-manga transition-all duration-200',
                    'hover:-translate-x-0.5 hover:-translate-y-0.5'
                  )}
                >
                  {/* Speech bubble tail effect */}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-manga-black" />
                  
                  <p className="text-sm md:text-base font-medium text-manga-black">
                    {inspiration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </MangaPanel>
  );
}
