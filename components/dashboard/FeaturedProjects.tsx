'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChapterHeader } from '@/components/manga/ChapterHeader';
import { MangaPanel } from '@/components/manga/MangaPanel';
import { getFeaturedProjects } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

/**
 * FeaturedProjects - Displays featured projects on the Dashboard page
 * 
 * Features:
 * - "New Chapter" section divider using ChapterHeader
 * - 2-3 featured project cards in manga panels
 * - Hover reveal animations
 * - Click navigation to project detail pages
 * - Responsive grid (1 col mobile, 2-3 cols desktop)
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 17.1, 19.1
 */
export function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* "New Chapter" section divider - Requirement 4.3 */}
        <ChapterHeader title="Featured Work" subtitle="New Chapter" />

        {/* Featured projects grid - Requirements 4.1, 4.2, 17.1, 19.1 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={cn(
            'grid gap-6 sm:gap-8',
            // Mobile: 1 column (Requirement 17.1)
            'grid-cols-1',
            // Desktop: 2-3 columns depending on number of projects (Requirement 19.1)
            'lg:grid-cols-2',
            featuredProjects.length === 3 && 'lg:grid-cols-3'
          )}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              {/* Project card as Link for navigation - Requirement 4.4 */}
              <Link
                href={`/projects/${project.slug}`}
                className="block h-full group"
              >
                <MangaPanel
                  variant="bordered"
                  animation="reveal"
                  className={cn(
                    'h-full transition-all duration-300',
                    // Hover reveal animation - scale and shadow
                    'group-hover:scale-[1.02] group-hover:shadow-manga-hover',
                    'group-hover:-translate-x-1 group-hover:-translate-y-1',
                    'cursor-pointer'
                  )}
                >
                  {/* Project thumbnail with halftone overlay */}
                  <div className="relative w-full aspect-video mb-4 overflow-hidden border-2 border-manga-black">
                    {/* Placeholder for project thumbnail */}
                    <div className="w-full h-full bg-manga-gray-200 flex items-center justify-center">
                      <span className="text-4xl font-heading text-manga-gray-600">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    
                    {/* Halftone overlay effect */}
                    <div className="halftone-overlay" />
                    
                    {/* Hover overlay with "View Project" text */}
                    <div
                      className={cn(
                        'absolute inset-0 bg-manga-black/80',
                        'flex items-center justify-center',
                        'opacity-0 group-hover:opacity-100',
                        'transition-opacity duration-300'
                      )}
                    >
                      <span className="text-manga-white font-heading text-xl uppercase tracking-wider">
                        View Project →
                      </span>
                    </div>
                  </div>

                  {/* Project title */}
                  <h3
                    className={cn(
                      'font-heading uppercase text-xl sm:text-2xl',
                      'text-manga-black mb-2',
                      'tracking-wider'
                    )}
                  >
                    {project.title}
                  </h3>

                  {/* Project description */}
                  <p className="text-manga-gray-800 text-sm sm:text-base mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          'px-3 py-1 text-xs sm:text-sm',
                          'border border-manga-black',
                          'bg-manga-gray-50',
                          'font-mono uppercase',
                          'transition-colors duration-300',
                          'group-hover:bg-manga-black group-hover:text-manga-white'
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span
                        className={cn(
                          'px-3 py-1 text-xs sm:text-sm',
                          'border border-manga-black',
                          'bg-manga-gray-50',
                          'font-mono',
                          'transition-colors duration-300',
                          'group-hover:bg-manga-black group-hover:text-manga-white'
                        )}
                      >
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </MangaPanel>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all projects link */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/projects"
            className={cn(
              'inline-block manga-button',
              'text-sm sm:text-base'
            )}
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
