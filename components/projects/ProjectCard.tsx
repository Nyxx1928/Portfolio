'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Project } from '@/types';
import { HalftonePattern } from '@/components/manga/HalftonePattern';
import { cardHoverVariants } from '@/lib/animations/variants';

/**
 * ProjectCard Component
 * 
 * Individual project card displayed in manga panel style.
 * Features hover effects and navigation to project detail page.
 * 
 * Features:
 * - Manga panel container with border styling
 * - Thumbnail image with halftone overlay
 * - Title, description, and tech stack badges
 * - Hover panel flip animation
 * - Click navigation to detail page
 * - Staggered entrance animation (handled by parent)
 * 
 * Requirements: 9.2, 9.3, 9.4, 22.1
 */

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
      className="
        manga-panel-bordered
        h-full
        cursor-pointer
        transition-shadow
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-manga-black
        focus:ring-offset-2
      "
      data-testid={`project-card-${project.id}`}
    >
      <div className="space-y-4">
        {/* Thumbnail with halftone overlay */}
        <div className="relative w-full h-48 overflow-hidden border-manga border-manga-black bg-manga-gray-200">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <HalftonePattern intensity="light" className="z-10" />
          
          {/* Category badge overlay */}
          <div className="absolute top-2 right-2 z-20">
            <span className="
              px-2 py-1 
              text-xs 
              font-heading 
              uppercase 
              bg-manga-black 
              text-manga-white
              border border-manga-black
            ">
              {project.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-xl font-heading uppercase line-clamp-2">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-manga-gray-600 text-sm line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="
                  px-2 py-1 
                  text-xs 
                  border border-manga-black 
                  bg-manga-gray-50 
                  font-mono
                  transition-colors
                  hover:bg-manga-black
                  hover:text-manga-white
                "
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 text-xs text-manga-gray-600 font-mono">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
