'use client';

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
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
      data-testid={`project-card-${project.id}`}
    >
      <motion.div
        className="relative preserve-3d cursor-pointer h-full"
        whileHover={prefersReducedMotion ? undefined : { rotateY: 180 }}
        transition={{ duration: 0.5 }}
        style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
      >
        <div className="trading-card h-full backface-hidden">
          <TradingCardFront project={project} />
        </div>

        <TradingCardBack project={project} />
      </motion.div>
    </div>
  );
}
