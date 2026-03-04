import { ProjectCard } from './ProjectCard';
import { Project } from '@/types';

/**
 * ProjectCard Component Examples
 * 
 * Demonstrates various use cases and configurations of the ProjectCard component.
 */

// Sample project data
const webProject: Project = {
  id: '1',
  slug: 'task-master-pro',
  title: 'TaskMaster Pro',
  description: 'A powerful task management application with real-time collaboration, drag-and-drop interface, and advanced filtering capabilities.',
  fullDescription: 'Full description...',
  thumbnail: '/images/projects/taskmaster-thumb.jpg',
  screenshots: [],
  techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
  category: 'web',
  featured: true,
  demoUrl: 'https://taskmaster-demo.example.com',
  repoUrl: 'https://github.com/username/taskmaster-pro',
  challenges: [],
  learnings: [],
  impact: [],
  createdAt: '2024-01-15',
};

const mobileProject: Project = {
  id: '2',
  slug: 'manga-reader-app',
  title: 'Manga Reader',
  description: 'A sleek mobile app for reading manga with offline support, customizable reading modes, and a vast library of titles.',
  fullDescription: 'Full description...',
  thumbnail: '/images/projects/manga-reader-thumb.jpg',
  screenshots: [],
  techStack: ['React Native', 'TypeScript', 'Redux'],
  category: 'mobile',
  featured: true,
  demoUrl: 'https://apps.apple.com/manga-reader',
  challenges: [],
  learnings: [],
  impact: [],
  createdAt: '2023-11-20',
};

const uiuxProject: Project = {
  id: '3',
  slug: 'design-system-revamp',
  title: 'Enterprise Design System',
  description: 'Complete redesign and documentation of a design system for a Fortune 500 company.',
  fullDescription: 'Full description...',
  thumbnail: '/images/projects/design-system-thumb.jpg',
  screenshots: [],
  techStack: ['Figma', 'Storybook', 'React', 'TypeScript', 'CSS-in-JS', 'Jest', 'Chromatic'],
  category: 'uiux',
  featured: true,
  demoUrl: 'https://design-system-demo.example.com',
  challenges: [],
  learnings: [],
  impact: [],
  createdAt: '2023-09-10',
};

export default function ProjectCardExamples() {
  return (
    <div className="p-8 bg-manga-gray-50 min-h-screen">
      <h1 className="text-4xl font-heading uppercase mb-8">ProjectCard Examples</h1>

      {/* Single Card Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading uppercase mb-4">Single Card</h2>
        <div className="max-w-sm">
          <ProjectCard project={webProject} index={0} />
        </div>
      </section>

      {/* Grid Layout Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading uppercase mb-4">Grid Layout (3 columns)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard project={webProject} index={0} />
          <ProjectCard project={mobileProject} index={1} />
          <ProjectCard project={uiuxProject} index={2} />
        </div>
      </section>

      {/* Different Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading uppercase mb-4">Different Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-heading mb-2">Web Project</h3>
            <ProjectCard project={webProject} index={0} />
          </div>
          <div>
            <h3 className="text-lg font-heading mb-2">Mobile Project</h3>
            <ProjectCard project={mobileProject} index={0} />
          </div>
          <div>
            <h3 className="text-lg font-heading mb-2">UI/UX Project</h3>
            <ProjectCard project={uiuxProject} index={0} />
          </div>
        </div>
      </section>

      {/* Long Content Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading uppercase mb-4">Long Content (Truncation)</h2>
        <div className="max-w-sm">
          <ProjectCard
            project={{
              ...webProject,
              title: 'This is a Very Long Project Title That Should Be Truncated After Two Lines',
              description: 'This is a very long project description that should be truncated after three lines to maintain consistent card heights across the grid layout. This demonstrates the line-clamp functionality.',
            }}
            index={0}
          />
        </div>
      </section>

      {/* Many Tech Stack Items */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading uppercase mb-4">Many Tech Stack Items</h2>
        <div className="max-w-sm">
          <ProjectCard
            project={{
              ...webProject,
              techStack: [
                'Next.js',
                'TypeScript',
                'Tailwind CSS',
                'Prisma',
                'PostgreSQL',
                'Redis',
                'Docker',
                'AWS',
              ],
            }}
            index={0}
          />
        </div>
      </section>

      {/* Responsive Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-heading uppercase mb-4">Responsive Grid</h2>
        <p className="text-manga-gray-600 mb-4">
          Resize the browser to see the responsive behavior:
          <br />
          Mobile (&lt;640px): 1 column
          <br />
          Tablet (640-1024px): 2 columns
          <br />
          Desktop (&gt;1024px): 3 columns
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard project={webProject} index={0} />
          <ProjectCard project={mobileProject} index={1} />
          <ProjectCard project={uiuxProject} index={2} />
          <ProjectCard project={webProject} index={3} />
          <ProjectCard project={mobileProject} index={4} />
          <ProjectCard project={uiuxProject} index={5} />
        </div>
      </section>
    </div>
  );
}
