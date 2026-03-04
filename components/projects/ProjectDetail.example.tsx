import { ProjectDetail } from './ProjectDetail';
import { Project } from '@/types';

/**
 * ProjectDetail Component Examples
 * 
 * This file demonstrates various usage scenarios for the ProjectDetail component.
 */

// Example 1: Full-featured project with all fields
const fullFeaturedProject: Project = {
  id: '1',
  slug: 'task-master-pro',
  title: 'TaskMaster Pro',
  description: 'A powerful task management application with real-time collaboration',
  fullDescription: 'TaskMaster Pro is a comprehensive task management solution designed for teams and individuals who need to stay organized. Built with modern web technologies, it features real-time synchronization, intuitive drag-and-drop task organization, customizable workflows, and powerful analytics.',
  thumbnail: '/images/projects/taskmaster-thumb.jpg',
  screenshots: [
    '/images/projects/taskmaster-1.jpg',
    '/images/projects/taskmaster-2.jpg',
    '/images/projects/taskmaster-3.jpg',
    '/images/projects/taskmaster-4.jpg',
  ],
  techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'WebSocket'],
  category: 'web',
  featured: true,
  demoUrl: 'https://taskmaster-demo.example.com',
  repoUrl: 'https://github.com/username/taskmaster-pro',
  challenges: [
    'Implementing real-time synchronization across multiple users without conflicts',
    'Optimizing drag-and-drop performance with large datasets',
    'Designing an intuitive UX that works for both beginners and power users',
  ],
  learnings: [
    'Mastered WebSocket implementation for real-time features',
    'Learned advanced state management patterns for complex UI interactions',
    'Gained experience with database optimization for high-traffic applications',
  ],
  impact: [
    { metric: 'Active Users', value: '2,500+' },
    { metric: 'Tasks Completed', value: '50,000+' },
    { metric: 'User Satisfaction', value: '4.8/5' },
  ],
  createdAt: '2024-01-15',
};

// Example 2: Project without demo URL
const projectWithoutDemo: Project = {
  id: '2',
  slug: 'internal-tool',
  title: 'Internal Analytics Tool',
  description: 'A private analytics dashboard for internal team use',
  fullDescription: 'An internal tool built for analyzing team performance metrics and generating reports. Features include custom dashboards, automated reporting, and data visualization.',
  thumbnail: '/images/projects/analytics-thumb.jpg',
  screenshots: [
    '/images/projects/analytics-1.jpg',
    '/images/projects/analytics-2.jpg',
  ],
  techStack: ['React', 'TypeScript', 'D3.js', 'Node.js'],
  category: 'web',
  featured: false,
  repoUrl: 'https://github.com/username/analytics-tool',
  challenges: [
    'Processing large datasets efficiently',
    'Creating intuitive data visualizations',
  ],
  learnings: [
    'Mastered D3.js for complex visualizations',
    'Learned data processing optimization techniques',
  ],
  impact: [
    { metric: 'Reports Generated', value: '1,000+' },
    { metric: 'Time Saved', value: '40%' },
  ],
  createdAt: '2023-12-01',
};

// Example 3: Project with minimal screenshots
const projectWithFewScreenshots: Project = {
  id: '3',
  slug: 'cli-tool',
  title: 'DevTools CLI',
  description: 'A command-line tool for developer workflows',
  fullDescription: 'A powerful CLI tool that automates common development tasks including project scaffolding, code generation, and deployment automation.',
  thumbnail: '/images/projects/cli-thumb.jpg',
  screenshots: [
    '/images/projects/cli-1.jpg',
  ],
  techStack: ['Node.js', 'TypeScript', 'Commander.js'],
  category: 'other',
  featured: false,
  repoUrl: 'https://github.com/username/devtools-cli',
  challenges: [
    'Creating an intuitive CLI interface',
    'Supporting multiple project types',
  ],
  learnings: [
    'Experience building developer tools',
    'Understanding of Node.js package publishing',
  ],
  impact: [
    { metric: 'NPM Downloads', value: '10,000+' },
    { metric: 'GitHub Stars', value: '500+' },
  ],
  createdAt: '2023-11-15',
};

export default function ProjectDetailExamples() {
  return (
    <div className="space-y-16 p-8">
      <section>
        <h2 className="text-2xl font-heading mb-4">Example 1: Full-Featured Project</h2>
        <p className="mb-8 text-manga-gray-600">
          A project with all fields populated including demo URL, repo URL, multiple screenshots,
          and comprehensive power stats.
        </p>
        <ProjectDetail project={fullFeaturedProject} />
      </section>

      <section>
        <h2 className="text-2xl font-heading mb-4">Example 2: Project Without Demo</h2>
        <p className="mb-8 text-manga-gray-600">
          A project that only has a repository link (no public demo available).
        </p>
        <ProjectDetail project={projectWithoutDemo} />
      </section>

      <section>
        <h2 className="text-2xl font-heading mb-4">Example 3: Project With Few Screenshots</h2>
        <p className="mb-8 text-manga-gray-600">
          A CLI tool project with minimal visual screenshots.
        </p>
        <ProjectDetail project={projectWithFewScreenshots} />
      </section>
    </div>
  );
}
