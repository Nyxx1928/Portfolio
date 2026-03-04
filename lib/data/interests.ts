import { Interest } from '@/types';

/**
 * Interests data for the manga portfolio website
 * 
 * This file contains personal interests organized by type:
 * - Manga: Favorite manga series with trading card-style display
 * - Anime: Favorite anime series with trading card-style display
 * - Hobby: Personal hobbies and activities
 * 
 * Each manga/anime entry includes:
 * - title: Name of the series
 * - image: Cover art or promotional image
 * - description: Brief description or why it's a favorite
 * - rating: Personal rating (optional, 1-10 scale)
 * 
 * These are displayed in the About page interests section
 * with trading card-style elements and hover flip animations.
 */

export const interests: Interest[] = [
  // Manga Favorites
  {
    id: 'manga-1',
    title: 'One Piece',
    type: 'manga',
    image: '/images/interests/one-piece.jpg',
    description: 'Epic adventure story with incredible world-building and character development. The art style and panel composition are masterful.',
    rating: 10,
  },
  {
    id: 'manga-2',
    title: 'Berserk',
    type: 'manga',
    image: '/images/interests/berserk.jpg',
    description: 'Dark fantasy masterpiece with stunning detailed artwork. The use of shadows and dramatic compositions is inspiring.',
    rating: 10,
  },
  {
    id: 'manga-3',
    title: 'Vagabond',
    type: 'manga',
    image: '/images/interests/vagabond.jpg',
    description: 'Beautiful ink wash artwork and philosophical storytelling. The visual style heavily influenced this portfolio design.',
    rating: 9,
  },
  {
    id: 'manga-4',
    title: 'Monster',
    type: 'manga',
    image: '/images/interests/monster.jpg',
    description: 'Psychological thriller with incredible pacing and panel layouts. Master class in visual storytelling.',
    rating: 9,
  },
  {
    id: 'manga-5',
    title: 'Fullmetal Alchemist',
    type: 'manga',
    image: '/images/interests/fma.jpg',
    description: 'Perfect blend of action, humor, and emotional depth. Excellent use of manga visual effects and speed lines.',
    rating: 10,
  },
  {
    id: 'manga-6',
    title: 'Death Note',
    type: 'manga',
    image: '/images/interests/death-note.jpg',
    description: 'Brilliant psychological cat-and-mouse game with dramatic panel compositions and intense close-ups.',
    rating: 9,
  },

  // Anime Favorites
  {
    id: 'anime-1',
    title: 'Cowboy Bebop',
    type: 'anime',
    image: '/images/interests/cowboy-bebop.jpg',
    description: 'Timeless classic with incredible style, music, and episodic storytelling. The aesthetic is unmatched.',
    rating: 10,
  },
  {
    id: 'anime-2',
    title: 'Steins;Gate',
    type: 'anime',
    image: '/images/interests/steins-gate.jpg',
    description: 'Mind-bending time travel story with perfect pacing and emotional payoff. Masterful character development.',
    rating: 10,
  },
  {
    id: 'anime-3',
    title: 'Attack on Titan',
    type: 'anime',
    image: '/images/interests/aot.jpg',
    description: 'Epic scale storytelling with incredible animation and plot twists. The action sequences are breathtaking.',
    rating: 9,
  },
  {
    id: 'anime-4',
    title: 'Mob Psycho 100',
    type: 'anime',
    image: '/images/interests/mob-psycho.jpg',
    description: 'Unique art style and animation with heartfelt themes. The visual creativity is inspiring for web design.',
    rating: 9,
  },
  {
    id: 'anime-5',
    title: 'Samurai Champloo',
    type: 'anime',
    image: '/images/interests/samurai-champloo.jpg',
    description: 'Stylish blend of samurai action and hip-hop culture. The visual direction and editing are phenomenal.',
    rating: 9,
  },
  {
    id: 'anime-6',
    title: 'Made in Abyss',
    type: 'anime',
    image: '/images/interests/made-in-abyss.jpg',
    description: 'Beautiful world-building with stunning backgrounds and emotional storytelling. The art direction is incredible.',
    rating: 9,
  },

  // Hobbies
  {
    id: 'hobby-1',
    title: 'Digital Illustration',
    type: 'hobby',
    image: '/images/interests/illustration.jpg',
    description: 'Creating manga-style character art and experimenting with different brush techniques and compositions.',
  },
  {
    id: 'hobby-2',
    title: 'Collecting Manga',
    type: 'hobby',
    image: '/images/interests/manga-collection.jpg',
    description: 'Building a physical manga collection and studying panel layouts, page composition, and visual storytelling techniques.',
  },
  {
    id: 'hobby-3',
    title: 'Japanese Language',
    type: 'hobby',
    image: '/images/interests/japanese.jpg',
    description: 'Learning Japanese to read manga in its original form and better understand cultural nuances in storytelling.',
  },
  {
    id: 'hobby-4',
    title: 'Mechanical Keyboards',
    type: 'hobby',
    image: '/images/interests/keyboards.jpg',
    description: 'Building and customizing mechanical keyboards. The tactile experience enhances the coding workflow.',
  },
  {
    id: 'hobby-5',
    title: 'Photography',
    type: 'hobby',
    image: '/images/interests/photography.jpg',
    description: 'Street and urban photography with focus on composition, lighting, and capturing decisive moments.',
  },
  {
    id: 'hobby-6',
    title: 'Gaming',
    type: 'hobby',
    image: '/images/interests/gaming.jpg',
    description: 'Playing story-driven games and JRPGs. Analyzing game UI/UX design and interactive storytelling techniques.',
  },
];

/**
 * Get all interests
 */
export function getInterests(): Interest[] {
  return interests;
}

/**
 * Get interests by type
 */
export function getInterestsByType(type: Interest['type']): Interest[] {
  return interests.filter(interest => interest.type === type);
}

/**
 * Get manga interests
 */
export function getMangaInterests(): Interest[] {
  return getInterestsByType('manga');
}

/**
 * Get anime interests
 */
export function getAnimeInterests(): Interest[] {
  return getInterestsByType('anime');
}

/**
 * Get hobby interests
 */
export function getHobbyInterests(): Interest[] {
  return getInterestsByType('hobby');
}

/**
 * Get top-rated interests (for manga/anime with ratings)
 */
export function getTopRatedInterests(limit: number = 5): Interest[] {
  return [...interests]
    .filter(interest => interest.rating !== undefined)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

/**
 * Get a single interest by id
 */
export function getInterestById(id: string): Interest | undefined {
  return interests.find(interest => interest.id === id);
}

/**
 * Get random interests (for variety in display)
 */
export function getRandomInterests(count: number = 3): Interest[] {
  const shuffled = [...interests].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
