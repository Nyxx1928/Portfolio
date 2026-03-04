import { InterestsPanel } from './InterestsPanel';
import { Interest } from '@/types';

/**
 * Example usage of the InterestsPanel component
 * 
 * This component displays personal interests organized by type:
 * - Manga favorites as trading cards with flip animation
 * - Anime favorites as trading cards with flip animation
 * - Hobbies with icons and descriptions
 */

// Example interests data
const exampleInterests: Interest[] = [
  // Manga
  {
    id: 'manga-1',
    title: 'One Piece',
    type: 'manga',
    image: '/images/interests/one-piece.jpg',
    description: 'Epic adventure story with incredible world-building and character development.',
    rating: 10,
  },
  {
    id: 'manga-2',
    title: 'Berserk',
    type: 'manga',
    image: '/images/interests/berserk.jpg',
    description: 'Dark fantasy masterpiece with stunning detailed artwork.',
    rating: 10,
  },
  {
    id: 'manga-3',
    title: 'Vagabond',
    type: 'manga',
    image: '/images/interests/vagabond.jpg',
    description: 'Beautiful ink wash artwork and philosophical storytelling.',
    rating: 9,
  },
  
  // Anime
  {
    id: 'anime-1',
    title: 'Cowboy Bebop',
    type: 'anime',
    image: '/images/interests/cowboy-bebop.jpg',
    description: 'Timeless classic with incredible style, music, and episodic storytelling.',
    rating: 10,
  },
  {
    id: 'anime-2',
    title: 'Steins;Gate',
    type: 'anime',
    image: '/images/interests/steins-gate.jpg',
    description: 'Mind-bending time travel story with perfect pacing and emotional payoff.',
    rating: 10,
  },
  {
    id: 'anime-3',
    title: 'Attack on Titan',
    type: 'anime',
    image: '/images/interests/aot.jpg',
    description: 'Epic scale storytelling with incredible animation and plot twists.',
    rating: 9,
  },
  
  // Hobbies
  {
    id: 'hobby-1',
    title: 'Digital Illustration',
    type: 'hobby',
    image: '/images/interests/illustration.jpg',
    description: 'Creating manga-style character art and experimenting with different brush techniques.',
  },
  {
    id: 'hobby-2',
    title: 'Collecting Manga',
    type: 'hobby',
    image: '/images/interests/manga-collection.jpg',
    description: 'Building a physical manga collection and studying panel layouts and visual storytelling.',
  },
  {
    id: 'hobby-3',
    title: 'Japanese Language',
    type: 'hobby',
    image: '/images/interests/japanese.jpg',
    description: 'Learning Japanese to read manga in its original form and understand cultural nuances.',
  },
];

export default function InterestsPanelExample() {
  return (
    <div className="min-h-screen bg-manga-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-heading uppercase tracking-wider mb-8">
          InterestsPanel Component Examples
        </h1>

        {/* Full Example */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4">
            Full Example (All Types)
          </h2>
          <InterestsPanel interests={exampleInterests} />
        </section>

        {/* Manga Only */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4">
            Manga Only
          </h2>
          <InterestsPanel
            interests={exampleInterests.filter((i) => i.type === 'manga')}
          />
        </section>

        {/* Anime Only */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4">
            Anime Only
          </h2>
          <InterestsPanel
            interests={exampleInterests.filter((i) => i.type === 'anime')}
          />
        </section>

        {/* Hobbies Only */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4">
            Hobbies Only
          </h2>
          <InterestsPanel
            interests={exampleInterests.filter((i) => i.type === 'hobby')}
          />
        </section>

        {/* Minimal Example */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4">
            Minimal Example (Few Items)
          </h2>
          <InterestsPanel
            interests={[
              exampleInterests[0],
              exampleInterests[3],
              exampleInterests[6],
            ]}
          />
        </section>

        {/* Empty State */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4">
            Empty State
          </h2>
          <InterestsPanel interests={[]} />
        </section>
      </div>
    </div>
  );
}
