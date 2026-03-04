/**
 * FeaturedProjects Component Examples
 * 
 * This file demonstrates the usage of the FeaturedProjects component
 * on the Dashboard page.
 */

import { FeaturedProjects } from './FeaturedProjects';

/**
 * Example 1: Basic Usage
 * 
 * The FeaturedProjects component automatically fetches and displays
 * featured projects from the projects data file. It requires no props.
 */
export function BasicExample() {
  return (
    <div className="min-h-screen bg-manga-white">
      <FeaturedProjects />
    </div>
  );
}

/**
 * Example 2: Within Dashboard Page Layout
 * 
 * Shows how FeaturedProjects is typically used within the Dashboard page,
 * positioned below the HeroSection.
 */
export function DashboardLayoutExample() {
  return (
    <main className="min-h-screen">
      {/* Hero section would be here */}
      <div className="h-screen bg-manga-gray-50 flex items-center justify-center">
        <h1 className="font-heading text-4xl">Hero Section</h1>
      </div>
      
      {/* Featured Projects Section */}
      <FeaturedProjects />
    </main>
  );
}

/**
 * Example 3: Responsive Behavior
 * 
 * The component automatically adjusts its layout based on screen size:
 * - Mobile (< 640px): 1 column
 * - Desktop (>= 1024px): 2-3 columns depending on number of featured projects
 * 
 * Features:
 * - "New Chapter" section divider using ChapterHeader
 * - 2-3 featured project cards in manga panels
 * - Hover reveal animations (scale, shadow, overlay)
 * - Click navigation to project detail pages
 * - Tech stack badges with hover effects
 * - "View All Projects" button at the bottom
 */
export function ResponsiveExample() {
  return (
    <div className="min-h-screen bg-manga-white">
      <div className="mb-8 p-4 bg-manga-gray-50 border-2 border-manga-black">
        <h2 className="font-heading text-2xl mb-2">Responsive Behavior:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Mobile: Single column layout</li>
          <li>Desktop: 2-3 columns based on number of featured projects</li>
          <li>Hover effects: Scale, shadow, and overlay animations</li>
          <li>Click to navigate to project detail page</li>
        </ul>
      </div>
      
      <FeaturedProjects />
    </div>
  );
}

/**
 * Key Features:
 * 
 * 1. Section Divider (Requirement 4.3)
 *    - Uses ChapterHeader component with "Featured Work" title
 *    - Displays "New Chapter" subtitle
 * 
 * 2. Featured Projects Display (Requirements 4.1, 4.2)
 *    - Displays 2-3 featured projects from data
 *    - Each project rendered as a MangaPanel card
 * 
 * 3. Hover Animations
 *    - Card scales up slightly on hover
 *    - Shadow increases (manga-hover effect)
 *    - Overlay appears with "View Project →" text
 *    - Tech stack badges change color
 * 
 * 4. Click Navigation (Requirement 4.4)
 *    - Entire card is clickable
 *    - Navigates to /projects/[slug] detail page
 * 
 * 5. Responsive Grid (Requirements 17.1, 19.1)
 *    - Mobile: 1 column (grid-cols-1)
 *    - Desktop: 2-3 columns (lg:grid-cols-2 or lg:grid-cols-3)
 * 
 * 6. Content Display
 *    - Project thumbnail with halftone overlay
 *    - Project title (heading)
 *    - Project description (truncated to 3 lines)
 *    - Tech stack badges (first 4 + count of remaining)
 * 
 * 7. Animations
 *    - Staggered entrance animation for cards
 *    - Scroll-triggered reveal using Framer Motion
 *    - Smooth transitions on hover
 */
