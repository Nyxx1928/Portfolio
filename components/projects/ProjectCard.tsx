'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { TradingCardFront } from './TradingCardFront';
import { TradingCardBack } from './TradingCardBack';

interface ProjectCardProps {
  project: Project;
  index: number;
  currentCategory?: string | null;
}

export function ProjectCard({ project, currentCategory }: ProjectCardProps) {
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    if (currentCategory && currentCategory !== 'all') {
      const detailParams = new URLSearchParams({ category: currentCategory });
      router.push(`/projects/${project.slug}?${detailParams.toString()}`);
      return;
    }

    router.push(`/projects/${project.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="perspective-1000 h-full"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
      data-testid={`project-card-${project.id}`}
    >
      <motion.div
        className="relative preserve-3d cursor-pointer h-full"
        animate={prefersReducedMotion ? { rotateY: 0 } : { rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
      >
        <div className="relative h-full backface-hidden border-[3px] border-manga-black bg-manga-white p-4 shadow-manga">
          <TradingCardFront project={project} />
        </div>

        <TradingCardBack project={project} />
      </motion.div>
    </div>
  );
}
