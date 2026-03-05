'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/types';
import { MangaImage } from '@/components/ui/MangaImage';
import { MangaPanel } from '@/components/manga/MangaPanel';
import { ChapterHeader } from '@/components/manga/ChapterHeader';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { containerVariants, panelVariants } from '@/lib/animations/variants';
import { cn } from '@/lib/utils';

interface ProjectDetailProps {
  project: Project;
}

/**
 * ProjectDetail - Full project detail view component
 * 
 * Features:
 * - Full project description and information
 * - Screenshots displayed in comic panel layout
 * - Demo and repository links with manga button styling
 * - Challenges, learnings, and impact displayed as RPG-style "power stats"
 * - Back navigation to projects page
 * - Scroll-triggered panel animations for sequential reveal
 * 
 * Requirements: 12.1, 12.2, 12.3
 * 
 * @param project - The project data to display
 */
export function ProjectDetail({ project }: ProjectDetailProps) {
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation();
  const { ref: screenshotsRef, isInView: screenshotsInView } = useScrollAnimation();

  return (
    <div className="w-full">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          href="/projects"
          className={cn(
            'inline-flex items-center gap-2',
            'text-manga-black hover:text-manga-gray-800',
            'font-heading uppercase tracking-wider text-sm',
            'transition-colors duration-200'
          )}
        >
          <span aria-hidden="true">←</span>
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Project Header */}
      <ChapterHeader title={project.title} subtitle={project.description} />

      {/* Main Project Info Panel */}
      <MangaPanel variant="bordered" animation="reveal" className="mb-8">
        <div className="space-y-6">
          {/* Full Description */}
          <div>
            <h3 className="text-xl font-heading uppercase mb-3">About This Project</h3>
            <p className="text-manga-gray-800 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-heading uppercase mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    'px-3 py-1.5',
                    'border-2 border-manga-black',
                    'bg-manga-white',
                    'text-sm font-body',
                    'hover:bg-manga-black hover:text-manga-white',
                    'transition-colors duration-200'
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {(project.demoUrl || project.repoUrl) && (
            <div className="flex flex-wrap gap-4 pt-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="manga-button"
                >
                  View Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="manga-button-outline"
                >
                  View Code
                </a>
              )}
            </div>
          )}
        </div>
      </MangaPanel>

      {/* Screenshots Section - Comic Panel Layout */}
      {project.screenshots.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-heading uppercase mb-6 text-center">
            Project Showcase
          </h2>
          <motion.div
            ref={screenshotsRef}
            variants={containerVariants}
            initial="hidden"
            animate={screenshotsInView ? 'visible' : 'hidden'}
            className={cn(
              'grid gap-4',
              // Responsive grid: 1 col mobile, 2 cols tablet+
              'grid-cols-1 md:grid-cols-2',
              // Make first screenshot span full width if odd number
              project.screenshots.length % 2 !== 0 && '[&>*:first-child]:md:col-span-2'
            )}
          >
            {project.screenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot}
                variants={panelVariants}
                className={cn(
                  'relative overflow-hidden',
                  'border-manga border-manga-black',
                  'bg-manga-gray-50',
                  'shadow-manga',
                  'aspect-video',
                  'group'
                )}
              >
                {/* Screenshot Image */}
                <div className="relative w-full h-full">
                  <MangaImage
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    wrapperClassName="absolute inset-0"
                  />
                  {/* Halftone overlay on hover */}
                  <div
                    className={cn(
                      'absolute inset-0 opacity-0 group-hover:opacity-30',
                      'transition-opacity duration-300',
                      'halftone-overlay'
                    )}
                    aria-hidden="true"
                  />
                </div>
                {/* Panel number badge */}
                <div
                  className={cn(
                    'absolute top-2 right-2',
                    'w-8 h-8',
                    'flex items-center justify-center',
                    'bg-manga-black text-manga-white',
                    'font-heading text-sm',
                    'border-2 border-manga-white'
                  )}
                  aria-label={`Screenshot ${index + 1}`}
                >
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Power Stats Section - Challenges, Learnings, Impact */}
      <motion.div
        ref={statsRef}
        variants={containerVariants}
        initial="hidden"
        animate={statsInView ? 'visible' : 'hidden'}
        className="grid gap-6 md:grid-cols-3"
      >
        {/* Challenges */}
        <MangaPanel variant="bordered" animation="reveal" className="h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <div
                className={cn(
                  'w-10 h-10',
                  'flex items-center justify-center',
                  'bg-manga-black text-manga-white',
                  'font-heading text-xl'
                )}
                aria-hidden="true"
              >
                ⚔
              </div>
              <h3 className="text-xl font-heading uppercase">Challenges</h3>
            </div>
            <ul className="space-y-3 flex-1">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex gap-3">
                  <span
                    className="text-manga-black font-heading text-sm mt-1"
                    aria-hidden="true"
                  >
                    ▸
                  </span>
                  <span className="text-manga-gray-800 text-sm leading-relaxed">
                    {challenge}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </MangaPanel>

        {/* Learnings */}
        <MangaPanel variant="bordered" animation="reveal" className="h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <div
                className={cn(
                  'w-10 h-10',
                  'flex items-center justify-center',
                  'bg-manga-black text-manga-white',
                  'font-heading text-xl'
                )}
                aria-hidden="true"
              >
                ★
              </div>
              <h3 className="text-xl font-heading uppercase">Learnings</h3>
            </div>
            <ul className="space-y-3 flex-1">
              {project.learnings.map((learning, index) => (
                <li key={index} className="flex gap-3">
                  <span
                    className="text-manga-black font-heading text-sm mt-1"
                    aria-hidden="true"
                  >
                    ▸
                  </span>
                  <span className="text-manga-gray-800 text-sm leading-relaxed">
                    {learning}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </MangaPanel>

        {/* Impact */}
        <MangaPanel variant="bordered" animation="reveal" className="h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <div
                className={cn(
                  'w-10 h-10',
                  'flex items-center justify-center',
                  'bg-manga-black text-manga-white',
                  'font-heading text-xl'
                )}
                aria-hidden="true"
              >
                ⚡
              </div>
              <h3 className="text-xl font-heading uppercase">Impact</h3>
            </div>
            <div className="space-y-4 flex-1">
              {project.impact.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-body text-manga-gray-600 uppercase tracking-wide">
                      {stat.metric}
                    </span>
                    <span className="text-xl font-heading text-manga-black">
                      {stat.value}
                    </span>
                  </div>
                  {/* Power stat bar */}
                  <div className="stat-bar">
                    <motion.div
                      className="stat-bar-fill"
                      initial={{ width: 0 }}
                      animate={statsInView ? { width: '100%' } : { width: 0 }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MangaPanel>
      </motion.div>

      {/* Bottom Navigation */}
      <div className="mt-12 text-center">
        <Link href="/projects" className="manga-button">
          View All Projects
        </Link>
      </div>
    </div>
  );
}
