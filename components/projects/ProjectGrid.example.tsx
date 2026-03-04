import { ProjectGrid } from './ProjectGrid';
import { Project } from '@/types';

/**
 * ProjectGrid Component Examples
 * 
 * Demonstrates various use cases of the ProjectGrid component:
 * - Grid with multiple projects
 * - Grid with single project
 * - Empty state
 * - Different project categories
 */

// Sample project data
const sampleProjects: Project[] = [
  {
    id: '1',
    slug: 'web-app-project',
    title: 'Modern Web Application',
    description: 'A full-stack web application built with Next.js, featuring real-time updates and responsive design.',
    fullDescription: 'Full description here',
    thumbnail: '/images/projects/web-app.jpg',
    screenshots: [],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    category: 'web',
    featured: true,
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/user/project',
    challenges: [],
    learnings: [],
    impact: [],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    slug: 'mobile-app-project',
    title: 'Mobile Fitness Tracker',
    description: 'A React Native mobile app for tracking workouts and nutrition with gamification features.',
    fullDescription: 'Full description here',
    thumbnail: '/images/projects/mobile-app.jpg',
    screenshots: [],
    techStack: ['React Native', 'TypeScript', 'Redux'],
    category: 'mobile',
    featured: false,
    challenges: [],
    learnings: [],
    impact: [],
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    slug: 'design-system',
    title: 'Enterprise Design System',
    description: 'A comprehensive design system with reusable components and documentation.',
    fullDescription: 'Full description here',
    thumbnail: '/images/projects/design-system.jpg',
    screenshots: [],
    techStack: ['Figma', 'Storybook', 'React', 'TypeScript'],
    category: 'uiux',
    featured: true,
    challenges: [],
    learnings: [],
    impact: [],
    createdAt: '2024-01-05',
  },
];

export default function ProjectGridExamples() {
  return (
    <div className="space-y-16 p-8 bg-manga-gray-50">
      {/* Example 1: Grid with multiple projects */}
      <section>
        <h2 className="text-2xl font-heading mb-6 uppercase">
          Multiple Projects Grid
        </h2>
        <div className="bg-manga-white p-6">
          <ProjectGrid projects={sampleProjects} />
        </div>
      </section>

      {/* Example 2: Grid with single project */}
      <section>
        <h2 className="text-2xl font-heading mb-6 uppercase">
          Single Project Grid
        </h2>
        <div className="bg-manga-white p-6">
          <ProjectGrid projects={[sampleProjects[0]]} />
        </div>
      </section>

      {/* Example 3: Empty state */}
      <section>
        <h2 className="text-2xl font-heading mb-6 uppercase">
          Empty State
        </h2>
        <div className="bg-manga-white p-6">
          <ProjectGrid projects={[]} />
        </div>
      </section>

      {/* Example 4: Web projects only */}
      <section>
        <h2 className="text-2xl font-heading mb-6 uppercase">
          Filtered Projects (Web Only)
        </h2>
        <div className="bg-manga-white p-6">
          <ProjectGrid 
            projects={sampleProjects.filter(p => p.category === 'web')} 
          />
        </div>
      </section>

      {/* Example 5: Featured projects only */}
      <section>
        <h2 className="text-2xl font-heading mb-6 uppercase">
          Featured Projects Only
        </h2>
        <div className="bg-manga-white p-6">
          <ProjectGrid 
            projects={sampleProjects.filter(p => p.featured)} 
          />
        </div>
      </section>

      {/* Example 6: Projects with many tech items */}
      <section>
        <h2 className="text-2xl font-heading mb-6 uppercase">
          Projects with Many Technologies
        </h2>
        <div className="bg-manga-white p-6">
          <ProjectGrid 
            projects={[
              {
                ...sampleProjects[0],
                techStack: [
                  'Next.js', 'TypeScript', 'Tailwind CSS', 
                  'PostgreSQL', 'Prisma', 'tRPC', 'Zod'
                ],
              }
            ]} 
          />
        </div>
      </section>
    </div>
  );
}
