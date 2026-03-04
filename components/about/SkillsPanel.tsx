'use client';

import { motion } from 'framer-motion';
import { MangaPanel } from '@/components/manga/MangaPanel';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { Skill, Tool } from '@/types';
import { cn } from '@/lib/utils';

interface SkillsPanelProps {
  skills: Skill[];
  tools: Tool[];
}

/**
 * SkillsPanel - Technical skills display with RPG-style stat bars
 * 
 * Features:
 * - RPG-style stat bars with animated fill on scroll
 * - Skills grouped by category (frontend, backend, design, tools, other)
 * - Tools displayed as badges
 * - Responsive layout
 * 
 * Requirements: 6.1, 6.2, 6.3
 * 
 * @param skills - Array of skills to display
 * @param tools - Array of tools/technologies to display
 */
export function SkillsPanel({ skills, tools }: SkillsPanelProps) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Category display names
  const categoryNames: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    design: 'Design',
    tools: 'Tools',
    other: 'Other',
  };

  // Category order
  const categoryOrder = ['frontend', 'backend', 'design', 'tools', 'other'];

  return (
    <MangaPanel variant="bordered" animation="reveal" className="overflow-hidden">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl md:text-4xl font-heading uppercase tracking-wider mb-2">
            Skills & Abilities
          </h2>
          <div className="h-1 w-20 bg-manga-black" />
        </div>

        {/* Skills by Category */}
        <div className="space-y-8">
          {categoryOrder.map((category) => {
            const categorySkills = groupedSkills[category];
            if (!categorySkills || categorySkills.length === 0) return null;

            return (
              <SkillCategory
                key={category}
                title={categoryNames[category]}
                skills={categorySkills}
              />
            );
          })}
        </div>

        {/* Tools Section */}
        {tools.length > 0 && (
          <div className="pt-4 border-t-2 border-manga-black">
            <h3 className="text-xl md:text-2xl font-heading uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-manga-black" />
              Tools & Technologies
            </h3>
            <ToolBadges tools={tools} />
          </div>
        )}
      </div>
    </MangaPanel>
  );
}

/**
 * SkillCategory - Displays a category of skills with stat bars
 */
function SkillCategory({ title, skills }: { title: string; skills: Skill[] }) {
  return (
    <div>
      <h3 className="text-xl md:text-2xl font-heading uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-manga-black" />
        {title}
      </h3>
      <div className="space-y-3">
        {skills.map((skill) => (
          <SkillStatBar key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}

/**
 * SkillStatBar - RPG-style stat bar with animated fill
 */
function SkillStatBar({ skill }: { skill: Skill }) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.5 });

  return (
    <div ref={ref} className="space-y-1">
      {/* Skill name and level */}
      <div className="flex items-center justify-between text-sm md:text-base">
        <div className="flex items-center gap-2">
          {skill.icon && <span className="text-lg">{skill.icon}</span>}
          <span className="font-medium text-manga-black">{skill.name}</span>
        </div>
        <span className="font-mono text-manga-gray-600 tabular-nums">
          {skill.level}/100
        </span>
      </div>

      {/* Stat bar container */}
      <div className="relative h-6 border-2 border-manga-black bg-manga-white overflow-hidden">
        {/* Background pattern (manga halftone effect) */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '4px 4px',
          }}
        />

        {/* Animated fill bar */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-manga-black"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${skill.level}%` : 0 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1,
          }}
        >
          {/* Inner highlight effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        {/* Speed lines effect (manga style) */}
        <motion.div
          className="absolute inset-y-0 left-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? [0, 1, 0] : 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.1,
          }}
        >
          <div className="h-full flex items-center gap-1 px-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-0.5 bg-white"
                style={{
                  width: `${20 - i * 5}px`,
                  opacity: 0.8 - i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * ToolBadges - Display tools as manga-style badges
 */
function ToolBadges({ tools }: { tools: Tool[] }) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3 });

  // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  return (
    <div ref={ref} className="space-y-4">
      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        <div key={category}>
          <h4 className="text-sm font-medium text-manga-gray-600 uppercase tracking-wide mb-2">
            {category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {categoryTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: isInView ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: 'easeOut',
                }}
                className={cn(
                  'relative border-2 border-manga-black bg-manga-gray-50 px-3 py-1.5',
                  'hover:bg-manga-white hover:shadow-manga transition-all duration-200',
                  'hover:-translate-x-0.5 hover:-translate-y-0.5'
                )}
              >
                <span className="text-sm font-medium text-manga-black">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
