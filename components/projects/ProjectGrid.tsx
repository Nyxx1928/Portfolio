'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { containerVariants, panelVariants } from '@/lib/animations/variants';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

interface ProjectGridProps {
  projects: Project[];
  currentCategory?: string | null;
}

export function ProjectGrid({ projects, currentCategory }: ProjectGridProps) {
  const { ref: scrollRef, isInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [collected, setCollected] = useState(0);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = gridRef.current;
    if (!root || projects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            const observed = root.querySelectorAll<HTMLElement>('[data-collected="true"]');
            (entry.target as HTMLElement).setAttribute('data-collected', 'true');
            setCollected(observed.length + 1);
          }
        }
      },
      { threshold: 0.3 }
    );

    const cards = root.querySelectorAll<HTMLElement>('[data-collection-id]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="border-[3px] border-manga-black bg-manga-white relative shadow-manga p-8">
            <h3 className="text-2xl font-heading mb-4 uppercase">No Projects Found</h3>
            <p className="text-manga-gray-600">
              No projects match the current filter. Try selecting a different category!
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const total = projects.length;
  const filled = '▰'.repeat(collected);
  const empty = '▱'.repeat(Math.max(0, total - collected));

  return (
    <div ref={gridRef}>
      <div className="mb-6 border border-manga-black bg-manga-white p-3 shadow-manga-sm">
        <p className="text-xs font-heading uppercase tracking-wider mb-1">
          Cards Collected: {collected} / {total}
        </p>
        <div className="text-sm tracking-wide text-manga-gray-800" aria-hidden="true">
          <span className="text-manga-black">{filled}</span>
          <span className="text-manga-gray-400">{empty}</span>
        </div>
      </div>

      <motion.div
        ref={scrollRef}
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
            data-collection-id={project.id}
          >
            <ProjectCard project={project} index={index} currentCategory={currentCategory} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
