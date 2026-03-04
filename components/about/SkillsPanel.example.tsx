import { SkillsPanel } from './SkillsPanel';
import { Skill, Tool } from '@/types';

/**
 * Example usage of SkillsPanel component
 * 
 * This file demonstrates various configurations and use cases
 * for the SkillsPanel component with RPG-style stat bars.
 */

// Sample skills data
const sampleSkills: Skill[] = [
  // Frontend Skills
  {
    id: 'skill-1',
    name: 'React',
    level: 95,
    category: 'frontend',
    icon: '⚛️',
  },
  {
    id: 'skill-2',
    name: 'Next.js',
    level: 90,
    category: 'frontend',
    icon: '▲',
  },
  {
    id: 'skill-3',
    name: 'TypeScript',
    level: 92,
    category: 'frontend',
    icon: '📘',
  },
  {
    id: 'skill-4',
    name: 'Tailwind CSS',
    level: 88,
    category: 'frontend',
    icon: '💨',
  },

  // Backend Skills
  {
    id: 'skill-5',
    name: 'Node.js',
    level: 85,
    category: 'backend',
    icon: '🟢',
  },
  {
    id: 'skill-6',
    name: 'PostgreSQL',
    level: 80,
    category: 'backend',
    icon: '🐘',
  },
  {
    id: 'skill-7',
    name: 'REST APIs',
    level: 90,
    category: 'backend',
    icon: '🔌',
  },

  // Design Skills
  {
    id: 'skill-8',
    name: 'Figma',
    level: 88,
    category: 'design',
    icon: '🎨',
  },
  {
    id: 'skill-9',
    name: 'UI/UX Design',
    level: 85,
    category: 'design',
    icon: '✨',
  },

  // Tools
  {
    id: 'skill-10',
    name: 'Git',
    level: 92,
    category: 'tools',
    icon: '🔀',
  },
  {
    id: 'skill-11',
    name: 'VS Code',
    level: 95,
    category: 'tools',
    icon: '💻',
  },

  // Other
  {
    id: 'skill-12',
    name: 'Agile/Scrum',
    level: 88,
    category: 'other',
    icon: '🔄',
  },
];

const sampleTools: Tool[] = [
  { name: 'Vercel', category: 'Deployment' },
  { name: 'AWS', category: 'Cloud Services' },
  { name: 'Firebase', category: 'Backend Services' },
  { name: 'Stripe', category: 'Payment Processing' },
  { name: 'Supabase', category: 'Backend Services' },
  { name: 'Netlify', category: 'Deployment' },
  { name: 'Postman', category: 'API Testing' },
  { name: 'Storybook', category: 'Component Development' },
];

/**
 * Example 1: Full SkillsPanel with all categories
 */
export function FullSkillsPanel() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SkillsPanel skills={sampleSkills} tools={sampleTools} />
    </div>
  );
}

/**
 * Example 2: SkillsPanel with frontend skills only
 */
export function FrontendOnlySkillsPanel() {
  const frontendSkills = sampleSkills.filter(skill => skill.category === 'frontend');
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SkillsPanel skills={frontendSkills} tools={[]} />
    </div>
  );
}

/**
 * Example 3: SkillsPanel without tools
 */
export function SkillsPanelWithoutTools() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SkillsPanel skills={sampleSkills} tools={[]} />
    </div>
  );
}

/**
 * Example 4: SkillsPanel with minimal skills
 */
