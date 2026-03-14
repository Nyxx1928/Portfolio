'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { containerVariants, panelVariants } from '@/lib/animations/variants';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

/**
 * ProjectGrid Component
 * 
 * Responsive grid container for displaying projects in manga panel style.
 * Features sequential reveal animation and empty state handling.
 * 
 * Features:
 * - Responsive grid (1 col mobile, 2 col tablet, 3+ col desktop)
 * - Sequential reveal animation on load
 * - Empty state for filtered results
 * - Manga panel-style layout
 * 
 * Requirements: 9.1, 11.2, 17.1, 18.1, 19.1
 */

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Empty state when no projects provided
  if (projects.length === 0) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="manga-panel-bordered p-8">
            <h3 className="text-2xl font-heading mb-4 uppercase">No Projects Found</h3>
            <p className="text-manga-gray-600">
              No projects match the current filter. Try selecting a different category!
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      role="region"
      aria-label="Projects grid"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={panelVariants}
          custom={index}
          className="h-full"
        >
          <ProjectCard project={project} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
