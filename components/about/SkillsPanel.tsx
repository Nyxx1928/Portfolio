'use client';

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
    <div className="border-manga border-manga-black bg-manga-white p-6 md:p-8 shadow-manga">
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
    </div>
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
  // Removed scroll animation for debugging
  return (
    <div className="space-y-1">
      {/* Skill name and level */}
      <div className="flex items-center justify-between text-sm md:text-base">
        {skill.icon && <span className="text-lg">{skill.icon}</span>}
        <span className="font-medium text-manga-black">{skill.name}</span>
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
        {/* Static fill bar for debug */}
        <div
          className="absolute inset-y-0 left-0 bg-manga-black"
          style={{ width: `${skill.level}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function ToolBadges({ tools }: { tools: Tool[] }) {
  // All animation and scroll logic removed for debug
  // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        <div key={category}>
          <h4 className="text-sm font-medium text-manga-gray-600 uppercase tracking-wide mb-2">
            {category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {categoryTools.map((tool) => (
              <div
                key={tool.name}
                className={cn(
                  'relative border-2 border-manga-black bg-manga-gray-50 px-3 py-1.5',
                  'hover:bg-manga-white hover:shadow-manga transition-all duration-200',
                  'hover:-translate-x-0.5 hover:-translate-y-0.5'
                )}
              >
                <span className="text-sm font-medium text-manga-black">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * ToolBadges - Display tools as manga-style badges
 */