export function MinimalSkillsPanel() {
  const minimalSkills: Skill[] = [
    {
      id: 'skill-1',
      name: 'React',
      level: 95,
      category: 'frontend',
      icon: '⚛️',
    },
    {
      id: 'skill-2',
      name: 'Node.js',
      level: 85,
      category: 'backend',
      icon: '🟢',
    },
    {
      id: 'skill-3',
      name: 'Figma',
      level: 88,
      category: 'design',
      icon: '🎨',
    },
  ];

  const minimalTools: Tool[] = [
    { name: 'Vercel', category: 'Deployment' },
    { name: 'GitHub', category: 'Version Control' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <SkillsPanel skills={minimalSkills} tools={minimalTools} />
    </div>
  );
}

/**
 * Example 5: SkillsPanel with varying skill levels
 */
export function VaryingLevelsSkillsPanel() {
  const varyingSkills: Skill[] = [
    {
      id: 'skill-1',
      name: 'Expert Level',
      level: 100,
      category: 'frontend',
      icon: '🌟',
    },
    {
      id: 'skill-2',
      name: 'Advanced Level',
      level: 85,
      category: 'frontend',
      icon: '⭐',
    },
    {
      id: 'skill-3',
      name: 'Intermediate Level',
      level: 60,
      category: 'frontend',
      icon: '✨',
    },
    {
      id: 'skill-4',
      name: 'Beginner Level',
      level: 30,
      category: 'frontend',
      icon: '💫',
    },
    {
      id: 'skill-5',
      name: 'Learning',
      level: 10,
      category: 'frontend',
      icon: '🌱',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <SkillsPanel skills={varyingSkills} tools={[]} />
    </div>
  );
}

/**
 * Example 6: SkillsPanel without icons
 */
export function SkillsPanelWithoutIcons() {
  const skillsWithoutIcons: Skill[] = [
    {
      id: 'skill-1',
      name: 'React',
      level: 95,
      category: 'frontend',
    },
    {
      id: 'skill-2',
      name: 'Node.js',
      level: 85,
      category: 'backend',
    },
    {
      id: 'skill-3',
      name: 'Figma',
      level: 88,
      category: 'design',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <SkillsPanel skills={skillsWithoutIcons} tools={sampleTools} />
    </div>
  );
}

/**
 * Example 7: Multiple SkillsPanels in a page
 */
export function MultipleSkillsPanels() {
  const technicalSkills = sampleSkills.filter(
    skill => skill.category === 'frontend' || skill.category === 'backend'
  );
  
  const softSkills: Skill[] = [
    {
      id: 'soft-1',
      name: 'Communication',
      level: 90,
      category: 'other',
      icon: '💬',
    },
    {
      id: 'soft-2',
      name: 'Leadership',
      level: 85,
      category: 'other',
      icon: '👥',
    },
    {
      id: 'soft-3',
      name: 'Problem Solving',
      level: 92,
      category: 'other',
      icon: '🧩',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <SkillsPanel skills={technicalSkills} tools={sampleTools} />
      <SkillsPanel skills={softSkills} tools={[]} />
    </div>
  );
}

/**
 * Example 8: SkillsPanel in dark background
 */
export function SkillsPanelDarkBackground() {
  return (
    <div className="min-h-screen bg-manga-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <SkillsPanel skills={sampleSkills} tools={sampleTools} />
      </div>
    </div>
  );
}

/**
 * Example 9: Responsive layout demonstration
 */
export function ResponsiveSkillsPanel() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <SkillsPanel skills={sampleSkills} tools={sampleTools} />
      </div>
    </div>
  );
}

/**
 * Example 10: SkillsPanel with real-world data structure
 */
export function RealWorldSkillsPanel() {
  // This demonstrates how to use the component with data from lib/data/skills.ts
  // In a real application, you would import getSkills() and getTools()
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <SkillsPanel 
        skills={sampleSkills} 
        tools={sampleTools}
      />
    </div>
  );
}

// Default export for Storybook or documentation
export default function SkillsPanelExamples() {
  return (
    <div className="space-y-16 p-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Full SkillsPanel</h2>
        <FullSkillsPanel />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Frontend Only</h2>
        <FrontendOnlySkillsPanel />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Varying Skill Levels</h2>
        <VaryingLevelsSkillsPanel />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Without Icons</h2>
        <SkillsPanelWithoutIcons />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Minimal Configuration</h2>
        <MinimalSkillsPanel />
      </section>
    </div>
  );
}
