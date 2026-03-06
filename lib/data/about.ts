/**
 * About page data for the manga portfolio website
 * 
 * This file contains personal information displayed on the About page:
 * - Name and bio for the IntroPanel
 * - Avatar/photo path
 * - Manga and anime inspirations
 * 
 * This data is used by the IntroPanel component to display
 * the introduction section with photo, bio, and inspirations.
 */

export interface AboutData {
  name: string;
  bio: string;
  avatarSrc: string;
  inspirations: string[];
}

export const aboutData: AboutData = {
  name: 'Nics Pakluma',
  bio: 'A passionate developer and manga enthusiast who combines technical expertise with creative storytelling. Inspired by the visual language of manga, I create immersive web experiences that blend modern technology with classic comic art aesthetics. My work focuses on building engaging, accessible, and visually striking applications that tell a story.',
  avatarSrc: '/images/profile2.jpg',
  inspirations: [
    'Tokyo Ghoul',
    'Ajin: Demi human',
    'Parasyte',
    'Death Note',
    'Charlotte',
    'Hello World',
    'Plunderer',
    'Goblin Slayer',
  ],
};

/**
 * Get about data
 */
export function getAboutData(): AboutData {
  return aboutData;
}

/**
 * Get manga/anime inspirations only
 */
export function getInspirations(): string[] {
  return aboutData.inspirations;
}

/**
 * Get bio text only
 */
export function getBio(): string {
  return aboutData.bio;
}
