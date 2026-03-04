import { Skill, Tool } from '@/types';

/**
 * Sample skills data for the manga portfolio website
 * 
 * Skills are organized by category:
 * - Frontend: Client-side technologies and frameworks
 * - Backend: Server-side technologies and databases
 * - Design: UI/UX and design tools
 * - Tools: Development tools and workflows
 * - Other: Additional technical skills
 * 
 * Skill levels range from 0-100 for stat bar visualization
 */

export const skills: Skill[] = [
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
    name: 'JavaScript',
    level: 95,
    category: 'frontend',
    icon: '📜',
  },
  {
    id: 'skill-5',
    name: 'HTML/CSS',
    level: 98,
    category: 'frontend',
    icon: '🎨',
  },
  {
    id: 'skill-6',
    name: 'Tailwind CSS',
    level: 90,
    category: 'frontend',
    icon: '💨',
  },
  {
    id: 'skill-7',
    name: 'Framer Motion',
    level: 85,
    category: 'frontend',
    icon: '🎬',
  },
  {
    id: 'skill-8',
    name: 'React Native',
    level: 80,
    category: 'frontend',
    icon: '📱',
  },

  // Backend Skills
  {
    id: 'skill-9',
    name: 'Node.js',
    level: 88,
    category: 'backend',
    icon: '🟢',
  },
  {
    id: 'skill-10',
    name: 'Express',
    level: 85,
    category: 'backend',
    icon: '🚂',
  },
  {
    id: 'skill-11',
    name: 'PostgreSQL',
    level: 82,
    category: 'backend',
    icon: '🐘',
  },
  {
    id: 'skill-12',
    name: 'MongoDB',
    level: 80,
    category: 'backend',
    icon: '🍃',
  },
  {
    id: 'skill-13',
    name: 'Prisma',
    level: 85,
    category: 'backend',
    icon: '🔷',
  },
  {
    id: 'skill-14',
    name: 'GraphQL',
    level: 78,
    category: 'backend',
    icon: '◈',
  },
  {
    id: 'skill-15',
    name: 'REST APIs',
    level: 90,
    category: 'backend',
    icon: '🔌',
  },

  // Design Skills
  {
    id: 'skill-16',
    name: 'Figma',
    level: 88,
    category: 'design',
    icon: '🎨',
  },
  {
    id: 'skill-17',
    name: 'UI/UX Design',
    level: 85,
    category: 'design',
    icon: '✨',
  },
  {
    id: 'skill-18',
    name: 'Adobe XD',
    level: 75,
    category: 'design',
    icon: '🎭',
  },
  {
    id: 'skill-19',
    name: 'Responsive Design',
    level: 95,
    category: 'design',
    icon: '📐',
  },
  {
    id: 'skill-20',
    name: 'Accessibility',
    level: 82,
    category: 'design',
    icon: '♿',
  },

  // Tools
  {
    id: 'skill-21',
    name: 'Git',
    level: 92,
    category: 'tools',
    icon: '🔀',
  },
  {
    id: 'skill-22',
    name: 'GitHub',
    level: 90,
    category: 'tools',
    icon: '🐙',
  },
  {
    id: 'skill-23',
    name: 'VS Code',
    level: 95,
    category: 'tools',
    icon: '💻',
  },
  {
    id: 'skill-24',
    name: 'Docker',
    level: 75,
    category: 'tools',
    icon: '🐳',
  },
  {
    id: 'skill-25',
    name: 'Jest',
    level: 85,
    category: 'tools',
    icon: '🃏',
  },
  {
    id: 'skill-26',
    name: 'Webpack',
    level: 70,
    category: 'tools',
    icon: '📦',
  },

  // Other Skills
  {
    id: 'skill-27',
    name: 'Agile/Scrum',
    level: 88,
    category: 'other',
    icon: '🔄',
  },
  {
    id: 'skill-28',
    name: 'CI/CD',
    level: 80,
    category: 'other',
    icon: '🚀',
  },
  {
    id: 'skill-29',
    name: 'Performance Optimization',
    level: 85,
    category: 'other',
    icon: '⚡',
  },
  {
    id: 'skill-30',
    name: 'SEO',
    level: 78,
    category: 'other',
    icon: '🔍',
  },
];

/**
 * Tools and technologies used
 */
export const tools: Tool[] = [
  { name: 'Vercel', category: 'Deployment' },
  { name: 'AWS', category: 'Cloud Services' },
  { name: 'Firebase', category: 'Backend Services' },
  { name: 'Stripe', category: 'Payment Processing' },
  { name: 'Supabase', category: 'Backend Services' },
  { name: 'Netlify', category: 'Deployment' },
  { name: 'Postman', category: 'API Testing' },
  { name: 'Storybook', category: 'Component Development' },
  { name: 'Playwright', category: 'Testing' },
  { name: 'ESLint', category: 'Code Quality' },
  { name: 'Prettier', category: 'Code Formatting' },
  { name: 'Jira', category: 'Project Management' },
  { name: 'Notion', category: 'Documentation' },
  { name: 'Slack', category: 'Communication' },
];

/**
 * Get all skills
 */
export function getSkills(): Skill[] {
  return skills;
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: Skill['category']): Skill[] {
  return skills.filter(skill => skill.category === category);
}

/**
 * Get frontend skills
 */
export function getFrontendSkills(): Skill[] {
  return getSkillsByCategory('frontend');
}

/**
 * Get backend skills
 */
export function getBackendSkills(): Skill[] {
  return getSkillsByCategory('backend');
}

/**
 * Get design skills
 */
export function getDesignSkills(): Skill[] {
  return getSkillsByCategory('design');
}

/**
 * Get tool skills
 */
export function getToolSkills(): Skill[] {
  return getSkillsByCategory('tools');
}

/**
 * Get other skills
 */
export function getOtherSkills(): Skill[] {
  return getSkillsByCategory('other');
}

/**
 * Get all tools
 */
export function getTools(): Tool[] {
  return tools;
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category === category);
}

/**
 * Get all unique tool categories
 */
export function getToolCategories(): string[] {
  return Array.from(new Set(tools.map(tool => tool.category)));
}

/**
 * Get top skills (highest level)
 */
export function getTopSkills(limit: number = 5): Skill[] {
  return [...skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);
}
